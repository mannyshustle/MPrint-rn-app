import {useNavigation} from '@react-navigation/native';
import {useParseQuery} from '@parse/react-native';
import Parse from 'parse/react-native.js';

export default function useActions() {
  const Order = Parse.Object.extend('Order');
  const query = new Parse.Query(Order);
  const {
    results: orders,
    isLoading,
    isLive,
    error,
  } = useParseQuery(query, {
    // enableLiveQuery: true,
  });
  const navigator = useNavigation();

  const handleNewOrder = () => {
    navigator.navigate('PrintableSelector');
  };

  return {
    navigator,
    orders,
    isLoading,
    handleNewOrder,
  };
}
