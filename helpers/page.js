const Page = require('../models/page');

exports.findPage = async (hostname, pathname) => {
  try {
    const pageResult = await Page.find({
      hostname: hostname,
      pathname: pathname
    }).limit(1);
    
    if (pageResult.length == 0) {
      return false;
    }
  
    return pageResult[0];
  } catch (error) {
    console.error(error);
  }
}

exports.createPage = async (hostname, pathname, width, height, isFound = false) => {
  try {
    let pageResult = false;

    if (!isFound) {
      pageResult = await this.findPage(hostname, pathname);
    }

    if (!pageResult) {
      const newPage = new Page({
        hostname: hostname,
        pathname: pathname,
        width: width,
        height: height
      });

      newPage.save();
      return newPage;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
}