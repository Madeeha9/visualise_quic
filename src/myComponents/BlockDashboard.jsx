import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "../components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../components/ui/pagination";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import MyPieChart from "./MyPieChart.jsx";
import MyBarChart from "./MyBarChart.jsx";
import StatsTable from "./StatsTable";

function BlockDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailedData, setDetailedData] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("C1");

  const packages = ["C1", "C23", "C4"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append("cmd", "showRep");
        formData.append("userid", process.env.REACT_APP_USERID);
        formData.append("password", process.env.REACT_APP_PASSWORD);
        formData.append("token", process.env.REACT_APP_TOKEN);
        formData.append("package", selectedPackage);
        formData.append("repControl", "C");

        const response = await axios.post(
          "https://hridc.speedportal.in/frm/fcgi/QCActionNew.php",
          formData,
          {
            headers: {},
          }
        );

        const fetchedData = response.data.map((item) => ({
          ...item,
          total_raised: parseInt(item.total_raised, 10),
          total_pending: parseInt(item.total_pending, 10),
          pending_since_30: parseInt(item.pending_since_30, 10),
        }));

        setData(fetchedData);

        formData.set("repControl", "D");

        const response2 = await axios.post(
          "https://hridc.speedportal.in/frm/fcgi/QCActionNew.php",
          formData,
          {
            headers: {},
          }
        );

        setDetailedData(response2.data);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPackage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  //   console.log(data);

  const headings1 = ["Total Pending", "Pending since 30"];
  const headers = Object.keys(detailedData[0]);

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(",") + "\n";
    const rows = data
      .map((row) =>
        Object.values(row)
          .map((value) => (value === null ? "" : value))
          .join(",")
      )
      .join("\n");
    return headers + rows;
  };

  const downloadCSV = (detailedData) => {
    const csv = convertToCSV(detailedData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePackageChange = (pkg) => {
    setSelectedPackage(pkg);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Router>
        <div className="flex flex-col px-6 sm:gap-4 sm:py-4 sm:px-8">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-2 md:gap-8 lg:col-span-2">
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                <MyPieChart data={data} title={"Total Raised"} />
                <div className="sm:col-span-2 sm:grid-cols-1">
                  <MyBarChart data={data} headings={headings1} />
                </div>
              </div>
            </div>

            <div className="grid">
              <Card x-chunk="dashboard-05-chunk-3">
                <Tabs defaultValue="week">
                  <div className="flex items-center mt-4 mr-4">
                    <div className="ml-auto flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 gap-1 text-sm"
                          >
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">
                              Packages
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Select Package</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {packages.map((pkg) => (
                            <DropdownMenuCheckboxItem
                              key={pkg}
                              checked={selectedPackage === pkg}
                              onClick={() => handlePackageChange(pkg)}
                            >
                              {pkg}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-sm"
                        onClick={() => downloadCSV(detailedData)}
                      >
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Export</span>
                      </Button>
                    </div>
                  </div>
                  <TabsContent value="week">
                    <CardHeader className="px-7">
                      <CardTitle>Reports</CardTitle>
                      <CardDescription>
                        Recent CRFI reports.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-y-auto max-h-96">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHead className="text-left" key={header}>
                                {header.replace(/_/g, " ").toUpperCase()}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {detailedData.map((item, index) => (
                            <TableRow key={index} className="bg-accent">
                              <TableCell>
                                <div className="font-medium">
                                  {item.package}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">
                                  {item.crfi_no}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium">
                                  {item.created_dt}
                                </div>
                              </TableCell>
                              <TableCell className="sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                  {item.currently_with
                                    ? item.currently_with
                                    : ""}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </main>
          <div className="pl-8">
            <StatsTable />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default BlockDashboard;
