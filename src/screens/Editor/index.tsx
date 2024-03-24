import React from 'react';
import {Container, Button, Text, Spacer, Box} from 'lib_components';
import useActions from './actions';
import {WebView} from 'react-native-webview';
import {hideElements} from './htmlHelper';
import {
  ActivityIndicator,
  Dialog,
  MD2Colors,
  Portal,
  Button as RNPaperButton,
  Snackbar,
} from 'react-native-paper';

export const Editor: React.FC = ({}) => {
  const {
    webViewRef,
    handleMessage,
    onAddToCart,
    loading,
    loadingText,
    editorUrl,
    addToCartConfirmationVisible,
    addToCartConfirmationText,
    addToCartDesignNeededText,
    addedToCartVisible,
    onAddedToCartDismiss,
    onViewCartPress,
    onDismissAddToCartConfirmation,
    onAddToCartConfirmationAccepted,
    onAddToCartDesignNeededAccepted,
  } = useActions();
  return (
    <Container isSafeAreaView fullFlex>
      <WebView
        ref={webViewRef}
        source={{uri: editorUrl}}
        style={{flex: 1}}
        javaScriptEnabled={true}
        onMessage={handleMessage}
        onError={err => console.log(err)}
        injectedJavaScript={hideElements()}
        // injectedJavaScriptBeforeContentLoaded={hideElements()}
      />
      <Button label={'Add To Cart'} onPress={onAddToCart} margin={'m'} />
      <Portal>
        <Dialog
          visible={addToCartConfirmationVisible}
          onDismiss={onDismissAddToCartConfirmation}>
          <Dialog.Title>Add To Cart Confirmation</Dialog.Title>
          <Dialog.Content>
            <Text>{addToCartConfirmationText}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            {addToCartConfirmationText !== addToCartDesignNeededText && (
              <RNPaperButton onPress={onDismissAddToCartConfirmation}>
                Cancel
              </RNPaperButton>
            )}
            <RNPaperButton
              onPress={
                addToCartConfirmationText !== addToCartDesignNeededText
                  ? onAddToCartConfirmationAccepted
                  : onAddToCartDesignNeededAccepted
              }>
              Ok
            </RNPaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {loading && (
        <Box
          position={'absolute'}
          flex={1}
          width={'100%'}
          height={'100%'}
          justifyContent={'center'}
          backgroundColor={'white'}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={'large'}
          />
          <Spacer />
          <Spacer />
          <Spacer />
          <Text variant={'header'} textAlign={'center'}>
            {loadingText}
          </Text>
        </Box>
      )}
      <Snackbar
        visible={addedToCartVisible}
        onDismiss={onAddedToCartDismiss}
        action={{
          label: 'View Cart',
          onPress: onViewCartPress,
        }}>
        Item added to cart.
      </Snackbar>
    </Container>
  );
};
export default Editor;
