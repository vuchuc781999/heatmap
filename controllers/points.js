const Points = require('../models/points')

exports.savePoints = async (req, res) => {
  let msg;

  try {
    const _points = await Points.find({
      hostname: req.body.hostname,
      pathname: req.body.pathname
    }).limit(1);

    if (_points.length == 0) {
      const points = new Points({
        hostname: req.body.hostname,
        pathname: req.body.pathname,
        coordinates: [...req.body.coordinates]
      });
      points.save();
      msg = "Created and saved successfully !!!";
    } else {
      _points[0].coordinates.push(...req.body.coordinates);
      _points[0].save();
      msg = "Saved successfully !!!";
    }
  } catch(err) {
    msg = "Can't save !!!";
    console.error(err);
  };
  console.log(msg);
  res.send(msg);
}

exports.createPoints = async (req, res) => {
  if (!req.query.hostname && !req.query.pathname) {
    return res.send("Hostname or Pathname is required !!!");
  }

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
  if (!req.query.hostname && !req.query.pathname) {
    return res.send("Hostname or Pathname is required !!!");
  }

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