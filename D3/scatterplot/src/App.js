import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function App() {
  return (
    <div className="main">
      <div className="container">
        <h2 id="title">Doping in Professional Bicycle Racing</h2>
        <h4>35 Fastest times up Alpe d'Huez</h4>
        <ScatterPlot />
      </div>
    </div>
  );
}

const ScatterPlot = () => {
  const scatterPlotRef = useRef(null);
  const apiUrl =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (res.status === 404) {
          throw new Error("API url not available");
        }
        console.log("data fetched");
        return res.json();
      })
      .then((res) => {
        drawScatterplot(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const drawScatterplot = (data) => {
    const width = 800,
      height = 400;

    const tooltip = d3
      .select(scatterPlotRef.current)
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);

    const svg = d3
      .select(scatterPlotRef.current)
      .append("svg")
      .attr("width", width + 100)
      .attr("height", height + 60);

    //xAxis
    let yearsDate = data.map((item) => {
      return item.Year;
    });
    let xMax = d3.max(yearsDate) + 1;
    let xScale = d3
      .scaleLinear()
      .domain([d3.min(yearsDate) - 1, xMax])
      .range([0, width]);
    let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")); // to format in form of years...
    svg
      .append("g")
      .attr("transform", "translate(60," + height + ")")
      .attr("id", "x-axis")
      .call(xAxis);

    //yAxis
    let specifier = "%M:%S";

    let parsedData = [];
    data.forEach(function (d) {
      var parsedTimeSplit = d.Time.split(":");
      parsedData.push(
        new Date(1970, 0, 1, 0, parsedTimeSplit[0], parsedTimeSplit[1])
      );
    });
    let yScale = d3
      .scaleTime()
      .domain(d3.extent(parsedData))
      .range([0, height]);
    let yAxis = d3.axisLeft(yScale).tickFormat(function (d) {
      return d3.timeFormat(specifier)(d);
    });
    svg
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .attr("transform", "translate(60,0)");

    //circles
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", function (d) {
        return xScale(d.Year);
      })
      .attr("cy", function (d, i) {
        return yScale(parsedData[i]);
      })
      .attr("r", 6)
      .attr("transform", "translate(60,0)")
      .attr("fill", (d) => (d.Doping === "" ? "orange" : "skyblue"))
      .attr("stroke", "black")
      .attr("data-xvalue", (d) => d.Year)
      .attr("data-yvalue", (d, i) => {
        return parsedData[i].toISOString();
      })
      .on("mouseover", function (event, d) {
        const e = d3.selectAll("circle").nodes();
        const i = e.indexOf(this);
        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(
            d.Name +
              ": " +
              d.Nationality +
              "<br/>" +
              "Year: " +
              d.Year +
              "  Time: " +
              d.Time +
              (d.Doping ? "<br/><br/>" + d.Doping : "")
          )
          .style("left", xScale(d.Year) + -25 + "px")
          .style("top", yScale(parsedData[i]) + "px")
          .attr("data-year", d.Year);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    //legend
    var legendContainer = svg.append("g").attr("id", "legend");

    legendContainer
      .append("circle")
      .attr("cx", 620)
      .attr("cy", 130)
      .attr("r", 9)
      .style("fill", "orange");
    legendContainer
      .append("circle")
      .attr("cx", 620)
      .attr("cy", 160)
      .attr("r", 9)
      .style("fill", "skyblue");
    legendContainer
      .append("text")
      .attr("x", 640)
      .attr("y", 130)
      .text("No doping allegations")
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
    legendContainer
      .append("text")
      .attr("x", 640)
      .attr("y", 160)
      .text("Riders with doping allegations")
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
  };
  return <div id="scatterplot" ref={scatterPlotRef}></div>;
};

export default App;
