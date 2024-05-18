import { Box, Flex, Heading, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut} from "react-chartjs-2";

const formatChartData = (data) => {
  const labels = data.map((item) => item.source);

  const values = data.map((item) => item.relevance);
  const backgroundColors = [
    "rgba(75, 192, 192, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 205, 86, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 129, 84, 1)",
    "rgba(215, 169, 64, 1)",
   
  ];
  return {
    labels:[
      "Energy",
      "Environment",
      "Government",
      "Aerospace & defence",
      "Manufacturing",
      "Retail",
      "Financial services",
      "Support services",
      "Information Technology",
      "Healthcare",
      "Automotive",
      "Tourism & hospitality",
      "Food & agriculture",
      "Construction"
  ]
  ,
    datasets: [
      {
        label: "Relevance",
        backgroundColor: backgroundColors.slice(0, values.length),
        borderWidth:0,
        data: values,
      },
    ],
  };
};
const Piechart = ({ data }) => {
  const [filter, setFilter] = useState("All");
  const filteredData =
    filter === "All" ? data : data.filter((item) => item.sector === filter);
  const chartdata = formatChartData(filteredData);
  const options = {
   
  };
  return (
    <Box w={{base:"full",md:"40%"}} width={""}  >
      <Heading as="h3" size={"lg"} mb="10px">
        Relevance Chart
      </Heading>
      <Box mb="10px">
        <Select
          id="filterSelect"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">Relevance</option>
          <option value="Energy">Energy</option>
          <option value="Government">Government</option>
          <option value="Retail">Retail</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Manufacturing">Manufacturing</option>
        </Select>
      </Box>
      <Flex justifyContent={'center'}>
        <Doughnut data={chartdata} options={options} />
      </Flex>
    </Box>
  );
};

export default Piechart;
