import React, { useState, Suspense } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';


import { getFictionPage, getPageText, } from './network.js';
import { parseForChapterLinks, } from './parse.js';

const fictionPageButton = async (fictionId, { navigation }) => {
  var fictionPage =
    await getFictionPage(fictionId)
    .then(response => {return response;});
  var chapterLinks = parseForChapterLinks(fictionPage);
  navigation.navigate('Chapter List', chapterLinks);
}

const homeScreen = ({ navigation }) => {
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
        onPress={() => fictionPageButton(fictionId, {navigation})}
      />
    </View>
  );
}

const chapterList = ({ route, navigation }) => {
  var chapterLinks = route.params;
  return (
    <ScrollView>
      {chapterLinks.map((link) => (
        <Button
          title={link}
          onPress={() => {
            navigation.navigate('Read Chapter', link);
          }}
        />
      ))}
    </ScrollView>
  );
}

const getPageAsync = async (chapterUrl) => {
  var htmlString =
    await getPageText(chapterUrl)
    .then(response => {return response;});
  console.log(htmlString);
  return htmlString;
}

const readChapter = ({ route, navigation }) => {
  var chapterUrl = route.params;
  console.log(chapterUrl);
  // var htmlString = getPageAsync(chapterUrl);
  // console.log(htmlString);
  return (
    <WebView
      source={{ uri: chapterUrl }}
    />
  );
}

const Stack = createStackNavigator();

const App = () => {
  const [fictionId, setFictionId] = useState('');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="Chapter List" component={chapterList} />
        <Stack.Screen name="Read Chapter" component={readChapter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
