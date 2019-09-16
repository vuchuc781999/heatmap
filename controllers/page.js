const Page = require('../models/page');
const { findPage, createPage } = require('../helpers/page');

exports.createPage = async (req, res) => {
  const { hostname, pathname, width, height } = req.query;
  
  try {
    if (!hostname && !pathname) {
      return res.send("Hostname or Pathname is required !!!");
    }
    
    const isCreated = await createPage(hostname, pathname, width, height);
  
    if (isCreated) {
      res.send('Created Successfully !!!');
    } else {
      res.send('This website existed !!!');
    }
  } catch (error) {
    console.error(error);
  }
}

exports.getSize = async (req, res) => {
  try {
    const {hostname, pathname} = req.query;

    const page = await findPage(hostname, pathname);

    if (!page) {
      return res.send('This page doesn\'t exist !!!');
    }

    res.json({
      width: page.width,
      height: page.height
    });
  } catch (err) {
    console.error(err);
  }
}