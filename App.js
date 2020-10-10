import React from 'react';
import { View, Text, } from 'react-native';

const getPage = (fictionID, chapterID) => {
  var url = "https://www.royalroad.com/fiction/" + fictionID;
  console.log("URL: " + url);

  return fetch(url)
  .then(response => response.text())
  .then(text => console.log("Text: " + text))
  .catch((error) => {
    console.error(error);
  });
};

const App = () => {
  var response = getPage(21220);
  // console.log("app response: " + response);
  return <Text>asdf</Text>;
};

export default App;
