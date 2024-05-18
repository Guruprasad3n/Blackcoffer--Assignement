// frontend/src/Components/TreeChartComponent.js

import React, { useEffect } from 'react';
import * as d3 from 'd3';

const TreeChartComponent = ({ data }) => {
  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    d3.select("#treeChart").selectAll("*").remove();

    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 960 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#treeChart").append("svg")
                  .attr("width", width + margin.right + margin.left)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

    const root = d3.stratify()
                   .id(d => d.country)
                   .parentId(d => d.region)
                   (data);

    const treeLayout = d3.tree().size([height, width]);

    const treeData = treeLayout(root);

    const nodes = treeData.descendants();
    const links = treeData.links();

    const link = svg.selectAll(".link")
                    .data(links)
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("d", d3.linkHorizontal()
                                  .x(d => d.y)
                                  .y(d => d.x));

    const node = svg.selectAll(".node")
                    .data(nodes)
                    .enter().append("g")
                    .attr("class", "node")
                    .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("r", 5);

    node.append("text")
        .attr("dy", ".35em")
        .attr("x", d => d.children ? -13 : 13)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.id);
  };

  return <div id="treeChart"></div>;
};

export default TreeChartComponent;
