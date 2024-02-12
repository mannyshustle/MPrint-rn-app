import React from 'react';
import {Container, Button} from 'lib_components';
import useActions from './actions';
import {WebView} from 'react-native-webview';
import {hideElements} from './htmlHelper';

export const Editor: React.FC = ({}) => {
  const {webViewRef, handleMessage, buttonText, onButtonPress, editorUrl} =
    useActions();
  return (
    <Container isSafeAreaView fullFlex>
      <WebView
        ref={webViewRef}
        source={{uri: editorUrl}}
        style={{flex: 1}}
        javaScriptEnabled={true}
        onMessage={handleMessage}
        injectedJavaScript={hideElements}
      />
      <Button text={buttonText} onPress={onButtonPress} />
    </Container>
  );
};

export default Editor;
