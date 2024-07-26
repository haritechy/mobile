# Melbeez App

**Project Name**: `Melbeez`

**Bundle Id**: `com.melbeez.ios`   **Package Name**: `com.melbeez.app`

[![React Native](https://img.shields.io/badge/ReactNative-%2302569B.svg?style=for-the-badge&logo=ReactNative&logoColor=white)](https://reactnative.dev/docs/)

---

##  Project Desctiption
  - Melbeez an Inventory management mobile application

## Prerequisites

**iOS** : XCode(12.3) onwards

**Android** : Android Studio(4.2) with gradle(7.3.3) onwards

**Editor** : Visual Studio Code

## How to Setup Project

**Step 1:** Clone this repository.
**Step 2:** Go to the cloned repo and open it in terminal.
**Step 3:** Install the dependencies with `$ yarn install`
**Step 4:** Run the npm script to install the cocoapods `$ cd ios && pod install`

## How to Run the Project

1. Open the project directory in to terminal
2. Run and build for either OS
    * Run iOS app
        ```bash 
        yarn ios
        ```
    * Run Android app
      ```bash 
      yarn android
      ```
    * Note: This npm scripts will lint your code first. If there are no lint errors, then it will run the ios or android app. Otherwise, it will show the lint errors in the terminal.

## Coding Style used

This project adheres to JavaScript Standard for codinng style. To maintain coding standards, utilising features of ES6 and follow best development practices of react-native, this project also uses [ES6](http://es6-features.org/#Constants), some rules of [eslint-airbnb](https://github.com/airbnb/javascript), [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) and [eslint-plugin-react-native](https://github.com/intellicode/eslint-plugin-react-native).

**Do not disable lint inside the code. Try to understand the rule and then follow it into your code. Disabling lint will be considered a violation of coding standards. Exceptions will be allowed by the code-reviewer and team lead after understanding the need to ignore lint.**

1. **To Lint**
  
   Use the npm script `lint`. To run it
  ```bash 
    npm run lint
  ```
2. **Auto Lint on Commit**
   
   This is implemented using [husky](https://github.com/typicode/husky). So husky will prevent code-cmmits having lint errors. There is no additional setup needed.

3. **Understanding Linting Errors**

   The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).


## Extra steps for android

- Mind the version of google services used in the project. All google services must have same version. This is implemented using project level build.gradle.

## Extra steps for ios

- You will need all the certificates to run the ios project in a real device.

## List of all dependencies used in the project with their usage

- **Framework:**
  - [React Native](https://github.com/facebook/react-native)

- **State management libraries:** 
  - [redux-toolkit](https://github.com/reduxjs/redux-toolkit), [redux](https://github.com/reduxjs/redux), [react-redux](https://github.com/reduxjs/react-redux), [redux-persist](https://github.com/rt2zz/redux-persist), [redux-thunk](https://github.com/reduxjs/redux-thunk),

- **API & Middleware libraries:**
  - [apisauce](https://github.com/infinitered/apisauce)

- **Libraries used for navigation:**
  - [react-navigation](https://github.com/react-navigation/react-navigation), [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler), [react-navigation-stack](https://github.com/react-navigation/stack), [@react-navigation/bottom-tabs](https://github.com/react-navigation/react-navigation)

- **Libraries used for forms and validations:**
  -    [formik](https://github.com/formium/formik)[yup](https://github.com/jquense/yup)

- **Libraries used for UI:**
  - [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker),
  [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen),
  [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view),
  [react-native-webview](https://github.com/react-native-webview/react-native-webview),
  [react-native-camera](https://github.com/react-native-camera/react-native-camera),
  [react-native-permissions](https://github.com/zoontek/react-native-permissions),
  [react-native-qrcode-scanner](https://github.com/moaazsidat/react-native-qrcode-scanner),
  [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image),
  [react-native-actions-sheet](https://github.com/ammarahm-ed/react-native-actions-sheet),
  [react-native-date-picker](https://github.com/henninghall/react-native-date-picker),
  [react-native-otp-inputs](https://github.com/ults-io/react-native-otp-inputs),
  [react-native-progress](https://github.com/oblador/react-native-progress),
  [react-native-snap-carousel](https://github.com/meliorence/react-native-snap-carousel),
  [react-native-svg](https://github.com/software-mansion/react-native-svg),
  [react-native-swiper](https://github.com/leecade/react-native-swiper),
  [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons),
  [victory-native](https://github.com/formidablelabs/victory),  

- **Libraries used for notification:** 
  - [@react-native-firebase/app](https://github.com/invertase/react-native-firebase/tree/main), [@react-native-firebase/messaging](https://github.com/invertase/react-native-firebase/tree/main), [react-native-push-notification](https://github.com/zo0r/react-native-push-notification), [push-notification-ios](https://github.com/react-native-push-notification/ios),

- **Libraries used for storage:** 
  - [async-storage](https://github.com/react-native-async-storage/async-storage)

- **Libraries used for localization:** 
  - [i18next](https://github.com/i18next/i18next), [react-i18next](https://github.com/i18next/react-i18next), [react-native-localize](https://github.com/zoontek/react-native-localize)

- **Libraries used for SocialLogin:**
  - [react-native-fbsdk-next](https://github.com/thebergamo/react-native-fbsdk-next), [react-native-google-signin](https://github.com/react-native-google-signin/google-signin), [react-native-apple-authentication](https://github.com/invertase/react-native-apple-authentication)

- **Libraries used for webview** 
  -[react-native-webview](https://github.com/react-native-webview/react-native-webview)

- **Libraries used for Authentication** 
  -[react-native-secure-authentication](https://github.com/djintalkalan/react-native-secure-authentication)
  -[react-native-passcode-status](https://github.com/tradle/react-native-passcode-status)

 - **Other useful packages:**
  - [moment](https://github.com/moment/moment), 
  [react-native-google-mobile-ads](https://github.com/invertase/react-native-google-mobile-ads), [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view),
  

## Dev Environment
  - [ApiBaseUrls](http://dev.mobmaxime.com/MelbeezAPI), 
  - [ImageBaseUrl](http://dev.mobmaxime.com/MelbeezAPI/MediaServer), 
## Production Environment
  - [ApiBaseUrls](https://melbeeznewapi.taxations.com.au), 
  - [ImageBaseUrl](https://dev-melbeez-s3.s3.us-east-1.amazonaws.com), 

## [TroubleShooting_1]

## Invariant Violation: ViewPropTypes has been removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'

- [Link](https://stackoverflow.com/questions/71702392/viewproptypes-will-be-removed-from-react-native-migrate-to-viewproptypes-export/73166444#73166444)

## [TroubleShooting_2]

## Progress circle fill black issue

- [Link](https://github.com/oblador/react-native-progress/issues/234#issue-975056645)

## Following accounts are used for the mentioned platform

**Google Adds**: melbeez22inc@gmail.com 
**Barcode Rapid Api**: melbeez22inc@gmail.com 
**Firebase**: melbeez22inc@gmail.com 
**Google Play Console**: melbeez22inc@gmail.com 
**Apple Developer**: melbeez22inc@gmail.com 
**
