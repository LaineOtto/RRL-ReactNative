/**
 *  network.js - For making network requests
 *
 */
export const getPageText = async (url) => {
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

export const getFictionPage = async (fictionId) => {
  var url = "https://www.royalroad.com/fiction/" + fictionId;
  var htmlString =
    await getPageText(url)
    .then(response => {return response;});

  return htmlString;
};
