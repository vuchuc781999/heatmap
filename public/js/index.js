(async (url, collect, show, tag) => {
  const d3Script1 = document.createElement('script');
  d3Script1.src = 'https://d3js.org/d3.v4.js';
  const d3Script2 = document.createElement('script');
  d3Script2.src = 'https://d3js.org/d3-contour.v1.min.js';
  const headTag = document.getElementsByTagName('head')[0];
  headTag.appendChild(d3Script1);
  headTag.appendChild(d3Script2);

  await fetch(`${url}/page/create?hostname=${window.location.hostname}&pathname=${window.location.pathname}&width=0&height=0`);

  const collectDataNode = document.createElement('script');
  collectDataNode.type = 'text/javascript';
  collectDataNode.src = url + collect;
  collectDataNode.defer = true;

  headTag.appendChild(collectDataNode);

  const showDataNode = document.createElement('script');
  showDataNode.type = 'text/javascript';
  showDataNode.src = url + show;
  showDataNode.defer = true;

  headTag.appendChild(showDataNode);
})('http://localhost:5000', '/js/collectData.js', '/js/showData.js', 'script');

const show = () => {
  document.getElementById("density").style.display = "initial";
}

const hide = () => {
  document.getElementById("density").style.display = "none";
}