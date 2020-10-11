const cheerio = require('react-native-cheerio');

export const getFictionUrl = async (fictionIdUrl) => {
  var fictionUrl =
    await fetch(fictionIdUrl) // TODO: put in separate file so I can return the url as a string
    .then(response => response.url)
    .then(url => {
      return url;
    })
    .catch((error) => {
      console.error(error);
  });
  return fictionUrl;
};
