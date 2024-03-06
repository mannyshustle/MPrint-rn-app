import {Dimensions, StyleSheet} from 'react-native';
export const {width} = Dimensions.get('window');
export default StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    height: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  text: {},
  imageContainer: {
    justifyContent: 'center',
  },
  itemImage: {
    flex: 1,
    height: 100,
    resizeMode: 'contain',
  },
});
