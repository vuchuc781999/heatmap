const Point = require('../models/point');

exports.countPoint = async (pointsArray) => {
  if (pointsArray.length === 0) {
    return [];
  }

  const sortedArray = [...pointsArray].sort((a, b) => {
    const temp = a.y - b.y;
    if (!temp) {
      return a.x - b.x;
    } else {
      return temp;
    }
  });

  let newArray = [{
    x: sortedArray[sortedArray.length - 1].x,
    y: sortedArray[sortedArray.length - 1].y,
    n: 1
  }];

  for (let i = sortedArray.length - 2; i >= 0; i--) {
    if (newArray[0].x === sortedArray[i].x && newArray[0].y === sortedArray[i].y) {
      newArray[0].n++;
    } else {
      newArray = [{
        x: sortedArray[i].x,
        y: sortedArray[i].y,
        n: 1
      }, ...newArray];
    }
  }

  return newArray;
}

exports.updatePoint = async (pageID, points, {x, y, n}) => {
  const result = points.find((e) => {
    return e.x === x && e.y == y;
  });

  if (!result) {
    const newPoint = new Point({
      pageID: pageID,
      x: x,
      y: y,
      n: n
    });

    await newPoint.save();
  } else {
    result.n += n;
    await result.save();
  }
}