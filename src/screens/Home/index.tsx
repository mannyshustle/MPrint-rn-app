import {Container, Text} from 'lib_components';
import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export const Home: React.FC = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Container alignCenter justifyCenter>
        <Text heading1>Welcome to your new app.</Text>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
