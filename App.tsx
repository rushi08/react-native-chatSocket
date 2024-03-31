import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from './Screens/ChatScreen';
import Homescreen from './Screens/HomeScreen';
import GlobleState from './Context';
import Messagescreen from './Screens/Messagescreen';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <GlobleState>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={Homescreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="MessageScreen" component={Messagescreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobleState>
  );
};

export default App;
