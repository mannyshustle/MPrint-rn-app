import {NavigationContainer} from '@react-navigation/native';
import 'react-native-get-random-values';

import React, {useEffect, useState} from 'react';
import {Navigation} from './navigation';
import {ParseInitializeRN, getParseServerCredentials} from 'lib_cloud/parse';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {Loading} from 'lib_components';
import Parse from 'parse/react-native';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {AppDataProvider} from './contexts/vendor';
import {SubClasses} from './cloud';
import {initialCredentials} from 'lib_helpers'

enableScreens(true);

export function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Parse.User<Parse.Attributes>>();
  useEffect(() => {
    const getConnected = async () => {
      await initialCredentials();
      const result = await getParseServerCredentials();
      const cloud = new ParseInitializeRN(result ?? parseConfig, SubClasses);

      // // TODO: temp to be removed. used for testing
      // if (!result) {
      //   SaveParseCredentials(parseConfig);
      // }
      const currentUser = await Parse.User.currentAsync();

      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    };

    getConnected();
  }, []);

  return loading ? (
    <Loading full />
  ) : (
    <AppDataProvider>
      <NavigationContainer>
        <PaperProvider>
          <Navigation user={user} />
        </PaperProvider>
      </NavigationContainer>
      <Toast />
    </AppDataProvider>
  );
}

export default App;
