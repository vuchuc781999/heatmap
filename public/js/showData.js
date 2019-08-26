(async (hostURL, hostname, pathname) => {
  try {
    const url = hostURL + '?hostname=' + hostname + '&pathname=' + pathname;
    const res = await fetch(url);
    const data = await res.json();
    const coordinates = data.coordinates;
    
    let width = 0;
    let height = 0;

    for (let i = coordinates.length - 1; i >= 0; i--) {
      if (coordinates[i].x > width) {
        width = coordinates[i].x;
      }
      if (coordinates[i].y > height) {
        height = coordinates[i].y;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    canvas.style.position = "absolute";
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.display = "none";
    canvas.id = "heat-map";

    const ctx = canvas.getContext("2d");
    const imgData = ctx.createImageData(width, height);

    for (let i = 0; i < coordinates.length; i++) {
      const index = (coordinates[i].y * width + coordinates[i].x) * 4
      if (!imgData.data[index + 3]) {
        imgData.data[index + 1] = 255;
        imgData.data[index + 3] = 255;
      } else {
        if (imgData.data[index] < 255) {
          imgData.data[index] = ((imgData.data[index] / 255) * 100 + 1) / 100 * 255;
        }
        if (imgData.data[index + 1] > 0) {
          imgData.data[index + 1] = ((imgData.data[index + 1] / 255) * 100 - 1) / 100 * 255;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    document.getElementsByTagName('body')[0].appendChild(canvas);
  } catch (error) {
    console.error(error)
  }

})('http://localhost:5000/points', window.location.hostname, window.location.pathname.replace(/\//g, '%2F'));