import {useNavigation} from '@react-navigation/native';
import {AppContext} from '@contexts';
import {useContext} from 'react';
import {Cart as CartType} from 'lib_cloud';

export default function useActions() {
  const {cartItems} = useContext<any>(AppContext);
  const navigator = useNavigation();

  const onCheckoutPress = () => {
    navigator.navigate('Checkout');
  };

  const onItemPressed = (item: CartType) => () => {
    navigator.navigate('ImageGallery', {imageUrls: item.previewImageUrls});
  };

  return {
    cartItems,
    onCheckoutPress,
    onItemPressed,
  };
}
