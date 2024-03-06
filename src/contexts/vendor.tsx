import {useParseQuery} from '@parse/react-native';
import {CATEGORY_CLASSNAME} from 'lib_cloud';
import {useParseQueryList} from 'lib_hooks';
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

  const query = new Parse.Query(CATEGORY_CLASSNAME);
  query.equalTo('level', 1);
  const {results: categories, isLoading: isLoadingCategories} =
    useParseQueryList(CATEGORY_CLASSNAME, query);

    // console.log(categories)
  return (
    <AppContext.Provider
      value={{
        orders,
        isLoadingOrders,
        cartCount,
        setCartCount,
        categories,
        isLoadingCategories,
      }}>
      {children}
    </AppContext.Provider>
  );
};
