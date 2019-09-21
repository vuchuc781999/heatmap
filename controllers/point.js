const csv = require('csv-express');
const Point = require('../models/point');
const { findPage, createPage } = require('../helpers/page');
const { countPoint, updatePoint } = require('../helpers/point');

exports.updatePoint = async (req, res) => {
  try {
    const { hostname, pathname, coordinates } = req.body;
    const page = await findPage(hostname, pathname);
    
    if (!page) {
      return res.send('This page does not exist !!!');
    }

    const pageID = page.id;
    let width = page.width;
    let height = page.height;

    for (const e of coordinates) {
      const newPoint = new Point({
        pageID: pageID,
        x: e.x,
        y: e.y
      });

      await newPoint.save();

      if (e.x > width) {
        width = e.x;
      }

      if (e.y > height) {
        height = e.y;
      }
    }

    page.width = width;
    page.height = height;
    await page.save();

    console.log('Saved !!!')
    res.send('Updated !!!');
  } catch (err) {
    console.error(err);
  }
}

exports.getPoint = async (req, res) => {
  const { hostname, pathname, csv } = req.query;

  if (!hostname && !hostname) {
    return res.send("Hostname or Pathname is required !!!");
  }

  try {
    const page = await findPage(hostname, pathname);
    
    if (!page) {
      return res.send('This page does not exist !!!');
    }

    const points = await Point.find({
      pageID: page.id
    });
    const coordinates = points.map((e) => {
      return {
        x: e.x,
        y: e.y
      };
    });

    if (csv) {
      return res.csv(coordinates, true);
    }

    res.json({
      width: page.width,
      height: page.height,
      coordinates: coordinates
    });
  } catch(err) {
    console.error(err);
  }
}