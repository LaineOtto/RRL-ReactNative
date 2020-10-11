import React, { useState } from 'react';
import { View, Text, TextInput, Button, } from 'react-native';

import { getFictionUrl, getFictionPageText, } from './network.js';
import { parseForChapterLinks, } from './parse.js';

const getPage = async (fictionId, chapterId) => {
  var url = "https://www.royalroad.com/fiction/" + fictionId;
  console.log("url: " + url);

  if (!(chapterId)) {
    var htmlString =
      await getFictionPageText(url)
      .then(response => {return response;});
    return htmlString;
  } else {
    var fictionUrl =
      await getFictionUrl(url)
      .then(response => {return response;});

    chapterIdUrl = fictionUrl + "/" + chapterId + "/index.html";
    console.log("chapterIdUrl: " + chapterIdUrl);
  }
};

const fictionPageButton = async (fictionId) => {
  var fictionPage =
    await getPage(fictionId)
    .then(response => {return response;});
  var chapterLinks = parseForChapterLinks(fictionPage);
  console.log(chapterLinks);
}

const App = () => {
  const [fictionId, setFictionId] = useState('');
  return (
    <View style={{padding: 10}}>
      <TextInput // TODO: Check this raw input
        style={{height: 40}}
        placeholder="Fiction Id"
        onChangeText={text => setFictionId(text)}
        defaultValue={fictionId}
      />
      <Button
        title="Get Page"
        onPress={() => fictionPageButton(fictionId)}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {fictionId}
      </Text>
    </View>
  );
};

export default App;
