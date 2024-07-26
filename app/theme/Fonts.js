import {moderateScale} from './Metrics';

const type = {
  PoppinsBlack: 'Poppins-Black',
  PoppinsBlackItalic: 'Poppins-BlackItalic',
  PoppinsBold: 'Poppins-Bold',
  PoppinsBoldItalic: 'Poppins-BoldItalic',
  PoppinsExtraBold: 'Poppins-ExtraBold',
  PoppinsExtraBoldItalic: 'Poppins-ExtraBoldItalic',
  PoppinsExtraLight: 'Poppins-ExtraLight',
  PoppinsExtraLightItalic: 'Poppins-ExtraLightItalic',
  PoppinsItalic: 'Poppins-Italic',
  PoppinsLight: 'Poppins-Light',
  PoppinsLightItalic: 'Poppins-LightItalic',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsMediumItalic: 'Poppins-MediumItalic',
  PoppinsRegular: 'Poppins-Regular',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsSemiBoldItalic: 'Poppins-SemiBoldItalic',
  PoppinsThin: 'Poppins-Thin',
  PoppinsThinItalic: 'Poppins-ThinItalic',
};

const size = {
  h1: moderateScale(38),
  h2: moderateScale(34),
  h3: moderateScale(30),
  h4: moderateScale(26),
  h5: moderateScale(20),
  h6: moderateScale(19),
  input: moderateScale(18),
  regular: moderateScale(17),
  medium: moderateScale(14),
  small: moderateScale(12),
  tiny: moderateScale(8.5),
  label: moderateScale(16),
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.base,
    fontSize: size.h6,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
  label: {
    fontFamily: type.base,
    fontSize: size.label,
  },
};

export default {
  type,
  size,
  style,
};
