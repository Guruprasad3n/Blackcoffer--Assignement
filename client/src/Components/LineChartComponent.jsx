// frontend/src/Components/LineChartComponent.js

import React, { useEffect } from 'react';
import * as d3 from 'd3';

const LineChartComponent = ({ data }) => {
  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    d3.select("#lineChart").selectAll("*").remove();

    const svg = d3.select("#lineChart")
                  .append("svg")
                  .attr("width", 800)
                  .attr("height", 400);

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
                .domain(d3.extent(data, d => new Date(d.published)))
                .range([0, width]);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.intensity)])
                .nice()
                .range([height, 0]);

    const line = d3.line()
                   .x(d => x(new Date(d.published)))
                   .y(d => y(d.intensity));

    g.append("path")
     .datum(data)
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 1.5)
     .attr("d", line);

    g.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", `translate(0,${height})`)
     .call(d3.axisBottom(x));

    g.append("g")
     .attr("class", "axis axis--y")
     .call(d3.axisLeft(y));
  };

  return <div id="lineChart"></div>;
};

export default LineChartComponent;
