(async (d, id, location, url, bandwidth) => {
  try {
    const density = d.createElement('div');
    density.setAttribute("id", id);
    density.style.position = "absolute";
    density.style.top = "0px";
    density.style.left = "0px";
    density.style.margin = "0px";
    density.style.padding = "0px";
    density.style.opacity = ".75";
    density.style.display = "none";

    const body = d.getElementsByTagName("body")[0];
    body.appendChild(density);

    const hostname = location.hostname;
    const pathname = location.pathname.replace(/\//g, '%2F');

    let width = Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    );

    let height = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    const svg = d3.select("#" + id)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    d3.csv(`${url}/point?hostname=${hostname}&pathname=${pathname}&csv=true`, (data) => {
      const color = d3.scaleLinear()
        .domain([0, 0.134, 0.293, 0.5, 1])
        .range([ "#ffffff", "#7fff7f", "#7f7fff", "#ffff7f", "#ff0000" ]);

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
})(document, "density", window.location, "http://localhost:5000", 20)