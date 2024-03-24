import {
  NavigationStructure,
  StackScreen,
  TabScreen,
  createStack,
  setupNavigation,
} from 'lib_navigation';
import {
  Shop,
  Settings,
  ShopManagerModeHome,
  Editor,
  Products,
  Cart,
  Explore,
  Checkout,
} from '@screens';
import {Authentication} from 'lib_screens';
import Parse from 'parse/react-native';
import {FC, useContext} from 'react';
import {AppContext} from '@contexts';

interface NavigationProps {
  user?: Parse.User<Parse.Attributes>;
}
const ShopStack = () =>
  createStack([
    {
      name: 'Shop',
      component: Shop,
    },
    {
      name: 'Products',
      component: Products,
      options: {
        headerShown: true,
        title: 'Products',
      },
    },
  ]);

const CartStack = () =>
  createStack([
    {
      name: 'Cart',
      component: Cart,
      options: {
        headerShown: true,
        title: 'My Bag',
      },
    },
    {
      name: 'Checkout',
      component: Checkout,
    },
  ]);
const userModeTabs = (cartCount: number): TabScreen[] => {
  return [
    {
      name: 'Explore',
      component: Explore,
      options: {
        headerShown: true,
        title: 'Explore',
      },
      icon: 'home',
    },
    {
      name: 'ShopStack',
      icon: 'store',
      component: ShopStack,
      options: {
        title: 'Shop',
      },
    },
    {name: 'Orders', component: Cart, icon: 'list-alt'},
    {
      name: 'CartStack',
      component: CartStack,
      icon: 'shopping-bag',
      cartCount,
      options: {
        title: 'Cart',
      },
    },
    {
      name: 'Settings',
      component: Settings,
      icon: 'user-circle',
    },
  ];
};
const shopManagerModeTabs: TabScreen[] = [
  {name: 'ShopManagerModeHome', component: ShopManagerModeHome},
  {name: 'Orders', component: Cart},
  {name: 'Shop', component: Shop},
  {
    name: 'Settings',
    component: Settings,
  },
];

const AppRoutes = (cartCount: number): StackScreen[] => {
  return [
    {
      name: 'Home',
      tabScreens: userModeTabs(cartCount),
    },
    {
      name: 'ShopManagerMode',
      tabScreens: shopManagerModeTabs,
      options: {
        headerShown: true,
        title: 'Home',
      },
    },
    {
      name: 'Editor',
      component: Editor,
      options: {
        headerShown: true,
      },
    },
  ];
};
export const Navigation: FC<NavigationProps> = ({user}) => {
  const {cartItems} = useContext<any>(AppContext);
  const cartCount = cartItems.length ?? 0;
  const initialNavigationOrder = true //user
    ? [...AppRoutes(cartCount), Authentication]
    : [Authentication, ...AppRoutes(cartCount)];

  const navigationStructure: NavigationStructure = {
    stackScreens: [...initialNavigationOrder],
    modals: [],
  };
  return setupNavigation(navigationStructure);
};
