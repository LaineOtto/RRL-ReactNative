import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import { homeScreen, chapterList, } from './components.js';
import { getFictionPage, } from './network.js';
import { parseForChapterLinks, } from './parse.js';

const fictionPageButton = async (fictionId, { navigation }) => {
  var fictionPage =
    await getFictionPage(fictionId)
    .then(response => {return response;});
  var chapterLinks = parseForChapterLinks(fictionPage);
  navigation.navigate('Chapter List', chapterLinks);
}

export const homeScreen = ({ navigation }) => {
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

export const chapterList = ({ route, navigation }) => {
  var chapterLinks = route.params;
  console.log(chapterLinks);
  return (
    <ScrollView>
      {chapterLinks.map((link) => (
        <Text>{link}</Text>
      ))}
    </ScrollView>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
