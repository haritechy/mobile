import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

import {Icons} from '../../assets';
import {CustomButton, CustomNavBar, ScreenContainer} from '../../components';
import {AppConstants, NavigationRoutes, Strings} from '../../constants';
import colors from '../../theme/Colors';
import {Colors, moderateScale} from '../../theme';

const {width: screenWidth} = Dimensions.get('window');

const PlanScreen = ({navigation}) => {
  const products = [
    {
      id: '1',
      name: 'Product 1',
      subname: 'avbs',
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      description: 'This is a brief description of the product.',
      specifications: [
        'Specification 1: Detail',
        'Specification 2: Detail',
        'Specification 3: Detail',
        'Specification 4: Detail',
        'Specification 5: Detail',
        'Specification A: Detail',
        'Specification B: Detail',
        'Specification C: Detail',
        'Specification D: Detail',
        'Specification E: Detail',
      ],
      monthlyRate: 'from $9.99/mo',
    },
    {
      id: '2',
      name: 'Product 2',
      subname: 'avbs',
      images: [
        'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      description: 'Another brief description of the product.',
      specifications: [
        'Specification A: Detail',
        'Specification B: Detail',
        'Specification C: Detail',
        'Specification D: Detail',
        'Specification E: Detail',
        'Specification A: Detail',
        'Specification B: Detail',
        'Specification C: Detail',
        'Specification D: Detail',
        'Specification E: Detail',
      ],
      monthlyRate: 'from $19.99/mo',
    },
    {
      id: '3',
      name: 'Product 3',
      subname: 'avbs',
      images: [
        'https://images.unsplash.com/photo-1605203479566-c3e4644a91ae?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1605203479566-c3e4644a91ae?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      description: 'Detailed description of Product 3.',
      specifications: [
        'Specification 1: Detail',
        'Specification 2: Detail',
        'Specification 3: Detail',
        'Specification 4: Detail',
        'Specification 5: Detail',
        'Specification 6: Detail',
        'Specification 7: Detail',
        'Specification 8: Detail',
        'Specification 9: Detail',
        'Specification 10: Detail',
      ],
      monthlyRate: 'from $29.99/mo',
    },
    {
      id: '4',
      name: 'Product 4',
      subname: 'avbs',
      images: [
        'https://images.unsplash.com/photo-1626742906085-bb623bcd6b7a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1626742906085-bb623bcd6b7a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      description: 'Comprehensive details of Product 4.',
      specifications: [
        'Specification X: Detail',
        'Specification Y: Detail',
        'Specification Z: Detail',
        'Specification 1: Detail',
        'Specification 2: Detail',
        'Specification 3: Detail',
        'Specification 4: Detail',
        'Specification 5: Detail',
        'Specification 6: Detail',
        'Specification 7: Detail',
      ],
      monthlyRate: 'from $39.99/mo',
    },
    {
      id: '5',
      name: 'Product 5',
      subname: 'avbs',
      images: [
        'https://images.unsplash.com/photo-1606799539314-7730de038ab4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1606799539314-7730de038ab4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      description: 'Highlights of Product 5.',
      specifications: [
        'Specification A: Detail',
        'Specification B: Detail',
        'Specification C: Detail',
        'Specification D: Detail',
        'Specification E: Detail',
        'Specification F: Detail',
        'Specification G: Detail',
        'Specification H: Detail',
        'Specification I: Detail',
        'Specification J: Detail',
      ],
      monthlyRate: 'from $49.99/mo',
    },
    {
      id: '6',
      name: 'Product 6',
      subname: 'avbs',
      images: [
        'https://images.unsplash.com/photo-1512627506727-56d275d032ed?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1512627506727-56d275d032ed?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      description: 'Insights into Product 6.',
      specifications: [
        'Specification 1: Detail',
        'Specification 2: Detail',
        'Specification 3: Detail',
        'Specification 4: Detail',
        'Specification 5: Detail',
        'Specification 6: Detail',
        'Specification 7: Detail',
        'Specification 8: Detail',
        'Specification 9: Detail',
        'Specification 10: Detail',
      ],
      monthlyRate: 'from $59.99/mo',
    },
    {
      id: '7',
      name: 'Product 7',
      subname: 'avbs',
      images: [
        'https://images.unsplash.com/photo-1556740749-8b09d7e9d48d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1556740749-8b09d7e9d48d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      description: 'Features of Product 7.',
      specifications: [
        'Specification X: Detail',
        'Specification Y: Detail',
        'Specification Z: Detail',
        'Specification 1: Detail',
        'Specification 2: Detail',
        'Specification 3: Detail',
        'Specification 4: Detail',
        'Specification 5: Detail',
        'Specification 6: Detail',
        'Specification 7: Detail',
      ],
      monthlyRate: 'from $69.99/mo',
    },
    {
      id: '8',
      name: 'Product 8',
      subname: 'avbs',
      images: [
        'https://images.unsplash.com/photo-1532079403210-d4d2f1b88240?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1532079403210-d4d2f1b88240?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      description: 'Overview of Product 8.',
      specifications: [
        'Specification A: Detail',
        'Specification B: Detail',
        'Specification C: Detail',
        'Specification D: Detail',
        'Specification E: Detail',
        'Specification F: Detail',
        'Specification G: Detail',
        'Specification H: Detail',
        'Specification I: Detail',
        'Specification J: Detail',
      ],
      monthlyRate: 'from $79.99/mo',
    },
    {
      id: '9',
      name: 'Product 9',
      subname: 'avbs',
      images: [
        'https://images.unsplash.com/photo-1574158622680-6f0cb6b4b4b5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1574158622680-6f0cb6b4b4b5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      description: 'Details about Product 9.',
      specifications: [
        'Specification 1: Detail',
        'Specification 2: Detail',
        'Specification 3: Detail',
        'Specification 4: Detail',
        'Specification 5: Detail',
        'Specification 6: Detail',
        'Specification 7: Detail',
        'Specification 8: Detail',
        'Specification 9: Detail',
        'Specification 10: Detail',
      ],
      monthlyRate: 'from $89.99/mo',
    },
    {
      id: '10',
      name: 'Product 10',
      subname: 'avbs',
      images: [
        'https://images.unsplash.com/photo-1554515504-8032f27c4e57?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1554515504-8032f27c4e57?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
      description: 'Product 10 details and features.',
      specifications: [
        'Specification 1: Detail',
        'Specification 2: Detail',
        'Specification 3: Detail',
        'Specification 4: Detail',
        'Specification 5: Detail',
        'Specification 6: Detail',
        'Specification 7: Detail',
        'Specification 8: Detail',
        'Specification 9: Detail',
        'Specification 10: Detail',
      ],
      monthlyRate: 'from $99.99/mo',
    },
  ];

  const handleActions = useCallback(() => {
    navigation.navigate(NavigationRoutes.NotificationScreen);
  }, [navigation]);

  const handlePlanPurchase = productName => {
    console.log(`Plan purchased for ${productName}`);
  };

  const renderProduct = ({item}) => (
    <View style={styles.productContainer}>
      <ScrollView contentContainerStyle={styles.productContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productSubname}>{item.subname}</Text>
        <Image source={{uri: item.images[0]}} style={styles.productImage} />

        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productRate}>{item.monthlyRate}</Text>
        <CustomButton
          title="Buy Plan"
          onPress={() => navigation.navigate('PaymentScreen')}
          style={styles.buyButton}
          textStyle={styles.buyButtonText} // Pass the text style 
        />
        <View style={styles.specificationsContainer}>
          {item.specifications.map((spec, index) => (
            <View key={index} style={styles.specificationRow}>
              <Icon
                name="check"
                size={16}
                color="green"
                style={styles.specIcon}
              />
              <Text style={styles.productSpec}>{spec}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <ScreenContainer
      renderContent={() => (
        <>
          <CustomNavBar
            // title={Strings.buyaAkkoWarranty}
            isRightActionVisible={true}
            isBackVisible={true}
            isRightButton={true}
            containerStyle={styles.navContainer}
            listRightIcons={[Icons.notifications]}
            onAction={handleActions}
            isNotificationCount={true}
            onBackPress={() => navigation.goBack()} // Handle back button press
          />
          <View style={styles.mainContainer}>
            <Swiper
              showsPagination
              paginationStyle={styles.paginationStyle}
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.activeDotStyle}>
              {products.map(product => (
                <View key={product.id} style={styles.productContainer}>
                  {renderProduct({item: product})}
                </View>
              ))}
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
