/**
 *  components.js - React rendering components
 *
 */
 import React, { useState } from 'react';
 import {
   View,
   Text,
   TextInput,
   Button,
   ScrollView,
   useWindowDimensions } from 'react-native';
 import { WebView } from 'react-native-webview';
 import HTML from "react-native-render-html";
 import { useFocusEffect } from '@react-navigation/native';

 import { getPageHtml, } from './network.js';
 import {
   parseChapterLinks,
   parseChapterContent,
   parseSearchResults } from './parse.js';

 export const homeScreen = ({ navigation }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [fictionId, setFictionId] = useState('');
   const [searchTerm, setSearchTerm] = useState('');

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
       <TextInput // TODO: Check this raw input
         style={{height: 40}}
         placeholder="Search Term"
         onChangeText={text => setSearchTerm(text)}
         defaultValue={searchTerm}
       />
       <Button
         title={isLoading ? "Loading..." : "Search"}
         disabled={isLoading ? true : false}
         onPress={() => {
           setIsLoading(true);
           navigation.navigate('Search Results', searchTerm);
         }}
       />
     </View>
   );
 };

 export const searchResults = ({ route, navigation }) => {
   const url =
      "https://www.royalroad.com/fictions/search?title=" +
      route.params;
   const [htmlString, setHtmlString] = useState('');
   const [isLoading, setIsLoading] = useState(true);

   if (!htmlString) {
     const getHtmlAsync = async () => {
      var pageHtml =
        await getPageHtml(url)
        .then(response => {return response;});
      setHtmlString(pageHtml);
      setIsLoading(false);
     }
     getHtmlAsync();
   }

    parseSearchResults(htmlString);
   // const chapterData = parseSearchResults(htmlString);
   // console.log("chapterData: " + chapterData);

   const contentWidth = useWindowDimensions().width;
   if (isLoading) {
     return (<Text>Loading...</Text>);
   } else {
     return (
        <ScrollView style={{ flex: 1 }}>
          <HTML html={htmlString} contentWidth={contentWidth} />
        </ScrollView>
     );
   }
 };

 export const chapterList = ({ route, navigation }) => {
   const url = "https://www.royalroad.com/fiction/" + route.params;
   const [htmlString, setHtmlString] = useState('');
   const [isLoading, setIsLoading] = useState(true);

   if (!htmlString) {
     const getHtmlAsync = async () => {
      var htmlString =
        await getPageHtml(url)
        .then(response => {return response;});
      setHtmlString(htmlString);
      setIsLoading(false);
     }
     getHtmlAsync();
   }

   const chapterLinks = parseChapterLinks(htmlString);
   return (
     <>
      { isLoading
         ? <Text>Loading...</Text>
         : <ScrollView>
             {chapterLinks.map((link) => (
               <Button
                 title={link}
                 key={link.toString()}
                 onPress={() => {
                   navigation.navigate('Read Chapter', link);
                 }}
               />
             ))}
           </ScrollView>
       }
     </>
   );
 };

 export const readChapter = ({ route, navigation }) => {
   const chapterUrl  = route.params;
   const [htmlString, setHtmlString] = useState('');
   const [isLoading, setIsLoading] = useState(true);

   const getChapterAsync = async () => {
     var htmlString =
       await getPageHtml(chapterUrl)
       .then(response => {return response;});
     setHtmlString(htmlString);
     setIsLoading(false);
   };
   getChapterAsync(chapterUrl);

   const chapterContent = parseChapterContent(htmlString);
   const contentWidth = useWindowDimensions().width;
   return (
     <>
      { isLoading
          ? <Text>Loading...</Text>
          : <ScrollView style={{ flex: 1 }}>
              <HTML html={chapterContent} contentWidth={contentWidth} />
            </ScrollView>
      }
     </>
   );
 };
