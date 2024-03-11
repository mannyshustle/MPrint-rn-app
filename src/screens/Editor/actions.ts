import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {EditedProductResults} from '@types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ParseFunctions,
  CloudinaryCred,
  getCloudinaryCred,
  Cart,
} from 'lib_cloud';
import {processEditorResults} from './htmlHelper';
import {AppContext} from '@contexts';
import {displayMsg, logger} from 'lib_helpers';

const addToCartConfirmationTextDefault =
  'Are you done editing and ready to add this product to your cart?';
const addToCartDesignNeededText = 'Add a design to continue';
export default function useActions() {
  const route = useRoute();
  const navigator = useNavigation();
  const {product} = route?.params ?? ({} as any);
  const {printableId, providerId} = product;
  const [cloudinaryCred, setCloudinaryCred] = useState<CloudinaryCred>();
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading Editor...');
  const [addToCartConfirmationVisible, setAddToCartConfirmationVisible] =
    useState(false);
  const [addToCartConfirmationText, setAddToCartConfirmationText] = useState(
    addToCartConfirmationTextDefault,
  );
  const [addedToCartVisible, setAddedToCartVisible] = useState(false);
  const {cartItems, setCartItems} = useContext<any>(AppContext);

  const editorUrl = `https://printify.com/app/editor/${printableId}/${providerId}`;

  const webViewRef = useRef(null);

  useEffect(() => {
    const getCloudinaryCredRun = async () => {
      setCloudinaryCred(await getCloudinaryCred());
    };
    getCloudinaryCredRun();
  }, []);

  const onTest = () => {
    (webViewRef.current as any)?.injectJavaScript(processEditorResults);
  };

  const saveOrderToParse = async (item: EditedProductResults) => {
    const cart = new Cart();
    Object.keys(item).forEach(key => {
      cart.set(key, item[key]);
    });
    await ParseFunctions.performAction(cart.save());
    setCartItems([cart, ...cartItems]);
    displayMsg(
      'Item added to cart. View cart',
      () => {
        navigator.navigate('Cart');
      },
      'top',
    );
    navigator.goBack();
  };

  const handleMessage = (event: any) => {
    const webviewMsg = JSON.parse(event.nativeEvent.data);
    if (webviewMsg?.key === 'editorFinished') {
      setLoading(false);
      const data = webviewMsg.message;
      const results: EditedProductResults = {
        mainImageUrl: data?.uploadedMainImage,
        previewImageUrls: data?.uploadedPreviewImages,
        config: data?.config,
        printableId,
        providerId,
      };
      saveOrderToParse(results);
    } else if (webviewMsg?.key === 'editorLoaded') {
      setLoading(false);
    } else if (webviewMsg?.key === 'designNotAdded') {
      setAddToCartConfirmationText(addToCartDesignNeededText);
      setAddToCartConfirmationVisible(true);
    } else if (webviewMsg?.key === 'loading') {
      setLoading(true);
    } else if (webviewMsg?.key === 'error') {
      console.log(webviewMsg);
      setLoading(false);
    } else if (webviewMsg?.key === 'test') {
      console.log(webviewMsg);
    }
  };

  const onAddToCart = () => {
    setAddToCartConfirmationText(addToCartConfirmationTextDefault);
    setAddToCartConfirmationVisible(true);
  };

  const onDismissAddToCartConfirmation = () =>
    setAddToCartConfirmationVisible(false);

  const onAddToCartDesignNeededAccepted = () => {
    setAddToCartConfirmationVisible(false);
  };

  const onAddToCartConfirmationAccepted = useCallback(() => {
    setAddToCartConfirmationVisible(false);
    if (cloudinaryCred) {
      setLoadingText('Creating Product ...');
      (webViewRef.current as any)?.injectJavaScript(
        processEditorResults(cloudinaryCred, 'test', 'test'),
      );
    }
  }, [cloudinaryCred]);

  const onAddedToCartDismiss = () => setAddedToCartVisible(false);
  const onViewCartPress = () => navigator.navigate('Cart');
  return {
    webViewRef,
    loading,
    loadingText,
    editorUrl,
    addToCartConfirmationVisible,
    addToCartConfirmationText,
    addToCartDesignNeededText,
    addedToCartVisible,
    onAddedToCartDismiss,
    onViewCartPress,
    handleMessage,
    onAddToCart,
    onTest,
    onDismissAddToCartConfirmation,
    onAddToCartDesignNeededAccepted,
    onAddToCartConfirmationAccepted,
  };
}
