import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function StatsTable() {
  const [dataa, setData] = useState([]);
  const [months, setMonths] = useState([]);

  const data = [
    { package: "C1" ,
      raised1: 3380,
      closed1: 2180,
      balance1: 1250,
      raised2: 2431,
      closed2: 1291,
      balance2: 1140,
      raised3: 1203,
      closed3: 516,
      balance3: 687,
      raised: 260511,
      closed: 259155,
      balance: 1356,
    },
  ];

  useEffect(() => {
    // fetchData();
    const currentDate = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const lastThreeMonths = [];

    for (let i = 2; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i
      );
      lastThreeMonths.push(
        `${monthNames[date.getMonth()]}-${date.getFullYear()}`
      );
    }

    setMonths(lastThreeMonths);
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("https://hridc.speedportal.in/frm/fcgi/QCActionNew.php", {
  //       body: JSON.stringify({
  //         prev_m: [
  //           { month: months[0], year: '04' },
  //           { month: months[1], year: '05' },
  //           { month: months[2], year: '06' },
  //         ],
  //       }),
  //     });
  //     const result = await response.json();
  //     setData(result);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>STATS Delhi-Meerut Corridor</CardTitle>
        <CardDescription>Raised CRFIs</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableCell colSpan={4}>
                <label>Package: </label>
                <select>
                  <option value="ALL">ALL</option>
                </select>
              </TableCell> */}
            </TableRow>
            <TableRow>
              <TableHead></TableHead>
              {months.map((month, index) => (
                <TableHead key={index} colSpan={3}>
                  {month}
                </TableHead>
              ))}
              <TableHead colSpan={3}>Cumulative</TableHead>
            </TableRow>
            <TableRow>
              {months.map((_, index) => (
                <React.Fragment key={index}>
                  <TableHead>Raised</TableHead>
                  <TableHead>Closed</TableHead>
                  <TableHead>Balance For Closure</TableHead>
                </React.Fragment>
              ))}
              <TableHead>Raised</TableHead>
              <TableHead>Closed</TableHead>
              <TableHead>Open</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow className="text-left" key={index}>
                <TableCell>{row.raised1}</TableCell>
                <TableCell>{row.closed1}</TableCell>
                <TableCell>{row.balance1}</TableCell>
                <TableCell>{row.raised2}</TableCell>
                <TableCell>{row.closed2}</TableCell>
                <TableCell>{row.balance2}</TableCell>
                <TableCell>{row.raised3}</TableCell>
                <TableCell>{row.closed3}</TableCell>
                <TableCell>{row.balance3}</TableCell>
                <TableCell>{row.raised}</TableCell>
                <TableCell>{row.closed}</TableCell>
                <TableCell>{row.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default StatsTable;
