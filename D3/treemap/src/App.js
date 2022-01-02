import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function App() {
  return (
    <div className="super-container">
      <div className="container">
        <h2 id="title">Video Game Sales</h2>
        <h4 id="description">
          Top 100 Most Sold Video Games Grouped by Platform
        </h4>
        <Treemap />
      </div>
      <div id="legend" width="500"></div>
    </div>
  );
}

const Treemap = () => {
  const treemapRef = useRef(null);
  const apiUrl =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => drawTreemap(data));
  }, []);
  const drawTreemap = (data) => {
    //create svg
    let width = 960;
    let height = 600;

    let svg = d3
      .select(treemapRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    let g = svg.append("g");

    let root = d3.hierarchy(data).sum(function (d) {
      return d.value;
    }); // Here the size of each leave is given in the 'value' field in input data

    d3.treemap().size([width, height]).paddingInner(2)(
      // Padding between each rectangle
      root
    );

    // prepare a color scale
    let color = d3.scaleOrdinal(d3.schemeSet3.concat(d3.schemeTableau10));
    //Create a Tooltip
    let tooltip = d3
      .select(treemapRef.current)
      .append("div")
      .style("opacity", 0.8)
      .attr("class", "tooltip")
      .style("color", "white")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")
      .style("width", "150px")
      .attr("id", "tooltip");

    // Three function that change the tooltip when user hover / move / leave a cell
    let mouseover = function (d) {
      tooltip.style("opacity", 0.7);
    };
    let mousemove = function (str, x, y, value) {
      tooltip
        .html(str)
        .style("position", "absolute")
        .style("left", x + 20 + "px") // clever position of the tooltip
        .style("top", y - 100 + "px")
        .style("font-size", "12px")
        .attr("data-value", value);
    };
    let mouseleave = function (d) {
      tooltip.style("opacity", 0);
    };

    // use this information to add rectangles:
    var cell = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("class", "group")
      .attr("transform", function (d) {
        return "translate(" + d.x0 + "," + d.y0 + ")";
      });

    cell
      .append("rect")
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .style("stroke", "black")
      .attr("class", "tile")
      .style("fill", function (d) {
        return color(d.data.category);
      })
      .style("padding", "4px")
      .attr("data-name", function (d) {
        return d.data.name;
      })
      .attr("data-category", function (d) {
        return d.data.category;
      })
      .attr("data-value", function (d) {
        return d.data.value;
      })
      .on("mouseover", mouseover)
      .on("mousemove", function (event, d) {
        let x = event.pageX;
        let y = event.pageY;
        let str =
          "Name: " +
          d.data.name +
          "<br/>" +
          "Category: " +
          d.data.category +
          "<br/>" +
          "Value: " +
          d.data.value +
          " sales in million units";
        let value = d.data.value;
        mousemove(str, x, y, value);
      })
      .on("mouseleave", mouseleave);

    // and to add the text labels
    cell
      .append("text")
      .attr("font-size", "9")
      .attr("class", "tile-text")
      .selectAll("tspan")
      .data(function (d) {
        return d.data.name.split(/(?=[A-Z][^A-Z])/g);
      })
      .enter()
      .append("tspan")
      .attr("x", 4)
      .attr("y", function (d, i) {
        return 13 + i * 10;
      })
      .text(function (d) {
        return d;
      });

    //add a legend
    var categories = root.leaves().map(function (nodes) {
      return nodes.data.category;
    });
    categories = categories.filter(function (category, index, self) {
      return self.indexOf(category) === index;
    });

    var legendContainer = d3
      .select("#legend")
      .append("svg")
      .attr("id", "legendSVG");

    var legendElement = legendContainer
      .selectAll("g")
      .data(categories)
      .enter()
      .append("g")
      .attr("class", "legendElement");
    legendElement
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("class", "legend-item")
      .attr("x", (d, i) => {
        console.log(i);
        return i * 52;
      })
      .attr("y", 0)
      .attr("fill", function (d) {
        //console.log(d)
        return color(d);
      });

    legendElement
      .append("text")
      .attr("x", (d, i) => {
        return i * 52;
      })
      .attr("y", 35)
      .text(function (d) {
        return d;
      });
  }; // end of drawFunction
  return <div id="treemap" ref={treemapRef}></div>;
};

export default App;
