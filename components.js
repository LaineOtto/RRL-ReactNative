/**
 *  components.js - React rendering components
 *
 */
 import React, { useState, useEffect } from 'react';
 import { View, Text, TextInput, Button, ScrollView, useWindowDimensions } from 'react-native';
 import { WebView } from 'react-native-webview';
 import HTML from "react-native-render-html";
 import { useFocusEffect } from '@react-navigation/native';

 import { getFictionPage, getPageHtml, } from './network.js';
 import { parseForChapterLinks, parseChapterContent } from './parse.js';

 export const homeScreen = ({ navigation }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [fictionId, setFictionId] = useState('');

   useFocusEffect(
     React.useCallback(() => {
       setIsLoading(false);
     }, [])
   );

   return (
     <View style={{padding: 10}}>
       <TextInput // TODO: Check this raw input
         style={{height: 40}}
         placeholder="Fiction Id"
         onChangeText={text => setFictionId(text)}
         defaultValue={fictionId}
       />
       <Button
         title={isLoading ? "Loading..." : "Get Page"}
         disabled={isLoading ? true : false}
         onPress={async () => {
           setIsLoading(true);
           navigation.navigate('Chapter List', fictionId);
         }}
       />
         onPress={() => {
           setIsLoading(true);
           fictionPageButton(fictionId, {navigation})
         }}
       />
     </View>
   );
 };

 export const chapterList = ({ route, navigation }) => {
   const fictionId = route.params
   const [fictionPage, setFictionPage] = useState('');

   const getFictionAsync = async () => {
     var fictionPage =
      await getFictionPage(fictionId)
      .then(response => {return response;});
     setFictionPage(fictionPage);
   }
   if (!fictionPage) {
     getFictionAsync();
   }

   var chapterLinks = parseForChapterLinks(fictionPage);
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
 };

 export const readChapter = ({ route, navigation }) => {
   const [chapterUrl, setChapterUrl] = useState(route.params);
   const [htmlString, setHtmlString] = useState('');

   useEffect(() => {
     const getChapterAsync = async () => {
       var htmlString =
         await getPageHtml(chapterUrl)
         .then(response => {return response;});
       setHtmlString(htmlString);
     };

     getChapterAsync(chapterUrl);
   }, []);

   const chapterContent = parseChapterContent(htmlString);
   const contentWidth = useWindowDimensions().width;
   return (
     <ScrollView style={{ flex: 1 }}>
       <HTML html={chapterContent} contentWidth={contentWidth} />
     </ScrollView>
   );
 };
