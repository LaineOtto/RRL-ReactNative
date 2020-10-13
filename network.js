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

export const getFictionPage = async (fictionId) => {// TODO: Remove this function
  var url = "https://www.royalroad.com/fiction/" + fictionId;
  var htmlString =
    await getPageHtml(url)
    .then(response => {return response;});

  return htmlString;
};
