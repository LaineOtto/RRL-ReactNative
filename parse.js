/**
 *  parse.js - Where the parsing happens
 *
 */
import { useState } from 'react';
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

export const parseSearchResults = (htmlString) => {
  const [chapterData, setChapterData] = useState([]);
  console.log("parse");
  const $ = cheerio.load(htmlString);
  const chapterUrl = $('.fiction-title a').attr('href');
  const chapterTitle = $('.fiction-title').text();
  chapterUrl.each(function(i, elem) {
    console.log("each: " + elem);
  });
  // console.log("chapterUrl: " + chapterUrl);
  console.log("chapterTitle: " + chapterTitle);


  // $('.fiction-title').each(function(i, elem) {
  //   console.log("each: " + i);
  //   const chapterUrl = $('.fiction-title a').attr('href');
  //   const chapterTitle = $(this).text();
  //   setChapterData([...chapterData, {id:i,title:chapterTitle,url:chapterUrl}]);
  //   console.log("chapterData: " + chapterData);
  // });
  // return chapterData;
}
