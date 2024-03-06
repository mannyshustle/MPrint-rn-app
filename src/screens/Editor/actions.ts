import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {PrintifyResults} from '@types/printifyWebview';
import {displayMsg} from 'lib_helpers/logger';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ParseFunctions,
  CloudinaryCred,
  getCloudinaryCred,
  getCloudinaryUploadScript,
} from 'lib_cloud';
import Parse from 'parse/react-native';
import {
  afterDesignAddedScript,
  beforeDesignAddedScript,
  saveImagesToCDN,
} from './htmlHelper';

export default function useActions() {
  const route = useRoute();
  const navigator = useNavigation();
  const {printable} = route?.params ?? ({} as any);
  const {printableId, providerId} = printable;
  const [cloudinaryCred, setCloudinaryCred] = useState<CloudinaryCred>();
  const cloudinaryUploadScript = useMemo(
    () =>
      cloudinaryCred
        ? getCloudinaryUploadScript(cloudinaryCred, 'test', 'test')
        : '',
    [cloudinaryCred],
  );
  const editorUrl = `https://printify.com/app/editor/${printableId}/${providerId}`;
  console.log(editorUrl)
  const [printifyResults, setPrintifyResults] = useState<PrintifyResults>({
    printableId,
    providerId,
  });
  const [designAdded, setDesignAdded] = useState(false);

  const webViewRef = useRef(null);
  useEffect(() => {
    const getCloudinaryCredRun = async () => {
      setCloudinaryCred(await getCloudinaryCred());
    };
    getCloudinaryCredRun();
  }, []);

  const handleContinuePress = useCallback(() => {
    (webViewRef.current as any)?.injectJavaScript(
      !designAdded ? beforeDesignAddedScript : afterDesignAddedScript,
    );
  }, [designAdded]);

  const [buttonText, onButtonPress] = useMemo(() => {
    if (printifyResults?.imageUrls?.length ?? 0 > 1) {
      return ['Submit Order', handleContinuePress];
    } else {
      return ['Continue', handleContinuePress];
    }
  }, [handleContinuePress, printifyResults?.imageUrls?.length]);

  const saveOrderToParse = async (item: PrintifyResults) => {
    const Order = Parse.Object.extend('Order');
    const order = new Order();
    if (item?.imageUrls) {
      Object.keys(item).forEach(key => {
        order.set(key, item[key]);
      });
      await ParseFunctions.performAction(order.save());

      navigator.goBack();
    }
  };

  const extractImageUrls = (htmlContent: string = '') => {
    const imageUrls: string[] = [];
    const imgRegex = /<img[^>]+src="(blob:[^">]+)"/g;
    let match;

    while ((match = imgRegex.exec(htmlContent)) !== null) {
      imageUrls.push(match[1]);
    }

    return imageUrls;
  };
  const handleMessage = (event: any) => {
    const webviewMsg = JSON.parse(event.nativeEvent.data);
    if (webviewMsg?.key === 'optionsNotPresent') {
      displayMsg("Press 'Add your design' to add an image");
    } else if (webviewMsg?.key === 'optionsPresent') {
      setDesignAdded(true);
    } else if (webviewMsg?.key === 'optionsAndDesignImage') {
      const config = webviewMsg?.message;
      const extractImages = extractImageUrls(config.html);
      const imageUrls = Array.from(
        new Set([...(printifyResults?.imageUrls ?? []), ...extractImages]),
      );

      delete config.html;
      config.imageUrls = imageUrls;
      setPrintifyResults({
        ...printifyResults,
        ...config,
      });
    } else if (webviewMsg?.key === 'previewImages') {
      const previewImagesHtml = webviewMsg?.message;
      const extractImages = extractImageUrls(previewImagesHtml);
      const newPrintifyResults = {
        ...printifyResults,
        imageUrls: extractImages,
      } as any;
      setPrintifyResults(newPrintifyResults);
      (webViewRef.current as any)?.injectJavaScript(
        saveImagesToCDN(extractImages, cloudinaryUploadScript),
      );
    } else if (webviewMsg?.key === 'imagesPushedToCDN') {
      const newPrintifyResults = {
        ...printifyResults,
        imageUrls: webviewMsg?.message,
      } as any;
      saveOrderToParse(newPrintifyResults);
      // setPrintifyResults(newPrintifyResults);
    } else if (webviewMsg?.key === 'loading') {
      console.log(webviewMsg);
    } else if (webviewMsg?.key === 'error') {
      console.log(webviewMsg);
    } else if (webviewMsg?.key === 'test') {
      console.log(event);
    }
  };
  return {
    webViewRef,
    handleMessage,
    buttonText,
    onButtonPress,
    editorUrl,
  };
}
