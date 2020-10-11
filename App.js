import React, { useState } from 'react';
import { View, Text, TextInput, } from 'react-native';
import { getFictionUrl, } from './network.js';

const getPage = async (fictionId, chapterId) => {
  var url = "https://www.royalroad.com/fiction/" + fictionId;

  if (!(chapterId)) {
    var htmlString =
      await fetch(url)
      .then(response => response.text())
      .then(text => {
        return text;
      })
      .catch((error) => {
        console.error(error);
    });
    console.log(htmlString);
    return htmlString;
  } else {
    var fictionUrl =
      await getFictionUrl(url)
      .then(response => {
        return response;
    });

    chapterIdUrl = fictionUrl + "/" + chapterId + "/index.html";
    console.log("chapterIdUrl: " + chapterIdUrl);
  }
};

const App = () => {
  const [fictionId, setFictionId] = useState("");
  const [chapterId, setChapterId] = useState("");

  var response = getPage("21220", "301778");
  return <Text>asdf</Text>;
};

export default App;
