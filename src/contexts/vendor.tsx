import {useParseQuery} from '@parse/react-native';
import React, {useState} from 'react';
import {createContext} from 'react';

// Create a Context
export const AppContext = createContext({});

export const AppDataProvider = ({children}: any) => {
  const [cartCount, setCartCount] = useState(10);

  const orderQuery = new Parse.Query('Order');
  const {results: orders, isLoading: isLoadingOrders} = useParseQuery(
    orderQuery,
    {
      enableLiveQuery: false,
    },
  );

  return (
    <AppContext.Provider
      value={{
        orders,
        isLoadingOrders,
        cartCount,
        setCartCount,
      }}>
      {children}
    </AppContext.Provider>
  );
};
