/**
 *  parse.js - Where the parsing happens
 *
 */
import React, { useState } from 'react';
const cheerio = require('react-native-cheerio');

export const parseChapterLinks = (htmlString) => {
  const $ = cheerio.load(htmlString);
  const chapterLinks = [];
  var j = 0;
  $('td a').each(function(i, elem) { //for each 'td a' add its link to chLinks
    var href = $(this).attr('href');
    if (href) {
      chapterLinks[j] = "https://www.royalroad.com" + href;
      j += 1;
    }
  });
  return chapterLinks;
}

export const parseChapterContent = (htmlString) => {
  const $ = cheerio.load(htmlString);
  const chapterContent = $('.chapter-inner').html();
  return chapterContent;
}

export const getFictionUrl = ($) => {

}

export const parseSearchResults = (htmlString) => {
  console.log("parse");
  // const [fictionData, setfictionData] = useState([]);
  const $ = cheerio.load(htmlString);
  $('.fiction-title').map(function(i, elem) {
    const newFictionUrl =
      "https://www.royalroad.com"
      + $(this).children('a').attr('href');
    const newFictionTitle = $(this).text();
    console.log(newFictionUrl);
    console.log(newFictionTitle);
    // const data = [{
    //   index: i,
    //   fictionUrl: fictionUrl,
    //   fictionTitle: fictionTitle
    // }];
    // console.log("data: " + data);

    // const newData = fictionData.concat({
    //   index: i,
    //   fictionUrl: fictionUrl,
    //   fictionTitle: fictionTitle
    // });
    // setfictionData(...fictionData, newData);
  });
  // return fictionData;
  return "foo";
}
