import {useRoute} from '@react-navigation/native';

export default function useActions() {
  const route = useRoute();
  const {imageUrls} = route?.params ?? ({} as any);

  return {
    imageUrls,
  };
}
