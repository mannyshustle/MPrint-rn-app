import {useCallback, useMemo, useRef, useState} from 'react';
import {PrintifyResults} from '@types/printifyWebview';
import {displayMsg} from 'lib_helpers/logger';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ParseFunctions} from 'lib_cloud/parse';
import Parse from 'parse/react-native';

export default function useActions() {
  const route = useRoute();
  const navigator = useNavigation();
  const {blueprint} = route?.params ?? ({} as any);
  const {id: blueprintId, providerId} = blueprint;

  const editorUrl = `https://printify.com/app/editor/${blueprintId}/${providerId}`;
  const [printifyResults, setPrintifyResults] = useState<PrintifyResults>({
    blueprintId: blueprintId,
    providerId,
  });
  const [designAdded, setDesignAdded] = useState(false);

  const webViewRef = useRef(null);

  const getReturnMessage = (key: string, message?: string) => {
    return `window.ReactNativeWebView.postMessage(JSON.stringify({
      key: "${key}", message: "${message}"
    }));
    `;
  };

  const handleContinuePress = useCallback(() => {
    let script;
    if (!designAdded) {
      script = `
      var buttons = document.querySelectorAll('[data-testid="button"]');
      var optionsButton = Array.from(buttons).find(button => button.textContent.includes('Options'));
      if (optionsButton) {
        optionsButton.click();
        ${getReturnMessage('optionsPresent')}
      } else {
        ${getReturnMessage('optionsNotPresent')}
      }
      true;
  `;
    } else {
      script = `
      function toCamelCase(str) {
        return str
            .split(' ')
            .map((word, index) => {
                if (index == 0) {
                    return word.toLowerCase();
                } else {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
            })
            .join('');
      }
      var closeButton = document.querySelectorAll('[data-testid="closeButton"]');
      if (closeButton && closeButton.length > 0) {
        // options popup is up so we collect the options details along with the html to extract the upladed image
        var currentHtml = document.documentElement.outerHTML;

        var config = {html: currentHtml};
        var containers = document.querySelectorAll('.config-wrapper .input-container');
        containers.forEach(container => {
          var label = container.querySelector('label')?.innerText || 'Unknown';
          var key = toCamelCase(label)
          var input = container.querySelector('input');
          var value = input ? input.value : '';
          config[key] = value;
        });

        window.ReactNativeWebView.postMessage(JSON.stringify({
          key: "optionsAndDesignImage", message: config
        }));
        closeButton[0].click(); // Click the close button
      }
      
      var previewSection = document.querySelector('.preview-content');
      if (previewSection){
        var currentHtml = document.documentElement.outerHTML;
        window.ReactNativeWebView.postMessage(JSON.stringify({
          key: "previewImages", message: currentHtml
        }));
      }
      else{
        // Additional logic to click the 'Preview' button
        var buttons = document.querySelectorAll('[data-testid="button"]');
        var previewButton = Array.from(buttons).find(button => button.textContent.includes('Preview'));
        if (previewButton) {
          previewButton.click();
        }
      }
      true;
    `;
    }
    (webViewRef.current as any)?.injectJavaScript(script);
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
    Object.keys(item).forEach(key => {
      order.set(key, item[key]);
    });
    await ParseFunctions.performAction(order.save());

    navigator.goBack();
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
      console.log(newPrintifyResults);

      saveOrderToParse(newPrintifyResults);
      setPrintifyResults(newPrintifyResults);
    }
  };
  return {webViewRef, handleMessage, buttonText, onButtonPress, editorUrl};
}
