/**
 *  components.js - where react native components live
 */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, } from 'react-native';

import { getFictionPage, } from './network.js';
import { parseForChapterLinks, } from './parse.js';

const fictionPageButton = async (fictionId) => {
  var fictionPage =
    await getFictionPage(fictionId)
    .then(response => {return response;});
  var chapterLinks = parseForChapterLinks(fictionPage);
  console.log(chapterLinks);
}

export const homeScreen = () => {
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
}
