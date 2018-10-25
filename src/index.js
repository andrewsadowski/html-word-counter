const fs = require("fs");

const puppeteer = require("puppeteer");
const htmlToText = require("html-to-text");
const wordCount = require("@iarna/word-count");
const argv = require("yargs")
  .alias("f", "filePath")
  .usage("Usage: add a file path with the -f flag")
  .example('urlWC -f "/absolute/path/to/file.ext"')
  .help("h").argv;

const { parseUrls, parsePath, exportToCSV } = require("../helper.js");

let filePath;

if (argv.f) {
  filePath = argv.f;
} else {
  filePath = "../urls.txt";
}

/**
 * Gets word count of each URL in URL array
 */
(async filePath => {
  //Create URL array fomr urls.txt file
  const urls = parseUrls(filePath);
  let paths = parsePath(filePath);
  console.log(paths, paths.fileName, paths.dirPath);
  // Create CSV header
  exportToCSV("URL" + "\t" + "Word Count");

  //Loop through URL array, launch puppeteer, grab html content,
  //Get a word count => write it to the output csv file
  for (const url of urls) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
    const text = htmlToText.fromString(html, {
      wordwrap: false,
      ignoreHref: true,
      ignoreImage: true
    });
    browser.close();

    //Format CSV data with tab and line break and append to csv file
    exportToCSV(url + "\t" + wordCount(text));
  }
})(filePath);
