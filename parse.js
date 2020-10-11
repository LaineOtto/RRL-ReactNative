/**
 *  parse.js - Where the parsing happens
 *
 */
const cheerio = require('react-native-cheerio');

export const parseForChapterLinks = (fictionPage) => {
  const $ = cheerio.load(fictionPage);
  const chapterLinks = [];
  var j = 0;
  $('td a').each(function(i, elem) {
    var href = $(this).attr('href');
    if (href) {
      chapterLinks[j] = href;
      j = j + 1;
    }
  });
  return chapterLinks;
}
