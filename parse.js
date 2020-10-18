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

// export const getFictionUrl = ($) => {
//
// }

export const parseSearchResults = (htmlString) => {
  console.log("parse");
  const $ = cheerio.load(htmlString);
  let fictionData = [];
  fictionData = $('.fiction-title').map(function(i, elem) {
    const newFictionUrl =
      "https://www.royalroad.com"
      + $(this).children('a').attr('href');
    const newFictionTitle = $(this).text();
    console.log(newFictionUrl);
    console.log(newFictionTitle);

    let newFictionData = {
      id: i,
      fictionTitle: newFictionTitle,
      fictionUrl: newFictionUrl
    };
    console.log("newFictionData: " + newFictionData.fictionTitle);
    return newFictionData;
  });
  console.log("fictionData: " + fictionData[0].fictionUrl);
  return fictionData;
}
