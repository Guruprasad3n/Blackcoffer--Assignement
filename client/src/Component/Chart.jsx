import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Box, Flex, Heading, Select } from "@chakra-ui/react";

const formatChartData = (data) => {
  const labels = data.map((item) => item.start_year);
  const relevance = data.map((item) => item.relevance);
  const values = data.map((item) => item.likelihood);
  return {
    label: [2016, 2017, 2018, 2019, 2020, 2022, 2030, 2040],
    datasets: [
      {
        label: "Likelihood",
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        data: values,
      },
      {
        label: "Relevance",
        backgroundColor: "rgba(500, 200, 200, 1)",
        borderColor: "rgba(75, 200, 192, 1)",
        data: relevance,
      },
    ],
  };
};
const Chart = ({ data }) => {
  const [filters, setFilters] = useState({
    sector: "All",
    country: "All",
    source: "All",
    region: "All",
    topics: "All",
    endYear: "All",
  });
  const applyFilters = () => {
    let filteredData = data;

    if (filters.sector !== "All") {
      filteredData = filteredData.filter(
        (item) => item.sector === filters.sector
      );
    }
    if (filters.country !== "All") {
      filteredData = filteredData.filter(
        (item) => item.country === filters.country
      );
    }
    if (filters.source !== "All") {
      filteredData = filteredData.filter(
        (item) => item.source === filters.source
      );
    }
    if (filters.region !== "All") {
      filteredData = filteredData.filter(
        (item) => item.region === filters.region
      );
    }
    if (filters.topics !== "All") {
      filteredData = filteredData.filter(
        (item) => item.topic === filters.topics
      );
    }

    return filteredData;
  };
  const chartdata = formatChartData(applyFilters());
  const options = {
    animations: {
      tension: {
        duration: 1000,
        easing: "easeInCubic",
        from: 1,
        to: 0,
        loop: false,
        color: "red",
      },
    },
    scales: {
      x: {
        type: "category",
        labels: chartdata.label,
        ticks: {
          color: "#fff",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };
  return (
    <Box p="10px">
      <Heading as="h3" size="lg">
        Gas Consumption Intensity Chart
      </Heading>
      <Box gap={"5px"}  >
        <Select
          id="filterSelect"
          value={filters.sector}
          onChange={(e) => handleFilterChange("sector", e.target.value)}
        >
          <option value="All">Sector</option>
          <option value="Energy">Energy</option>
          <option value="Government">Government</option>
          <option value="Retail">Retail</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Manufacturing">Manufacturing</option>
        </Select>
        <Select
          value={filters.country}
          onChange={(e) => handleFilterChange("country", e.target.value)}
        >
          <option value="All">Country</option>
          <option value="Iraq">Iraq</option>
          <option value="Niger">Niger</option>
          <option value="India">India</option>
          <option value="Libya">Libya</option>
          <option value="Iran">Iran</option>
          <option value="United States of America">
            United States of America
          </option>
          <option value="Japan">Japan</option>
          <option value="Australia">Austrilia</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="China">China</option>
          <option value="Sauth Africa">Sauth Africa</option>
        </Select>
        <Select
          value={filters.source}
          onChange={(e) => handleFilterChange("source", e.target.value)}
        >
          <option value="All">Source</option>
          <option value="dpaq">dpaq</option>
          <option value="Cars.co.za">Cars.co.za</option>
          <option value="gasstrategies">gasstrategies</option>
          <option value="Euromoney">Euromoney</option>
          <option value="EIU">EIU</option>
          <option value="CNNMoney">CNNMoney</option>
          <option value="www.narendramodi.in">Narebdra Modi</option>
          <option value="Reuters">Reuters</option>
          <option value="Sydney Morning Herald">Sydney Morning Herald</option>
          <option value="CNBC">CNBC</option>
          <option value="GreenBiz">GreenBiz</option>
        </Select>
        <Select
          value={filters.region}
          onChange={(e) => handleFilterChange("region", e.target.value)}
        >
          <option value="All">Region</option>
          <option value="World">World</option>
          <option value="Nothern America">Nothern America</option>
          <option value="Central America">Central America</option>
          <option value="Western Africa">Western Africa</option>
          <option value="Western Asia">Western Asia</option>
          <option value="Eastern Europe">Eastern Europe</option>
          <option value="Central Africa">Central Africa</option>
        </Select>
        <Select
          value={filters.topics}
          onChange={(e) => handleFilterChange("topics", e.target.value)}
        >
          <option value="All">Topic</option>
          <option value="oil">oil</option>
          <option value="growth">growth</option>
          <option value="economic">economic</option>
          <option value="Energy">energy</option>
          <option value="cousumtion">consumtion</option>
          <option value="market">market</option>
        </Select>
      </Box>
      <Flex
        h={{ base: "250px", md: "500px" }}
        justifyContent={"center"}
        mt="20px"
      >
        <Bar data={chartdata} options={options} />
      </Flex>
    </Box>
  );
};

export default Chart;
