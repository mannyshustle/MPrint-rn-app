import {useNavigation} from '@react-navigation/native';
import {useParseQuery} from '@parse/react-native';
import Parse from 'parse/react-native.js';

export default function useActions() {
  const Order = Parse.Object.extend('Order');
  const query = new Parse.Query(Order);
  const {results, isLoading} = useParseQuery(query, {
    enableLiveQuery: false,
  });
  const navigator = useNavigation();

  return {
    navigator,
    results,
    isLoading,
  };
}
