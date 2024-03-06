import {useParseQuery} from '@parse/react-native';
import React, {useState} from 'react';
import {createContext} from 'react';

// Create a Context
export const AppContext = createContext({});

export const AppDataProvider = ({children}: any) => {
  const Order = Parse.Object.extend('Shop');
  const query = new Parse.Query(Order);
  const {results: shops, isLoading: isLoadingShops} = useParseQuery(query, {
    enableLiveQuery: false,
  });

  return (
    <AppContext.Provider value={{shops, isLoadingShops}}>
      {children}
    </AppContext.Provider>
  );
};
