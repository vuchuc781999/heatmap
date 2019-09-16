(async (d, id, location, url, bandwidth, startColor, endColor) => {
  try {
    const density = d.createElement('div');
    density.setAttribute("id", id);
    density.style.position = "absolute";
    density.style.top = "0px";
    density.style.left = "0px";
    density.style.margin = "0px";
    density.style.padding = "0px";
    density.style.opacity = ".5";
    density.style.display = "none";

    const body = d.getElementsByTagName("body")[0];
    body.appendChild(density);

    const hostname = location.hostname;
    const pathname = location.pathname.replace(/\//g, '%2F');
    const sizeInJson = await fetch(`${url}/page/size?hostname=${hostname}&pathname=${pathname}`);
    const size = await sizeInJson.json();
    const { width, height } = size;

    const svg = d3.select("#" + id)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    d3.csv(`${url}/point?hostname=${hostname}&pathname=${pathname}&csv=true`, (data) => {
      const color = d3.scaleLinear()
        .domain([0, 1])
        .range([ startColor, endColor ]);

      const densityData = d3.contourDensity()
        .x(d => d.x)
        .y(d => d.y)
        .size([width, height])
        .bandwidth(bandwidth)
        (data)

      svg.insert("g", "g")
        .selectAll("path")
        .data(densityData)
        .enter().append("path")
          .attr("d", d3.geoPath())
          .attr("fill", function(d) { return color(d.value); });
    });
  } catch (err) {
    console.error(err);
  }
})(document, "density", window.location, "http://localhost:5000", 10, "#000000", "#ffffff")