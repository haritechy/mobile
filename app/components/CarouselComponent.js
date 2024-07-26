import React, {forwardRef, useState} from 'react';
import {Image, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Metrics} from '../theme';
import styles from './styles/CarouselComponentStyles';

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

const renderCarousalItem = ({item}) => {
  return (
    <View style={styles.snapContainer}>
      <Image source={{uri: item?.imageUrl}} style={styles.snapImage} />
    </View>
  );
};
const CarouselComponent = forwardRef(({listSnaps}, ref) => {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <View style={styles.carousalContainer}>
      <Carousel
        ref={ref}
        data={listSnaps}
        renderItem={renderCarousalItem}
        sliderWidth={Metrics.screenWidth - 60}
        itemWidth={Metrics.screenWidth - 60}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <PaginationComponent {...{listSnaps, activeSlide}} />
    </View>
  );
});

export default CarouselComponent;
