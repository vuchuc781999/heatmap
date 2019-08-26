const Page = require('../models/page');
const { createPage } = require('../helpers/page');

exports.createPage = async (req, res) => {
  try {
    if (!req.query.hostname && !req.query.pathname) {
      return res.send("Hostname or Pathname is required !!!");
    }
  
    const isCreated = await createPage(hostname, pathname);
  
    if (isCreated) {
      res.send('Created Successfully !!!');
    } else {
      res.send('This website existed !!!');
    }
  } catch (error) {
    console.error(error);
  }
}
