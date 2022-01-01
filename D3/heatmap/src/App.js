import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function App() {
  return (
    <div className="container">
      <Heatmap />
    </div>
  );
}

const Heatmap = () => {
  const heatmapRef = useRef(null);

  const apiUrl =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (res.status === 404) {
          throw new Error("URL api no available");
        }
        return res.json();
      })
      .then((res) => {
        drawHeatmap(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const drawHeatmap = (data) => {
    // set the dimensions and margins of the graph
    let margin = { top: 130, right: 25, bottom: 30, left: 80 },
      width = 1200 - margin.left - margin.right,
      height = 510 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(heatmapRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //basic parsing data
    let baseT = data.baseTemperature;
    let years = d3.map(data.monthlyVariance, function (d) {
      return d.year;
    });
    let months = d3.map(data.monthlyVariance, function (d) {
      return d.month - 1;
    });
    let temp = d3.map(data.monthlyVariance, function (d) {
      return baseT + d.variance;
    });

    // Build X scales and axis:
    let xMax = d3.max(years) + 1;
    let xMin = d3.min(years) - 1;
    let xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);
    let xAxis = d3
      .axisBottom(xScale)
      .tickFormat(d3.format("d"))
      .tickValues(d3.range(1760, 2020, 10));

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("id", "x-axis")
      .call(xAxis);

    // Build Y scales and axis:
    let specifier = "%B";
    let parsedMonths = [];
    months.map(function (d) {
      parsedMonths.push(new Date(1970, d, 1));
    });

    let yScale = d3
      .scaleTime()
      .domain(d3.extent(parsedMonths))
      .range([0, height]);
    let yAxis = d3.axisLeft(yScale).tickFormat(function (d) {
      return d3.timeFormat(specifier)(d);
    });
    svg.append("g").call(yAxis).attr("id", "y-axis");

    // Build color scale
    let myColor = d3
      .scaleSequential()
      .interpolator(d3.interpolateTurbo)
      .domain([d3.min(temp), d3.max(temp)]);

    // create a tooltip
    let tooltip = d3
      .select(heatmapRef.current)
      .append("div")
      .style("opacity", 0)
      .attr("className", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")
      .attr("id", "tooltip");

    // Three function that change the tooltip when user hover / move / leave a cell
    let mouseover = function (d) {
      tooltip.style("opacity", 1);
      d3.select(this) //marks the square
        .style("stroke", "black")
        .style("stroke-width", "0.8")
        .style("opacity", 1);
    };
    let mousemove = function (d, x, y, str, year) {
      tooltip
        .html(str)
        .style("left", x + "px") // clever position of the tooltip
        .style("top", y - 40 + "px")
        .attr("data-year", year);
    };
    let mouseleave = function (d) {
      tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
    };

    // add the squares
    svg
      .selectAll()
      .data(data.monthlyVariance)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return xScale(d.year);
      })
      .attr("y", function (d, i) {
        return yScale(new Date(1970, d.month, 1));
      })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", width / (xMax - xMin))
      .attr("height", height / 12)
      .attr("class", "cell")
      .attr("data-month", (d) => {
        return d.month - 1;
      })
      .attr("data-year", (d) => {
        return d.year;
      })
      .attr("data-temp", (d) => {
        return baseT + d.variance;
      })
      .style("fill", function (d) {
        return myColor(baseT + d.variance);
      })
      .attr("transform", "translate(0," + -2 * (height / 11) + ")")
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", function (event, d) {
        var x = xScale(d.year);
        var y = yScale(new Date(1970, d.month, 1));
        var date = new Date(d.year, d.month - 1);
        var str =
          "<span class='date'>" +
          d3.timeFormat("%Y - %B")(date) +
          "</span>" +
          "<br/>" +
          "<span class='temperature'>" +
          d3.format(".1f")(baseT + d.variance) +
          "&#8451;" +
          "</span>" +
          "<br />" +
          "<span class='variance'>" +
          d3.format("+.1f")(d.variance) +
          "&#8451;" +
          "</span>";
        mousemove(d, x, y, str, d.year);
      })
      .on("mouseleave", mouseleave);

    // add a legend
    const legend = d3
      .select(heatmapRef.current)
      .append("svg")
      .attr("width", 400 + 80 + 80)
      .attr("height", 100 + 20)
      .attr("id", "legend")
      .attr("transform", "translate(" + 80 + "," + 20 + ")")
      .append("g");

    let categoriesCount = 10;
    let legendWidth = 40;
    let categories = [...Array(categoriesCount)].map((_, i) => {
      const upperBound = (d3.max(temp) / categoriesCount) * (i + 1);
      const lowerBound = (d3.max(temp) / categoriesCount) * i;
      return {
        upperBound,
        lowerBound,
        color: d3.interpolateTurbo(upperBound / d3.max(temp)),
      };
    });

    legend
      .selectAll("rect")
      .data(categories)
      .enter()
      .append("rect")
      .attr("fill", (d) => d.color)
      .attr("x", (d, i) => legendWidth * i)
      .attr("width", legendWidth)
      .attr("height", 15);

    legend
      .selectAll("text")
      .data(categories)
      .join("text")
      .attr("transform", "rotate(90)")
      .attr("y", (d, i) => -legendWidth * i)
      .attr("dy", -30)
      .attr("x", 18)
      .attr("text-anchor", "start")
      .attr("font-size", 10)
      .text((d) => `${d.lowerBound.toFixed(1)} - ${d.upperBound.toFixed(1)}`);

    // Add title to graph
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -90)
      .attr("text-anchor", "left")
      .style("font-size", "18px")
      .attr("id", "title")
      .text("Monthly Global Land-Surface Temperature");

    // Add subtitle to graph
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -60)
      .attr("text-anchor", "left")
      .attr("id", "description")
      .style("font-size", "14px")
      .style("max-width", 400)
      .text("1753 - 2015: base temperature 8.66℃");
  };

  return <div id="heatMap" ref={heatmapRef}></div>;
};
export default App;
