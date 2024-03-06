import {useNavigation} from '@react-navigation/native';
import {useParseQueryList} from 'lib_hooks';
import {CATEGORY_CLASSNAME, Category} from 'lib_cloud';
import {useEffect, useMemo, useState} from 'react';

export default function useActions() {
  const navigator = useNavigation();
  const [currentCategory, setCurrentCategory] = useState<Category>();

  const query = new Parse.Query(CATEGORY_CLASSNAME);
  query.equalTo('level', 1);
  const {results: categories, isLoading: isLoadingCategories} =
    useParseQueryList(CATEGORY_CLASSNAME, query);

  const [currentLevelCategories, setCurrentLevelCategories] = useState<
    Category[]
  >([]);
  const [categoryStack, setCategoryStack] = useState<Category[][]>([]);
  const showBackButton = useMemo(
    () => categoryStack.length > 0,
    [categoryStack.length],
  );

  useEffect(() => {
    setCurrentLevelCategories(categories);
  }, [categories]);

  const handleCategoryPress = (category: Category) => () => {
    setCurrentCategory(category);
    if (category.subLevel && category.subLevel.length > 0) {
      setCategoryStack([...categoryStack, currentLevelCategories]);
      setCurrentLevelCategories(category.subLevel);
    } else {
      navigator.navigate('Printables', {category});
    }
    // Handle navigation to products or deeper category levels
  };

  const handleBack = () => {
    if (categoryStack.length > 0) {
      const previousCategories = categoryStack.pop();
      setCurrentLevelCategories(previousCategories || []);
      setCategoryStack([...categoryStack]);
    }
  };
  console.log(categoryStack);

  return {
    currentTitle: currentCategory?.name ?? 'Shop',
    currentLevelCategories,
    isLoadingCategories,
    showBackButton,
    handleCategoryPress,
    handleBack,
  };
}
