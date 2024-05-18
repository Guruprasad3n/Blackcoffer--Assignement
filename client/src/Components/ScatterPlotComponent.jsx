// frontend/src/Components/ScatterPlotComponent.js

import React, { useEffect } from 'react';
import * as d3 from 'd3';

const ScatterPlotComponent = ({ data }) => {
  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    d3.select("#scatterPlot").selectAll("*").remove();

    const svg = d3.select("#scatterPlot")
                  .append("svg")
                  .attr("width", 800)
                  .attr("height", 400);

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.likelihood)])
                .range([0, width]);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.relevance)])
                .range([height, 0]);

    g.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", `translate(0,${height})`)
     .call(d3.axisBottom(x));

    g.append("g")
     .attr("class", "axis axis--y")
     .call(d3.axisLeft(y));

    g.selectAll(".dot")
     .data(data)
     .enter().append("circle")
     .attr("class", "dot")
     .attr("cx", d => x(d.likelihood))
     .attr("cy", d => y(d.relevance))
     .attr("r", 5)
     .attr("fill", "steelblue");
  };

  return <div id="scatterPlot"></div>;
};

export default ScatterPlotComponent;
