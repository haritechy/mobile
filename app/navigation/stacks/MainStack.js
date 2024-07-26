import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {dashboardScreens} from '../services/appRoutes';
import {stackScreenOptions} from '../services/settings';

const MainStack = createNativeStackNavigator();

export const MainAppScreens = ({mode}) => {
  return (
    <>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <MainStack.Navigator screenOptions={stackScreenOptions}>
        {/* Global accessible screens */}
        {Object.entries({...dashboardScreens}).map(([name, screen]) => (
          <MainStack.Screen
            name={name}
            key={name}
            component={screen.component}
            options={screen?.options ?? {}}
          />
        ))}
      </MainStack.Navigator>
    </>
  );
};
