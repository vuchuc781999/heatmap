((url, hostname, pathname) => {
  let coordinates = [];

  const postData = async (url, data = {}) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const text = await res.text();
      console.log(text);
    } catch (err) {
      console.error(err);
    }
  }
  
  window.addEventListener("click", (e) => {
    const x = e.x + window.scrollX;
    const y = e.y + window.scrollY;
  
    coordinates.push({
      x: x,
      y: y
    })
  })
  
  const events = ['hashchange', 'unload', 'beforeunload', 'pagehide'];
  
  events.forEach(event => {
    window.addEventListener(event, () => {
      if (coordinates.length > 0) {
        postData(url, {
          hostname: hostname,
          pathname: pathname,
          coordinates: coordinates
        });
        
        hostname = window.location.hostname;
        pathname = window.location.pathname;
        coordinates = [];
      }
    })
  });
})('http://localhost:5000/point', window.location.hostname, window.location.pathname);