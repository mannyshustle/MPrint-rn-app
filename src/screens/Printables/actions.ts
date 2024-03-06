import {useNavigation, useRoute} from '@react-navigation/native';
import {PRINTABLE_CLASSNAME} from 'lib_cloud';
import {useParseQueryList} from 'lib_hooks';

export default function useActions() {
  const navigator = useNavigation();
  const {category, tag} = useRoute().params;

  const query = new Parse.Query(PRINTABLE_CLASSNAME);
  if (category) {
    query.containedIn('categories', [category]);
  }
  if (tag) {
    query.containedIn('tags', [tag]);
  }
  const {results: printables, isLoadingPrintables} = useParseQueryList(
    PRINTABLE_CLASSNAME,
    query,
  );

  const handleEditor = (item: any) => () => {
    navigator.navigate('Editor', {
      printable: item,
    });
  };
  return {
    navigator,
    printables,
    handleEditor,
    isLoadingPrintables,
  };
}
