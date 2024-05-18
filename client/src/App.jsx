// frontend/src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterComponent from './Components/FilterComponent';
import BarChartComponent from './Components/BarChartComponent';
import LineChartComponent from './Components/LineChartComponent';
import PieChartComponent from './Components/PieChart';
// import TreeChartComponent from './Components/TreeChartComponent';
import ScatterPlotComponent from './Components/ScatterPlotComponent';
import Chart from './Components/Chart';
import PieChart from './Components/PieChart';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(response => {
        setData(response.data.data);
        setFilteredData(response.data.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    let tempData = data;

    if (filters.endYear) {
      tempData = tempData.filter(d => d.end_year === filters.endYear);
    }
    if (filters.topic) {
      tempData = tempData.filter(d => d.topic === filters.topic);
    }
    if (filters.sector) {
      tempData = tempData.filter(d => d.sector === filters.sector);
    }
    if (filters.region) {
      tempData = tempData.filter(d => d.region === filters.region);
    }
    if (filters.pestle) {
      tempData = tempData.filter(d => d.pestle === filters.pestle);
    }
    if (filters.source) {
      tempData = tempData.filter(d => d.source === filters.source);
    }
    if (filters.country) {
      tempData = tempData.filter(d => d.country === filters.country);
    }
    if (filters.city) {
      tempData = tempData.filter(d => d.city === filters.city);
    }

    setFilteredData(tempData);
  };

  return (
    <div>
      <h1>Data Dashboard</h1>
      <Chart />
      <PieChart />

    </div>
  );
};

export default App;
