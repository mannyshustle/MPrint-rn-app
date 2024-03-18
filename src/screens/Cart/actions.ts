import {useNavigation} from '@react-navigation/native';
import {AppContext} from '@contexts';
import {useContext} from 'react';

export default function useActions() {
  const {cartItems} = useContext<any>(AppContext);
  const navigator = useNavigation();

  const onCheckoutPress = () => {
    navigator.navigate('Checkout');
  };
  return {
    cartItems,
    onCheckoutPress,
  };
}
