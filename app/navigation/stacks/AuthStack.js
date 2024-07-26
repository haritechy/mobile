import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationRoutes} from '../../constants';
import {Colors} from '../../theme';
import {authScreens} from '../services/appRoutes';
import {stackScreenOptions} from '../services/settings';

const AuthStack = createNativeStackNavigator();
export const AuthStackScreens = ({mode, isWalkthroughVisited}) => (
  <>
    <StatusBar
      barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
      backgroundColor={Colors.white}
    />
    <AuthStack.Navigator screenOptions={stackScreenOptions}>
      {Object.entries({...authScreens}).map(([name, screen]) =>
        isWalkthroughVisited &&
        name === NavigationRoutes.WalkthroughContainer ? null : (
          <AuthStack.Screen
            name={name}
            key={name}
            component={screen.component}
            options={screen?.options ?? {}}
          />
        ),
      )}
    </AuthStack.Navigator>
  </>
);
