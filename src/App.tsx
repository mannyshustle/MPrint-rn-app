import {NavigationContainer} from '@react-navigation/native';
import 'react-native-get-random-values';

import React, {useEffect, useState} from 'react';
import {Navigation} from './navigation';
import parseConfig from '../parseClientConfig.json';
import {ParseInitializeRN, SubClasses} from 'lib_cloud/parse';
import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {
  GetParseCredentials,
  Loading,
  SaveParseCredentials,
} from 'lib_components';
import Parse from 'parse/react-native';

enableScreens(true);
export function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Parse.User<Parse.Attributes>>();
  useEffect(() => {
    const getConnected = async () => {
      const result = await GetParseCredentials();
      const cloud = new ParseInitializeRN(result ?? parseConfig, SubClasses);

      // TODO: temp to be removed. used for testing
      if (!result) {
        SaveParseCredentials(parseConfig);
      }
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
    <NavigationContainer>
      <Navigation user={user} />
    </NavigationContainer>
  );
}

export default App;
