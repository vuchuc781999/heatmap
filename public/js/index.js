((url, collect, show, tag) => {
  const collectDataNode = document.createElement(tag);
  collectDataNode.type = 'text/javascript';
  collectDataNode.src = url + collect;
  collectDataNode.defer = true;

  const child = document.getElementsByTagName('script')[0];
  child.parentNode.insertBefore(collectDataNode, child);

  const showDataNode = document.createElement('script');
  showDataNode.type = 'text/javascript';
  showDataNode.src = url + show;
  showDataNode.defer = true;

  child.parentNode.insertBefore(showDataNode, child);
})('http://localhost:5000/js/', 'collectData.js', 'showData.js', 'script');

const show = () => {
  document.getElementById("heat-map").style.display = "initial";
}

const hide = () => {
  document.getElementById("heat-map").style.display = "none";
}