import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import axios from "axios";
import FilterComponent from "./FilterComponent";

const Chart = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filters]);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/")
      .then((response) => {
        setData(response.data.data);
        setFilteredData(response.data.data);
      })
      .catch((error) => console.error(error));
  };

  const filterData = () => {
    let tempData = data;

    if (filters.endYear) {
      tempData = tempData.filter((d) => d.end_year === filters.endYear);
    }
    if (filters.topic) {
      tempData = tempData.filter((d) => d.topic === filters.topic);
    }
    if (filters.sector) {
      tempData = tempData.filter((d) => d.sector === filters.sector);
    }
    if (filters.region) {
      tempData = tempData.filter((d) => d.region === filters.region);
    }
    if (filters.pestle) {
      tempData = tempData.filter((d) => d.pestle === filters.pestle);
    }
    if (filters.source) {
      tempData = tempData.filter((d) => d.source === filters.source);
    }
    if (filters.swot) {
      tempData = tempData.filter((d) => d.swot === filters.swot);
    }
    if (filters.country) {
      tempData = tempData.filter((d) => d.country === filters.country);
    }
    if (filters.city) {
      tempData = tempData.filter((d) => d.city === filters.city);
    }

    setFilteredData(tempData);
  };

  const drawChart = () => {
    d3.select("#combinedChart").selectAll("*").remove();

    const svg = d3
      .select("#combinedChart")
      .append("svg")
      .attr("width", 800)
      .attr("height", 400);

    const margin = { top: 60, right: 30, bottom: 40, left: 40 };
    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.topic))
      .range([0, width])
      .padding(0.1);

    const y1 = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.likelihood)])
      .nice()
      .range([height, 0]);

    const y2 = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.relevance)])
      .nice()
      .range([height, 0]);

    const yAxisLeft = d3.axisLeft(y1);
    const yAxisRight = d3.axisRight(y2);

    g.append("g").attr("class", "axis axis--y1").call(yAxisLeft);

    g.append("g")
      .attr("class", "axis axis--y2")
      .attr("transform", `translate(${width},0)`)
      .call(yAxisRight);

    // Add labels for likelihood and relevance above the chart
    g.append("text")
      .attr("x", width / 4)
      .attr("y", -10)
      .text("Likelihood")
      .attr("fill", "steelblue")
      .style("font-weight", "bold");

    g.append("text")
      .attr("x", (width / 4) * 3)
      .attr("y", -10)
      .text("Relevance")
      .attr("fill", "orange")
      .style("font-weight", "bold");

    g.selectAll(".bar1")
      .data(filteredData)
      .enter()
      .append("rect")
      .attr("class", "bar1")
      .attr("x", (d) => x(d.topic))
      .attr("y", (d) => y1(d.likelihood))
      .attr("width", x.bandwidth() / 2)
      .attr("height", (d) => height - y1(d.likelihood))
      .attr("fill", "steelblue");

    g.selectAll(".bar2")
      .data(filteredData)
      .enter()
      .append("rect")
      .attr("class", "bar2")
      .attr("x", (d) => x(d.topic) + x.bandwidth() / 2)
      .attr("y", (d) => y2(d.relevance))
      .attr("width", x.bandwidth() / 2)
      .attr("height", (d) => height - y2(d.relevance))
      .attr("fill", "orange");
  };

  useEffect(() => {
    drawChart();
  }, [filteredData]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <div>
        <FilterComponent
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div id="combinedChart"></div>
    </div>
  );
};

export default Chart;
