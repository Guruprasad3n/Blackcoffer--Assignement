import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import axios from "axios";
import FilterComponent from "./FilterComponent";

const PieChart = () => {
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
      tempData = tempData.filter((d) => d.end_year === filters.endYear );
    }
    if (filters.topic) {
      tempData = tempData.filter((d) => d.topic === filters.topic);
    }
    // if (filters.sector) {
    //   tempData = tempData.filter((d) => d.sector === filters.sector);
    // }
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
    d3.select("#pieChart").selectAll("*").remove();
  
    const svg = d3.select("#pieChart").append("svg").attr("width", 400).attr("height", 400);
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    // Filter and sort the data by intensity, and select the top 5
    const topData = filteredData
      .sort((a, b) => b.intensity - a.intensity)
      .slice(0, 5);
  
    const pie = d3.pie().value((d) => d.intensity);
  
    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);
  
    const labelArc = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);
  
    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
    const data_ready = pie(topData);
  
    const arcPaths = g.selectAll("arc")
      .data(data_ready)
      .enter()
      .append("g");
  
    arcPaths.append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.topic))
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  
    arcPaths.append("text")
      .attr("transform", (d) => "translate(" + labelArc.centroid(d) + ")")
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text((d) => d.data.topic);
  };
  

  useEffect(() => {
    drawChart();
  }, [filteredData]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <FilterComponent filters={filters} onFilterChange={handleFilterChange} />
      <div id="pieChart"></div>
    </div>
  );
};

export default PieChart;
