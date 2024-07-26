import React, {createRef, useCallback, useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {listWalkThrough} from '../../constants/Mockdata';
import {Metrics} from '../../theme';
import WalkthroughScreen from './WalkthroughScreen';
import {CustomNavBar} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import {reset} from '../../navigation/services/navigationServices';
import styles from './styles/WalkthroughStyles';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wtRef = createRef();
const CarouselComponent = ({listSnaps, setActiveSlide}) => {
  const renderCarausalItem = ({item}) => {
    return <WalkthroughScreen {...{item}} />;
  };
  return (
    <>
      <Carousel
        ref={wtRef}
        data={listSnaps}
        renderItem={renderCarausalItem}
        sliderWidth={Metrics.screenWidth}
        itemWidth={Metrics.screenWidth}
        onSnapToItem={index => {
          setActiveSlide(index);
        }}
      />
    </>
  );
};

const PaginationComponent = ({listSnaps, activeSlide}) => (
  <Pagination
    dotsLength={listSnaps.length}
    activeDotIndex={activeSlide}
    containerStyle={styles.paginationContainer}
    dotContainerStyle={styles.dotContainerStyle}
    dotStyle={styles.dotStyle}
    inactiveDotStyle={styles.inactiveDotStyle}
    inactiveDotOpacity={0.4}
    inactiveDotScale={0.9}
  />
);

export const WalkthroughContainer = () => {
  const dispatch = useDispatch();
  const [activeSlide, setActiveSlide] = useState(0);
  const handleSignIn = useCallback(async () => {
    reset(NavigationRoutes.LoginScreen);
    dispatch({type: 'DISABLE_WALKTHROUGH'});
    await AsyncStorage.setItem(
      AppConstants.IS_WALKTHROUGH,
      JSON.stringify(true),
    );
  }, [dispatch]);
  const handelContinue = useCallback(async () => {
    if (activeSlide === 2) {
      reset(NavigationRoutes.LoginScreen);
      dispatch({type: 'DISABLE_WALKTHROUGH'});
      await AsyncStorage.setItem(
        AppConstants.IS_WALKTHROUGH,
        JSON.stringify(true),
      );
    } else {
      wtRef?.current.snapToNext();
    }
  }, [activeSlide, dispatch]);
  return (
    <View style={styles.contentContainer}>
      <CustomNavBar
        isRightButton={true}
        isBackVisible={false}
        rightButtonText={Strings.skip}
        containerStyle={styles.headerContainer}
        onAction={handleSignIn}
      />
      <View style={styles.mainContianer}>
        <View style={styles.topView}>
          <CarouselComponent
            listSnaps={listWalkThrough}
            {...{activeSlide, setActiveSlide}}
          />
          <PaginationComponent listSnaps={listWalkThrough} {...{activeSlide}} />
        </View>
        <View style={styles.bottomView}>
          <Pressable style={styles.buttonView} onPress={handelContinue}>
            <Text style={styles.buttonText}>{Strings.continue}</Text>
          </Pressable>
          <Text style={styles.lableText}>
            {Strings.alreadyHaveAccount}
            <Text
              suppressHighlighting={true}
              style={styles.signInText}
              onPress={handleSignIn}>{` ${Strings.signIn}`}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
export default WalkthroughContainer;
