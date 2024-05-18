import { Box, Container, Flex, Heading, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Radar } from "react-chartjs-2";

const formatChartData = (data) => {
 
  const likelihood = data.map((item) => item.start_year);
  const values = data.map((item) => item.end_year);
 
  return {
    labels:[
      "Northern America",
      "Central America",
      "World",
      "Western Africa",
      "Western Asia",
      "Eastern Europe",
      "Southern Africa",
      "Southern Asia",
      "Central Africa",
      "Eastern Asia",
      "South America",
      "Northern Africa",
      "Eastern Africa",
      "Western Europe",
      "Northern Europe",
      "Southern Europe",
      "Western Europe",
      "Oceania",
      "Eastern Asia",
      "Asia"
  ]
  ,

    datasets: [
        {
            type:"radar",
            label: "Start Year",
           
            borderWidth:0,
            data: likelihood,
          },
      {
        type:"radar",
        label: "End Year",
        borderWidth:0,
        data: values,
      },
    ],
  };
};
const Radarchart = ({ data }) => {
  const [filter, setFilter] = useState("All");
  const filteredData =
    filter === "All" ? data : data.filter((item) => item.sector === filter);
  const chartdata = formatChartData(filteredData);

  return (
    <Container maxW='600px' m={"auto"}>
      <Box w={{base:"full",md:"40%"}} mx='auto' mt='10px'>
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
        <Radar data={chartdata}  />
      </Flex>
    </Box>
    </Container>
  );
};

export default Radarchart;
