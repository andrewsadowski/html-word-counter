const fs = require("fs");
const path = require("path");

/**
 * Creates an array of URLs separated by line breaks
 * @param {String} filePath Accepts a absolute path to text file
 * @return {Array} Array of URL strings
 * TODO: change parseUrls to accept
 */
const parseUrls = filePath => {
  const urlArr = [];
  const urls = fs
    .readFileSync(filePath)
    .toString()
    .split("\n");
  urls.forEach(url => {
    if (url) urlArr.push(url);
  });
  return urlArr;
};

/**
 * Appends a new CSV line to the output file
 * @param  {String} data String to append to file (CSV formatted)
 */
const exportToCSV = data => {
  //create/append data to file
  fs.appendFile("./output/wc/URL_WC.csv", data + "\n", err => {
    if (err) throw err;
    console.log(data);
  });
};

module.exports = {
  parseUrls,
  exportToCSV
};
