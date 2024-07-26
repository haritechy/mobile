/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {NavigationRoutes, Strings} from '../../constants';
import {Fonts, Colors, moderateScale, ThemeStyles} from '../../theme';
import {
  homeScreens,
  moreScreens,
  locationScreens,
  productScreens,
} from '../services/appRoutes';
import styles from '../styles/AppNavigationStyles';
import {Icons} from '../../assets';
import {useTheme} from '@react-navigation/native';
const HomeStack = createNativeStackNavigator();
const LocationStack = createNativeStackNavigator();
const ProductStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
export const hideTabBarComponents = [NavigationRoutes.SettingScreen];
const stackScreenOptions = {
  headerStyle: {
    height: 600,
    backgroundColor: Colors.white,
    top: 0,
    left: 0,
    right: 0,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleAlign: 'center',
  headerTransparent: false,
  headerShadowVisible: false,
  headerProfileRight: props => (
    <Icon
      name={''}
      size={30}
      color={Colors.black}
      style={styles.horizontalMargin}
    />
  ),
  headerShown: true,
  headerTitleStyle: {
    fontSize: moderateScale(18),
    color: Colors.black,
    fontFamily: Fonts.type.PoppinsSemiBold,
  },
};

const HomeStackScreens = () => (
  <HomeStack.Navigator screenOptions={stackScreenOptions}>
    {/* Global accessible screens */}
    {Object.entries({
      ...homeScreens,
      ...locationScreens,
      ...productScreens,
      ...moreScreens,
    }).map(([name, screen]) => (
      <HomeStack.Screen
        name={name}
        key={name}
        component={screen.component}
        options={{
          ...screen?.options,
        }}
      />
    ))}
  </HomeStack.Navigator>
);
const LocationStackScreens = () => (
  <LocationStack.Navigator screenOptions={stackScreenOptions}>
    {/* Global accessible screens */}
    {Object.entries({...locationScreens, ...productScreens}).map(
      ([name, screen]) => (
        <LocationStack.Screen
          name={name}
          key={name}
          component={screen.component}
          options={{
            ...screen?.options,
          }}
        />
      ),
    )}
  </LocationStack.Navigator>
);
const ProductStackScreens = () => (
  <ProductStack.Navigator screenOptions={stackScreenOptions}>
    {/* Global accessible screens */}
    {Object.entries({...productScreens}).map(([name, screen]) => (
      <ProductStack.Screen
        name={name}
        key={name}
        component={screen.component}
        options={{
          ...screen?.options,
        }}
      />
    ))}
  </ProductStack.Navigator>
);

const MoreStackScreens = () => (
  <MoreStack.Navigator screenOptions={stackScreenOptions}>
    {/* Global accessible screens */}
    {Object.entries({...moreScreens, ...productScreens}).map(
      ([name, screen]) => (
        <MoreStack.Screen
          name={name}
          key={name}
          component={screen.component}
          options={{
            ...screen?.options,
          }}
        />
      ),
    )}
  </MoreStack.Navigator>
);

const TabIcon = ({size, focused, icon}) => (
  <Image
    style={{
      width: moderateScale(22),
      height: moderateScale(22),
      tintColor: focused ? Colors.appThemeColor : Colors.inputBorder,
      resizeMode: 'contain',
    }}
    source={icon}
  />
);
const HomeTabs = props => {
  const colors = useTheme();
  const themedStyles = useMemo(() => ThemeStyles(colors), [colors]);
  const tabBarStyle = StyleSheet.compose(
    styles.tabBarStyle,
    themedStyles.tabBackGround,
  );
  const tabLabelStyle = StyleSheet.compose(
    styles.tabBarLabelStyle,
    themedStyles.labelText,
  );
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: Colors.black,
          tabBarInactiveTintColor: Colors.inputBorder,
          tabBarLabelStyle: tabLabelStyle,
          tabBarShowLabel: true,
          headerShown: false,
          headerTitle: `${JSON.stringify(route.name)} name`,
          tabBarStyle: tabBarStyle,
        })}>
        <Tab.Screen
          name={NavigationRoutes.HomeTab}
          component={HomeStackScreens}
          options={{
            tabBarLabel: Strings.home,
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
              <TabIcon {...{size, focused}} icon={Icons.home} />
            ),
          }}
        />
        <Tab.Screen
          name={NavigationRoutes.LocationTab}
          component={LocationStackScreens}
          options={{
            tabBarLabel: Strings.locations,
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
              <TabIcon {...{size, focused}} icon={Icons.location} />
            ),
          }}
        />
        <Tab.Screen
          name={NavigationRoutes.ProductTab}
          component={ProductStackScreens}
          options={{
            tabBarLabel: Strings.products,
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
              <TabIcon {...{size, focused}} icon={Icons.product} />
            ),
          }}
        />
        <Tab.Screen
          name={NavigationRoutes.MoreTab}
          component={MoreStackScreens}
          options={{
            tabBarLabel: Strings.more,
            headerShown: false,
            tabBarIcon: ({size, focused}) => (
              <TabIcon {...{size, focused}} icon={Icons.more} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default HomeTabs;
