// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../Splash';
import Home from '../Pages/Home';
import Calculator from '../Pages/Calculator';
import CalculateHeirs from '../Pages/CalculateHeirs';
import Calculation from '../Pages/Calculation';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F5F5F5' },
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="InheritanceCalculator" component={Calculator} />
        <Stack.Screen name="InheritanceCalculatorHeirs" component={CalculateHeirs} />
        <Stack.Screen name="InheritanceCalculation" component={Calculation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;