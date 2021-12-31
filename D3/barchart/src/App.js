import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

function App() {
  return (
    <div className="main">
      <div className="container">
        <div id="title">United States GDP</div>
        <BarChart />
      </div>
    </div>
  );
}

const BarChart = () => {
  const apiUrl =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  const [data, setData] = useState([]);
  const barChartRef = useRef(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (res.status === 404) {
          throw new Error("API url not available");
        }
        console.log("data fetched");
        return res.json();
      })
      .then((res) => drawBarChart(res.data))
      .catch((error) => console.log(error));
  }, []);

  const fetchData = async () => {
    const res = await fetch(apiUrl);
    const rawData = await res.json();
    setData(rawData.data);
    console.log("data loaded");
  };

  let width = 800,
    height = 400,
    barWidth = 800 / 275;

  const drawBarChart = (data) => {
    let tooltip = d3
      .select(barChartRef.current)
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);

    const svg = d3
      .select(barChartRef.current)
      .append("svg")
      .attr("width", width + 100)
      .attr("height", height + 60);

    // // these are the xaxis dates
    let yearsDate = data.map((item) => {
      return new Date(item[0]);
    });

    let xMax = new Date(d3.max(yearsDate, (d) => d));
    xMax.setMonth(xMax.getMonth() + 3); // to compensate end of year

    let xScale = d3
      .scaleTime()
      .domain([d3.min(yearsDate), xMax])
      .range([0, width]);

    let xAxis = d3.axisBottom(xScale).scale(xScale);
    svg
      .append("g")
      .attr("transform", "translate(60," + height + ")")
      .attr("id", "x-axis")
      .call(xAxis);

    // now the yaxis dates
    let GDP = data.map((item) => {
      return item[1];
    });

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(GDP)])
      .range([height, 0]);

    let gdpScale = d3
      .scaleLinear()
      .domain([0, d3.max(GDP)])
      .range([0, height]);

    let yAxis = d3.axisLeft(yScale);
    svg
      .append("g")
      .attr("transform", "translate(" + 60 + ",0)")
      .attr("id", "y-axis")
      .call(yAxis);
    //-----------------------------

    // now all the bars...
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        return xScale(yearsDate[i]);
      })
      .attr("y", (d, i) => {
        return height - gdpScale(d[1]);
      })
      .attr("width", barWidth)
      .attr("height", (d) => gdpScale(d[1]))
      .attr("fill", "#1abc9c")
      .attr("transform", "translate(60,0)")
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .on("mouseover", function (event, d) {
        const e = d3.selectAll("rect").nodes();
        const i = e.indexOf(this);
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(d[0].substring(0, 7) + "<br>" + "$" + d[1] + " Billion")
          .style("left", i * barWidth + 50 + "px")
          .style("top", height - 10 + "px")
          .style("transform", "translateX(30px)")
          .attr("data-date", d[0]);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    console.log("data drawed");
  };

  return <div id="barChart" ref={barChartRef}></div>;
};

export default App;
