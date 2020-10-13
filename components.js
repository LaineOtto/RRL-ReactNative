/**
 *  components.js - React rendering components
 *
 */
 import React, { useState, useEffect } from 'react';
 import { View, Text, TextInput, Button, ScrollView, useWindowDimensions } from 'react-native';
 import { WebView } from 'react-native-webview';
 import HTML from "react-native-render-html";

 import { getFictionPage, getPageText, } from './network.js';
 import { parseForChapterLinks, parseChapterContent } from './parse.js';

 const fictionPageButton = async (fictionId, { navigation }) => {
   var fictionPage =
     await getFictionPage(fictionId)
     .then(response => {return response;});
   var chapterLinks = parseForChapterLinks(fictionPage);
   console.log(chapterLinks);
   navigation.navigate('Chapter List', chapterLinks);
 };

 export const homeScreen = ({ navigation }) => {
   const [isLoading, setIsLoading] = useState(false);
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
         title={isLoading ? "Loading..." : "Get Page"}
         onPress={() => {
           setIsLoading(true);
           fictionPageButton(fictionId, {navigation})
         }}
       />
     </View>
   );
 };

 export const chapterList = ({ route, navigation }) => {
   const chapterLinks = route.params;
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
   console.log("chapterUrl: " + chapterUrl);

   useEffect(() => {
     const getPageAsync = async () => {
       var htmlString =
         await getPageText(chapterUrl)
         .then(response => {return response;});
       // console.log("async: " + htmlString);

       setHtmlString(htmlString);
     };

     getPageAsync(chapterUrl);
   }, []);

   // console.log("sync: " + htmlString);
   const chapterContent = parseChapterContent(htmlString);
   console.log("chapterContent: " + chapterContent);

   const contentWidth = useWindowDimensions().width;
   return (
     <ScrollView style={{ flex: 1 }}>
       <HTML html={chapterContent} contentWidth={contentWidth} />
     </ScrollView>
   );
 };
