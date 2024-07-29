import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Icons} from '../../assets';
import {CustomButton, CustomNavBar, ScreenContainer} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import colors from '../../theme/Colors';
import {Colors, moderateScale} from '../../theme';

const {width: screenWidth} = Dimensions.get('window');

const PlanScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://preprodjavaapi.melbeez.com/warranty/all',
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleActions = useCallback(() => {
    navigation.navigate(NavigationRoutes.NotificationScreen);
  }, [navigation]);

  const handlePlanPurchase = product => {
    // Pass the selected product as params to the Payment screen
    navigation.navigate(NavigationRoutes.PaymentScreen, {product});
  };

  const renderProduct = product => (
    <View style={styles.productContainer} key={product.id}>
      <ScrollView contentContainerStyle={styles.productContent}>
        <Text style={styles.productName}>{product.planName}</Text>
        <Text style={styles.productSubname}>{product.name}</Text>
        <Image
          source={{uri: product.pictureLink}}
          style={styles.productImage}
        />
        <Text style={styles.productDescription}>{product.planDescription}</Text>
        <Text style={styles.productRate}>$from {product.monthlyPrice}/mo</Text>
        <CustomButton
          title={`Get ${product.planName} Plan`}
          onPress={() => handlePlanPurchase(product)}
          style={styles.buyButton}
          textStyle={styles.buyButtonText}
        />
        <View style={styles.specificationsContainer}>
          <View style={styles.specificationRow}>
            <Icon
              name="check"
              size={16}
              color="green"
              style={styles.specIcon}
            />
            <Text style={styles.productSpec}>{product.planDescription}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            isRightActionVisible={true}
            isBackVisible={true}
            isRightButton={true}
            containerStyle={styles.navContainer}
            listRightIcons={[Icons.notifications]}
            onAction={handleActions}
            isNotificationCount={true}
            onBackPress={() => navigation.goBack()}
          />
          <View style={styles.mainContainer}>
            <Swiper
              showsPagination
              paginationStyle={styles.paginationStyle}
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.activeDotStyle}>
              {products.map(product => renderProduct(product))}
            </Swiper>
          </View>
        </>
      )}
    />
  );
};
const styles = StyleSheet.create({
  navContainer: {
    // Add custom styles for the navigation bar if needed
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  productContainer: {
    // width: screenWidth,
    // padding: 16,
    // backgroundColor: '#ffffe0', // Light yellow color
  },
  productImage: {
    alignItems: 'center',
    width: screenWidth * 0.8,
    height: screenWidth * 0.5,
    borderRadius: 10,
    marginBottom: 16,
    marginLeft: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: Colors.blackHeaderText,
  },
  productSubname: {
    fontSize: 20,
    color: Colors.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  productRate: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.blackHeaderText,
    marginBottom: 8,
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: colors.backgroundBlue, // Blue background color for the button
  },
  buyButtonText: {
    color: Colors.white, // White text color for the button
  },
  specificationsContainer: {
    alignItems: 'flex-start', // Align to the right side
    marginTop: 16, // Add gap before specifications
  },
  specificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  specIcon: {
    marginLeft: 20,
  },
  productSpec: {
    fontSize: 14,
    bottom: 5,
    color: Colors.black,
    textAlign: 'right',
    padding: 10,
  },
  paginationStyle: {
    bottom: 10,
  },
  dotStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  activeDotStyle: {
    backgroundColor: 'black',
  },
});

export default PlanScreen;
