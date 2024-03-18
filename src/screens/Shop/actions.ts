import {useNavigation} from '@react-navigation/native';
import {Category} from 'lib_cloud';
import {useContext, useMemo, useState} from 'react';
import {AppContext} from '@contexts';

export default function useActions() {
  const navigator = useNavigation();
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const currentTitle = useMemo(
    () => currentCategory?.name ?? 'Shop',
    [currentCategory],
  );

  // useLayoutEffect(() => {
  //   navigator.setOptions({title: category?.name});
  // }, [navigator, category]);

  const {categories, isLoadingCategories} = useContext<any>(AppContext);

  const [currentLevelCategories, setCurrentLevelCategories] =
    useState<Category[]>(categories);
  const [categoryStack, setCategoryStack] = useState<Category[][]>([]);
  const showBackButton = useMemo(
    () => categoryStack.length > 0,
    [categoryStack.length],
  );

  const handleCategoryPress = (category: Category) => () => {
    setCurrentCategory(category);
    if (category.subLevel && category.subLevel.length > 0) {
      setCategoryStack([...categoryStack, currentLevelCategories]);
      setCurrentLevelCategories(category.subLevel);
    } else {
      navigator.navigate('Products', {category});
    }
  };

  const handleBack = () => {
    if (categoryStack.length > 0) {
      const previousCategories = categoryStack.pop();
      setCurrentLevelCategories(previousCategories || []);
      setCategoryStack([...categoryStack]);
      if (categoryStack.length === 0) {
        setCurrentCategory(undefined);
      }
    }
  };

  return {
    currentTitle,
    currentLevelCategories,
    isLoadingCategories,
    showBackButton,
    handleCategoryPress,
    handleBack,
  };
}
