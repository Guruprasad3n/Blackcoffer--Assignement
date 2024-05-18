// frontend/src/Components/BarChartComponent.js

import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChartComponent = ({ data }) => {
  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    d3.select("#barChart").selectAll("*").remove();

    const svg = d3.select("#barChart")
                  .append("svg")
                  .attr("width", 800)
                  .attr("height", 400);

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
                .domain(data.map(d => d.topic))
                .range([0, width])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.intensity)])
                .nice()
                .range([height, 0]);

    g.append("g")
     .selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
     .attr("x", d => x(d.topic))
     .attr("y", d => y(d.intensity))
     .attr("width", x.bandwidth())
     .attr("height", d => height - y(d.intensity))
     .attr("fill", "steelblue");

    g.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", `translate(0,${height})`)
     .call(d3.axisBottom(x));

    g.append("g")
     .attr("class", "axis axis--y")
     .call(d3.axisLeft(y));
  };

  return <div id="barChart"></div>;
};

export default BarChartComponent;
