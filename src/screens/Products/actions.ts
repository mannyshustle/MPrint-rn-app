import {useNavigation, useRoute} from '@react-navigation/native';
import {PRODUCT_CLASSNAME} from 'lib_cloud';
import {useParseQueryList} from 'lib_hooks';

export default function useActions() {
  const navigator = useNavigation();
  const {category, tag} = useRoute().params;

  const query = new Parse.Query(PRODUCT_CLASSNAME);
  if (category) {
    query.containedIn('categories', [category]);
  }
  if (tag) {
    query.containedIn('tags', [tag]);
  }
  const {results: products, isLoading: isLoadingProducts} = useParseQueryList(
    PRODUCT_CLASSNAME,
    query,
  );

  const handleEditor = (item: any) => () => {
    navigator.navigate('Editor', {
      product: item,
    });
  };
  return {
    navigator,
    products,
    handleEditor,
    isLoadingProducts,
  };
}