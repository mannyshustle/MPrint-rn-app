import {AppContext} from '@contexts';
import {useNavigation} from '@react-navigation/native';
import {Category} from 'lib_cloud';
import {useContext, useMemo} from 'react';

export const useActions = () => {
  const navigator = useNavigation();
  const {categories, isLoadingCategories} = useContext<any>(AppContext);
  const popularCategories = useMemo(
    () =>
      (categories as Category[])?.filter(category => category.isPopular) ?? [],
    [categories],
  );
  const itemsPerRow = popularCategories?.length / 2;

  const onCategoryItemPress = (category: Category) => {
    return () => {
      navigator.navigate('ShopStack', {screen: 'Products', params: {category}});
    };
  };
  return {
    popularCategories,
    onCategoryItemPress,
    itemsPerRow,
    isLoadingCategories,
  };
};
