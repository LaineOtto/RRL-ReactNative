/**
 *  parse.js - Where the parsing happens
 *
 */
import React, { useState } from 'react';
const cheerio = require('react-native-cheerio');
import voca from 'voca';

export const parseChapterLinks = (htmlString) => {
  const $ = cheerio.load(htmlString);
  const chapterLinks = [];
  var j = 0;
  $('td a').each(function(i, elem) {
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

export const parseSearchResults = (htmlString) => {
  const $ = cheerio.load(htmlString, {normalizeWhitespace: true});
  let fictionData = [];
  // fictionData = $('.fiction-list-item').map(function(i, elem) {
  //   console.log("i: " + $(this).children());
  //   const newFictionUrl =
  //     "https://www.royalroad.com"
  //     + $(this).children('.fiction-title a').attr('href');
  //   var newFictionTitle = $(this).children('.fiction-title').text();
  //   console.log("newFictionUrl: " + newFictionUrl);
  //   console.log("newFictionTitle: " + newFictionTitle);
  //   newFictionTitle = voca.trim(newFictionTitle);
  //   let newFictionData = {
  //     id: i,
  //     title: newFictionTitle,
  //     url: newFictionUrl
  //   };
  //   return newFictionData;
  // });
  fictionData = $('.fiction-title').map(function(i, elem) {
    const newFictionUrl =
      "https://www.royalroad.com"
      + $(this).children('a').attr('href');
    var newFictionTitle = $(this).text();
    newFictionTitle = voca.trim(newFictionTitle);
    let newFictionData = {
      id: i,
      title: newFictionTitle,
      url: newFictionUrl
    };
    return newFictionData;
  });
  return fictionData;
}
