import React from 'react';
import {Colors} from '../../theme';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
// LOCAL IMPORTS
import {NavigationRoutes, Strings} from '../../constants';
import AddProductScreen from '../../modules/Product/AddProductScreen';
import {LoginScreen} from '../../modules/Auth/LoginScreen';
import RegistrationScreen from '../../modules/Auth/RegistrationScreen';
import MoreScreen from '../../modules/More/MoreScreen';
import LocationScreen from '../../modules/Location/LocationScreen';
import ProductScreen from '../../modules/Product/ProductScreen';
import ProductFilterScreen from '../../modules/Product/ProductFilterScreen';
import ProfileScreen from '../../modules/More/ProfileScreen';
import Authentication from '../../modules/More/Authentication';
import Theme from '../../modules/More/Theme';
import AlertNotification from '../../modules/More/AlertNotification';
import {WalkthroughContainer} from '../../modules/Walkthrough/WalkthroughContainer';
import HomeTabs from '../stacks/HomeTab';
import AddLocationScreen from '../../modules/Location/AddLocationScreen';
import NotificationScreen from '../../modules/NotificationScreen';
import HomeScreen from '../../modules/Home/HomeScreen';
import {goBack} from './navigationServices';
import ForgotUsername from '../../modules/Auth/ForgotUsername';
import ForgotPassword from '../../modules/Auth/ForgotPassword';
import {ResetPassword} from '../../modules/Auth/ResetPassword';
import ReceiptsListScreen from '../../modules/More/ReceiptsListScreen';
import WarrantyListScreen from '../../modules/More/WarrantyListScreen';
import WarrantyFilterScreen from '../../modules/More/WarrantyFilterScreen';
import EditProfile from '../../modules/More/EditProfile';
import ChangePassword from '../../modules/More/ChangePassword';
import AccountSettings from '../../modules/More/AccountSettings';
import ContactUsScreen from '../../modules/More/ContactUsScreen';
import WarrantyDetailScreen from '../../modules/More/WarrantyDetailScreen';
import LocationDetailScreen from '../../modules/Location/LocationDetailScreen';
import VerifyPhoneEmail from '../../modules/Auth/VerifyPhoneEmail';
import LocationFilterScreen from '../../modules/Location/LocationFilterScreen';
import MoveProductScreen from '../../modules/Product/MoveProductScreen';
import DeliveryLocationScreen from '../../modules/Location/DeliveryLocationScreen';
import ProductDeliveryFilterScreen from '../../modules/Location/ProductDeliveryFilterScreen';
import ScanQrCodeScreen from '../../modules/Product/ScanQrCodeScreen';
import ProductDetailScreen from '../../modules/Product/ProductDetailScreen';
import SelectReceiptScreen from '../../modules/Product/SelectReceiptScreen';
import AddReceiptScreen from '../../modules/Product/AddReceiptScreen';
import AddWarrantyScreen from '../../modules/Product/AddWarrantyScreen';
import EditWarrantyScreen from '../../modules/Product/EditWarrantyScreen';
import Privacy from '../../modules/More/Privacy';
import Terms from '../../modules/More/Terms';
import EditProductScreen from '../../modules/Product/EditProductScreen';
import ReceiptFilterScreen from '../../modules/More/ReceiptFilterScreen';
import ReceiptDetailScreen from '../../modules/More/ReceiptDetailScreen';
import AboutScreen from '../../modules/More/AboutScreen';
import HelpSupportScreen from '../../modules/More/HelpSupportScreen';
import FeedScreen from '../../modules/More/FeedScreen';
import FeedUploadScreen from '../../modules/More/FeedUpload';
import PlanScreen from '../../modules/AkkoLanding/AkkoLandingScreen';
import Payment from '../../modules/AkkoLanding/Payment';
import TermsPayment from '../../modules/AkkoLanding/Terms';
import { BuyPlan } from '../../modules/AkkoLanding/BuyPlan';


