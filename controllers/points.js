const Points = require('../models/points')

exports.savePoints = async (req, res) => {
  let msg = 'Saved successfully !!!';

  try {
    const points = await Points.find({
      hostname: req.body.hostname,
      pathname: req.body.pathname
    }).limit(1);

    points[0].coordinates.push(...req.body.coordinates);
    points[0].save();
  } catch(err) {
    msg = "Can't save !!!";
    console.error(err);
  };

  res.send(msg);
}

exports.createPoints = async (req, res) => {
  const _points = await Points.find({
    hostname: req.query.hostname,
    pathname: req.query.pathname
  }).limit(1);

  if (_points.length == 0) {
    const points = new Points({
      hostname: req.query.hostname,
      pathname: req.query.pathname,
      coordinates: []
    });
  
    points.save();
    res.send('Created Successfully !!!');
  } else {
    res.send('This website existed !!!');
  }
}

exports.getPoints = async (req, res) => {
  try {
    const points = await Points.find({
      hostname: req.query.hostname,
      pathname: req.query.pathname
    }).limit(1);
    
    if (points.length > 0) {
      res.json({ coordinates: points[0].coordinates });
    } else {
      res.send("This website doesn't exist !!!")
    }
  } catch(err) {
    console.error(err);
    res.send("Can't get data !!!");
  }
}