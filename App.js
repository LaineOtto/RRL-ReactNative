import React, { useState, Suspense, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import HTML from "react-native-render-html";

import { getFictionPage, getPageText, } from './network.js';
import { parseForChapterLinks, } from './parse.js';

const fictionPageButton = async (fictionId, { navigation }) => {
  var fictionPage =
    await getFictionPage(fictionId)
    .then(response => {return response;});
  var chapterLinks = parseForChapterLinks(fictionPage);
  console.log(chapterLinks);
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

const readChapter = ({ route, navigation }) => {
  const [chapterUrl, setChapterUrl] = useState(route.params);
  const [htmlString, setHtmlString] = useState('');
  console.log("chapterUrl: " + chapterUrl);
  // var htmlString = getPageAsync(chapterUrl)

  useEffect(() => {
    const getPageAsync = async () => {
      var htmlString =
        await getPageText(chapterUrl)
        .then(response => {return response;});
      console.log("async: " + htmlString);

      setHtmlString(htmlString);
    };

    getPageAsync(chapterUrl);
  }, []);

  console.log("sync: " + htmlString);
  const contentWidth = useWindowDimensions().width;
  return (
    <ScrollView style={{ flex: 1 }}>
      <HTML html={htmlString} contentWidth={contentWidth} />
    </ScrollView>
  );
  // return (
  //   <ScrollView>
  //     <Text>
  //       asdf
  //     </Text>
  //   </ScrollView>
  // );
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
