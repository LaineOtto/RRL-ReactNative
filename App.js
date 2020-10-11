import React, { useState } from 'react';
import { View, Text, TextInput, Button, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { homeScreen, } from './components.js';

const Stack = createStackNavigator();

const App = () => {
  const [fictionId, setFictionId] = useState('');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={homeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
