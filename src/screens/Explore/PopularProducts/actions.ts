import {PRODUCT_CLASSNAME, Product} from 'lib_cloud';
import {useNavigation} from '@react-navigation/native';
import {useParseQueryList} from 'lib_hooks';

export const useActions = () => {
  const navigator = useNavigation();

  const query = new Parse.Query(PRODUCT_CLASSNAME);
  query.equalTo('isPopular', true);
  const {results: popularProducts, isLoading: isLoadingProducts} =
    useParseQueryList(PRODUCT_CLASSNAME, query);

  const onButtonActionPress = () => {
    //Navigate to all product list filtered by popular
    // navigation.navigate('PlaceList', {title: 'Popular Near You'});
  };

  const onProductPress = (item: Product) => () => {
    navigator.navigate('Editor', {
      product: item,
    });
  };
  return {
    popularProducts,
    isLoadingProducts,
    onButtonActionPress,
    onProductPress,
  };
};
