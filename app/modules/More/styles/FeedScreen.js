import {StyleSheet} from 'react-native';
import {moderateScale} from './../Theme';
const styles = StyleSheet.create({
  card: {
    padding: moderateScale(15),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: '#FFFFE0', // Light yellow background
    borderColor: '#D3D3D3', // Grey border
    borderWidth: 1, // Border width
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20), // Half of the width/height to make it circular
    marginRight: moderateScale(10),
  },
  headerText: {
    flex: 1,
  },
  author: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginBottom: moderateScale(5),
  },
  headerButton: {
    marginRight: moderateScale(10),
  },
  image: {
    width: '100%',
    height: moderateScale(200),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  textContainer: {
    paddingHorizontal: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  description: {
    fontSize: moderateScale(14),
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: moderateScale(10),
    alignItems: 'center', // Ensure vertical alignment
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure vertical alignment
  },
  footerButton: {
    alignItems: 'center',
    marginRight: moderateScale(10), // Added for spacing between buttons
  },
});
export default styles;
