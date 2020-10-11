import React from 'react';
import { View, Text, } from 'react-native';
import { getFictionUrl, fetchUrlAsync, } from './parse.js';

const getPage = async (fictionId, chapterID) => {
  var url = "https://www.royalroad.com/fiction/" + fictionId;
  var chapterUrl;
  var htmlString;

  if (!(chapterID)) {
    fetch(url)
    .then(response => response.text())
    .then(text => {
      htmlString = text;
      console.log(htmlString);
    })
    .catch((error) => {
      console.error(error);
    });
  } else {
    var fictionUrl;
    fetchUrlAsync(url)
    .then(response => {
      console.log("abcd: " + response);
    });

    // fetch(chapterUrl)
    // .then(response => response.text())
    // .then(text => {
    //   htmlString = text;
    //   console.log(htmlString);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }

  // if (chapterID) {
  //   //parse response.text for fiction url at <meta property="og:url"...
  //   //url = above + "/" + chapterID
  //   //fetch(url)
  // }
};

const App = () => {
  var response = getPage("21220", "301778");
  // console.log("app response: " + response);
  return <Text>asdf</Text>;
};

export default App;
