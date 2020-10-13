/**
 *  network.js - For making network requests
 *
 */
export const getPageHtml = async (url) => {
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
