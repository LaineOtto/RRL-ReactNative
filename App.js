import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { homeScreen, chapterList, readChapter } from './components.js';

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
