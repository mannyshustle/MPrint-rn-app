import {useParseQuery} from '@parse/react-native';
import {CATEGORY_CLASSNAME, ParseFunctions} from 'lib_cloud';
import {useParseQueryList} from 'lib_hooks';
import React, {useEffect, useState} from 'react';
import {createContext} from 'react';

// Create a Context
export const AppContext = createContext({});

export const AppDataProvider = ({children}: any) => {
  const [cartCount, setCartCount] = useState(10);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getInitialData = async () => {
      const cartQuery = new Parse.Query('Cart');
      const results = await ParseFunctions.performAction(cartQuery.findAll());
      setCartItems(results);
    };
    getInitialData();
  }, []);

  const orderQuery = new Parse.Query('Order');
  const {results: orders, isLoading: isLoadingOrders} = useParseQuery(
    orderQuery,
    {
      enableLiveQuery: false,
    },
  );

  const query = new Parse.Query(CATEGORY_CLASSNAME);
  query.include('subLevel');
  const {results: categories, isLoading: isLoadingCategories} =
    useParseQueryList(CATEGORY_CLASSNAME, query);
  return (
    <AppContext.Provider
      value={{
        orders,
        isLoadingOrders,
        cartCount,
        setCartCount,
        cartItems,
        setCartItems,
        categories,
        isLoadingCategories,
      }}>
      {children}
    </AppContext.Provider>
  );
};
