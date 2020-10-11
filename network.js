/**
 *  network.js - For making network requests
 *
 */

export const getFictionUrl = async (fictionIdUrl) => {
  var fictionUrl =
    await fetch(fictionIdUrl)
    .then(response => response.url)
    .then(url => {
      return url;
    })
    .catch((error) => {
      console.error(error);
  });
  return fictionUrl;
};

export const getFictionPageText = async (url) => {
  var htmlString =
    await fetch(url)
    .then(response => response.text())
    .then(text => {
      return text;
    })
    .catch((error) => {
      console.error(error);
  });
  return htmlString;
}
