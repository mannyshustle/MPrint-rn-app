import {useNavigation} from '@react-navigation/native';

export default function useActions() {
  const navigator = useNavigation();

  return {
    navigator,
  };
}
