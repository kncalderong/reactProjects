import React, { useEffect, useRef, useState } from "react";
import * as topojson from "topojson-client";
import * as d3 from "d3";

function App() {
  return (
    <div className="container">
      <h2 id="title">United States Educational Attainment</h2>
      <h4 id="description">
        Percentage of adults age 25 and older with a bachelor's degree or higher
        (2010-2014)
      </h4>
      <ChoropletMap />
    </div>
  );
}

const ChoropletMap = () => {
  const choropletRef = useRef(null);
  // const [map, setMap] = useState({});
  // const [edu, setEdu] = useState({});
  const apiUrlMap =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
  const apiUrlEdu =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

  useEffect(() => {
    const mapPromise = fetch(apiUrlMap).then((res) => res.json());
    const eduPromise = fetch(apiUrlEdu).then((res) => res.json());

    //only when the two promises are returned, and the data is loaded, then draw the choroplet
    Promise.all([mapPromise, eduPromise]).then((values) => {
      let map = values[0];
      let edu = values[1];
      drawChoroplet(map, edu);
    });
  }, []);

  const drawChoroplet = (map, edu) => {
    let path = d3.geoPath();

    let bachelorsData = edu.map((d) => {
      return d.bachelorsOrHigher;
    });
    let eduDataByFip = {};
    edu.forEach((d) => (eduDataByFip[d.fips] = d.bachelorsOrHigher));

    //create svg
    let width = 960;
    let height = 600;

    console.log(map.objects.counties);

    let svg = d3
      .select(choropletRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    let g = svg.append("g");

    // Build color scale
    let myColor = d3
      .scaleSequential()
      .interpolator(d3.interpolateYlGn)
      .domain([d3.min(bachelorsData), d3.max(bachelorsData)]);

    //Create a Tooltip
    var tooltip = d3
      .select(choropletRef.current)
      .append("div")
      .style("opacity", 0)
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
    let mousemove = function (str, x, y, edu) {
      tooltip
        .html(str)
        .style("position", "absolute")
        .style("left", x + "px") // clever position of the tooltip
        .style("top", y - 10 + "px")
        .style("font-size", "15px")
        .attr("data-education", edu);
    };
    let mouseleave = function (d) {
      tooltip.style("opacity", 0);
    };

    // Bind TopoJSON data
    g.selectAll("path")
      .data(topojson.feature(map, map.objects.counties).features) // Bind TopoJSON data elements
      // pass through what objects you want to use -- in this case we are doing county lines...but also u can use 'states'
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "county")
      .attr("data-fips", (d) => {
        let res = edu.filter((item) => {
          return item.fips === d.id;
        });
        return res[0].fips;
      })
      .attr("data-education", (d) => {
        let res = edu.filter((item) => {
          return item.fips === d.id;
        });
        return res[0].bachelorsOrHigher;
      })
      .style("fill", (d) => {
        return myColor(eduDataByFip[d.id]);
      })
      .on("mouseover", mouseover)
      .on("mousemove", function (event, d) {
        const e = d3.selectAll("circle").nodes();
        const i = e.indexOf(this);
        let res = edu.filter((item) => {
          return item.fips === d.id;
        });
        let coordinates = d3.pointer(event);
        let x = coordinates[0];
        let y = coordinates[1];
        let educationAttr = res[0].bachelorsOrHigher;

        let str =
          res[0].area_name +
          ", " +
          res[0].state +
          "<br/>" +
          res[0].bachelorsOrHigher +
          "%";

        mousemove(str, x, y, educationAttr);
      })
      .on("mouseleave", mouseleave);

    //add lines in the states
    g.append("path")
      .datum(topojson.mesh(map, map.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "#b2bec3")
      .attr("d", path);

    // add a legend
    const legend = svg
      .append("g")
      .attr("id", "legend")
      .attr("width", 400 + 80 + 80)
      .attr("height", 100 + 20)
      .attr("transform", "translate(600,0)");
    let categoriesCount = 7;
    let legendWidth = 40;
    let categories = [...Array(categoriesCount)].map((_, i) => {
      const upperBound = (d3.max(bachelorsData) / categoriesCount) * (i + 1);
      const lowerBound = (d3.max(bachelorsData) / categoriesCount) * i;
      return {
        upperBound,
        lowerBound,
        color: d3.interpolateYlGn(upperBound / d3.max(bachelorsData)),
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
      .attr("font-size", 13)
      .text((d) => `${d.upperBound.toFixed(1)} %`);
  }; //end of drawChoroplet

  return <div id="choroplet-map" ref={choropletRef}></div>;
};
export default App;
