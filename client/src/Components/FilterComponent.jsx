import React from "react";
import "./filterStyle.css";

const FilterComponent = ({ filters, onFilterChange }) => {
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label className="filter-label">
          End Year:
          <select
            className="filter-select"
            name="endYear"
            value={filters.endYear}
            onChange={handleSelectChange}
          >
            <option value="">All</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
        </label>
      </div>
      <div className="filter-item">
        <label className="filter-label">
          Topic:
          <select className="filter-select"
            name="topic"
            value={filters.topic}
            onChange={handleSelectChange}
          >
            <option value="">All</option>
            <option value="gas">Gas</option>
            <option value="war">war</option>
            <option value="production">production</option>
            <option value="oil">oil</option>
            <option value="consumption">consumption</option>
            <option value="market">market</option>
            <option value="gdp">gdp</option>
          </select>
        </label>
      </div>
      <div className="filter-item">
        <label className="filter-label">
          Sector:
          <select className="filter-select"
            name="sector"
            value={filters.sector}
            onChange={handleSelectChange}
          >
            <option value="">All</option>
            <option value="Energy">Energy</option>
            <option value="Economic">Economic</option>
            <option value="Industries">Industries</option>
            <option value="Environmental">Environmental</option>
            <option value="Political">Political</option>
          </select>
        </label>
      </div>
      <div className="filter-item">
        <label className="filter-label">
          Region:
          <select className="filter-select"
            name="region"
            value={filters.region}
            onChange={handleSelectChange}
          >
            <option value="">All</option>
            <option value="Northern America">Northern America</option>
            <option value="World">World</option>
            <option value="Central America">Central America</option>
            <option value="Western Africa">Western Africa</option>
            <option value="Western Asia">Western Asia</option>
          </select>
        </label>
      </div>
      <div className="filter-item">
        <label className="filter-label">
          Pestle:
          <select className="filter-select"
            name="pestle"
            value={filters.pestle}
            onChange={handleSelectChange}
          >
            <option value="">All</option>
            <option value="Industries">Industries</option>
            <option value="Economic">Economic</option>
            <option value="Political">Political</option>
            <option value="Environmental">Environmental</option>
            <option value="Technological">Technological</option>
          </select>
        </label>
      </div>
      <div className="filter-item">
        <label className="filter-label">
          Source:
          <select className="filter-select"
            name="source"
            value={filters.source}
            onChange={handleSelectChange}
          >
            <option value="">All</option>
            <option value="EIA">EIA</option>
            <option value="EV Obsession">EV Obsession</option>
            <option value="sustainablebrands.com">sustainablebrands.com</option>
            <option value="SBWire">SBWire</option>
            <option value="CleanTechnica">CleanTechnica</option>
            <option value="TRAC News">TRAC News</option>
          </select>
        </label>
      </div>
      <div className="filter-item">
        <label className="filter-label">
          SWOT:
          <select className="filter-select"
            name="swot"
            value={filters.swot}
            onChange={handleSelectChange}
          >
            <option value="">All</option>
            <option value="Strength">Strength</option>
            <option value="Weakness">Weakness</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Threat">Threat</option>
          </select>
        </label>
      </div>
      <div className="filter-item">
        <label className="filter-label">
          Country:
          <select className="filter-select"
            name="country"
            value={filters.country}
            onChange={handleSelectChange}
          >
            <option value="">All</option>
            <option value="United States of America">
              United States of America
            </option>
            <option value="Nigeria">Nigeria</option>
            <option value="Mexico">Mexico</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Russia">Russia</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default FilterComponent;
