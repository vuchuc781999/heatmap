const collectDataNode = document.createElement('script');
collectDataNode.type = 'text/javascript';
collectDataNode.src = 'http://localhost:5000/js/collectData.js';
collectDataNode.defer = true;

const child = document.getElementsByTagName('script')[0];
child.parentNode.insertBefore(collectDataNode, child);

const showDataNode = document.createElement('script');
showDataNode.type = 'text/javascript';
showDataNode.src = 'http://localhost:5000/js/showData.js';
showDataNode.defer = true;

child.parentNode.insertBefore(showDataNode, child);
