/**
*  components.js - React rendering components
*
*/
import React, { useState, useEffect } from 'react';
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

/**
* homeScreen - The first screen of the app
* params: none
*/
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

/**
 *  chapterList - list of all chapters from a fiction
 *  params:
 *    url: url of the fiction page
 */
export const chapterList = ({ route, navigation }) => {
  const url = route.params;
  const [htmlString, setHtmlString] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getHtmlAsync = async () => {
      var htmlString =
      await getPageHtml(url)
      .then(response => {return response;});
      setHtmlString(htmlString);
      setIsLoading(false);
    }
    getHtmlAsync();
  }, []);

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
  var chapterContent = '';

  useEffect(() => {
    const getChapterAsync = async () => {
      var htmlString =
      await getPageHtml(chapterUrl)
      .then(response => {return response;});
      setHtmlString(htmlString);
      setIsLoading(false);
    };
    getChapterAsync(chapterUrl);
  }, []);

  chapterContent = parseChapterContent(htmlString);
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

const ChapterButton = (props) => {
  const navigation = props.navigation;
  const result = props.result;
  console.log("index: " + result.id);
  console.log("fictionTitle: " + result.fictionTitle);
  return (
    <Button
      title={result.fictionTitle}
      onPress={() => {
        navigation.navigate('Chapter List', result.fictionUrl)
      }}
    />
  );
}

export const searchResults = ({ route, navigation }) => {
  const url =
  "https://www.royalroad.com/fictions/search?title=" +
  route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([{
    id: "0",
    fictionTitle: "Dummy Title",
    fictionUrl: "Dummy Url"
  }]);

  useEffect(() => {
    getSearchResults();
  }, []);

  const fetchData = async () => {
    console.log("FetchData");
    try {
      const pageHtml =
      await getPageHtml(url)
      .then(response => {return response;});
      const htmlString = await pageHtml;
      return htmlString;
    } catch(e){
      console.error(e);
    }
  }

  const getSearchResults = async () => {
    let htmlString = await fetchData();
    console.log("htmlString: " + htmlString);
    let newSearchResults = await parseSearchResults(htmlString);
    setResults(newSearchResults);
    console.log("getSearchResults: " + newSearchResults[0].fictionTitle);
    setIsLoading(false);
  }

  const ButtonList = (props) => {
    var results = props.results;
    const navigation = props.navigation;

    console.log("results[0] JSON: " + JSON.stringify(results[0]));
    let fictionButtons = [];
    for (var i = 0; i < results.length; i++) {
      let result = results[i];
      console.log("for: " + JSON.stringify(result));
      const newChapterButton = <ChapterButton result={result} navigation={navigation} />;
      // console.log("button: " + newChapterButton);
      fictionButtons.push(newChapterButton);
    }

    console.log("fictionButtons: " + fictionButtons[0]);
    return fictionButtons;
  }

  const contentWidth = useWindowDimensions().width;
  if (isLoading) {
    return (<Text>Loading...</Text>);
  } else {
    return (
      <ScrollView style={{ flex: 1 }}>
        <ButtonList results={results} navigation={navigation}/>
      </ScrollView>
    );
  }
};