const backButton = () => {
  return (
    <Pressable
      onPress={() => {
        goBack();
      }}>
      <Icon name={'angle-left'} size={24} color={Colors.black} />
    </Pressable>
  );
};
export const dashboardScreens = {
  [NavigationRoutes.HomeTabs]: {
    component: HomeTabs,
  },
  [NavigationRoutes.PlanScreen]: {
    component: PlanScreen,
  },
  [NavigationRoutes.PaymentScreen]: {
    component: Payment,
  },
  [NavigationRoutes.TermsPayment]: {
    component: TermsPayment,
  },
  [NavigationRoutes.BuyPlan]: {
    component: BuyPlan,
  },
  
  

};
export const authScreens = {
  [NavigationRoutes.WalkthroughContainer]: {
    component: WalkthroughContainer,
  },
  [NavigationRoutes.LoginScreen]: {
    component: LoginScreen,
  },
  [NavigationRoutes.RegistrationScreen]: {
    component: RegistrationScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.VerifyPhoneEmail]: {
    component: VerifyPhoneEmail,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.ResetPassword]: {
    component: ResetPassword,
    options: {headerTitle: '', headerLeft: backButton},
  },

  [NavigationRoutes.ForgotUsername]: {
    component: ForgotUsername,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.ForgotPassword]: {
    component: ForgotPassword,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.PrivacyScreen]: {
    component: Privacy,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.TermsScreen]: {
    component: Terms,
    options: {
      headerShown: false,
    },
  },
};

export const homeScreens = {
  [NavigationRoutes.HomeScreen]: {
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.NotificationScreen]: {
    component: NotificationScreen,
    options: {
      headerShown: false,
    },
  },
};
export const locationScreens = {
  [NavigationRoutes.LocationScreen]: {
    component: LocationScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.AddLocationScreen]: {
    component: AddLocationScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.LocationDetailScreen]: {
    component: LocationDetailScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.LocationFilterScreen]: {
    component: LocationFilterScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.DeliveryLocationScreen]: {
    component: DeliveryLocationScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.ProductDeliveryFilterScreen]: {
    component: ProductDeliveryFilterScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.ProductDetailScreen]: {
    component: ProductDetailScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.EditProductScreen]: {
    component: EditProductScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.ProductFilterScreen]: {
    component: ProductFilterScreen,
    options: {headerShown: false},
  },
};

export const productScreens = {
  [NavigationRoutes.ProductScreen]: {
    component: ProductScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.ProductDetailScreen]: {
    component: ProductDetailScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.ProductFilterScreen]: {
    component: ProductFilterScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.AddProductScreen]: {
    component: AddProductScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.EditProductScreen]: {
    component: EditProductScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.MoveProductScreen]: {
    component: MoveProductScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.ScanQrCodeScreen]: {
    component: ScanQrCodeScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.SelectReceiptScreen]: {
    component: SelectReceiptScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.AddReceiptScreen]: {
    component: AddReceiptScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.AddWarrantyScreen]: {
    component: AddWarrantyScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.EditWarrantyScreen]: {
    component: EditWarrantyScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.WarrantyDetailScreen]: {
    component: WarrantyDetailScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.ReceiptDetailScreen]: {
    component: ReceiptDetailScreen,
    options: {
      headerShown: false,
    },
  },
};

export const moreScreens = {
  [NavigationRoutes.More]: {
    component: MoreScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.FeedUploadScreen]: {
    component: FeedUploadScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.ProfileScreen]: {
    component: ProfileScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.EditProfile]: {
    component: EditProfile,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.ChangePassword]: {
    component: ChangePassword,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.ReceiptsListScreen]: {
    component: ReceiptsListScreen,
    options: {
      headerShown: false,
      headerTitle: Strings.receiptsList,
    },
  },
  [NavigationRoutes.WarrantyListScreen]: {
    component: WarrantyListScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.FeedScreen]: {
    component: FeedScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.WarrantyFilterScreen]: {
    component: WarrantyFilterScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.AccountSettings]: {
    component: AccountSettings,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.AlertAndNotification]: {
    component: AlertNotification,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.ThemeScreen]: {
    component: Theme,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.Authentication]: {
    component: Authentication,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.PrivacyScreen]: {
    component: Privacy,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.TermsScreen]: {
    component: Terms,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.ContactUsScreen]: {
    component: ContactUsScreen,
    options: {
      headerShown: false,
      headerTitle: Strings.contactUs,
    },
  },
  [NavigationRoutes.EditWarrantyScreen]: {
    component: EditWarrantyScreen,
    options: {headerShown: false},
  },
  [NavigationRoutes.WarrantyDetailScreen]: {
    component: WarrantyDetailScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.ReceiptFilterScreen]: {
    component: ReceiptFilterScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.ReceiptDetailScreen]: {
    component: ReceiptDetailScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.AboutScreen]: {
    component: AboutScreen,
    options: {
      headerShown: false,
    },
  },
  [NavigationRoutes.HelpSupportScreen]: {
    component: HelpSupportScreen,
    options: {
      headerShown: false,
    },
  },
};
