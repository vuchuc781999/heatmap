const Points = require('../../models/points');

const points = new Points({
  hostname: "abcd.xyz",
  pathname: "/test/points",
  coordinates: [
    { x: 10, y: 10, w: 1920, h: 1080 },
    { x: 20, y: 20, w: 1920, h: 1080 }
  ]
})

points.save().then(() => {
  console.log('saved');
});