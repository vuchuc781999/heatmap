const Point = require('../models/point');
const { findPage, createPage } = require('../helpers/page');
const { countPoint, updatePoint } = require('../helpers/point');

exports.updatePoint = async (req, res) => {

  try {
    const { hostname, pathname, coordinates } = req.body;
    let page = await findPage(hostname, pathname);
    
    if (!page) {
      page = await createPage(hostname, pathname, true);
    }

    await res.send('Updated !!!');

    const pageID = page.id;
    const pointsInPage = await Point.find({ pageID: pageID });
    const countedCoordinates = await countPoint(coordinates);
    for (const e of countedCoordinates) {
      await updatePoint(pageID, pointsInPage, e);
    }
  } catch (err) {
    console.error(err);
  }
}

exports.getPoint = async (req, res) => {
  const { hostname, pathname } = req.query;

  if (!hostname && !hostname) {
    return res.send("Hostname or Pathname is required !!!");
  }

  try {
    const page = await findPage(hostname, pathname);
    
    if (page) {
      const points = await Point.find({
        pageID: page.id
      });
      const coordinates = points.map((e) => {
        return {
          x: e.x,
          y: e.y,
          n: e.n
        };
      });

      res.json({ coordinates: coordinates });
    } else {
      res.send("This website doesn't exist !!!")
    }
  } catch(err) {
    console.error(err);
    res.send("Can't get data !!!");
  }
}