import {Home, PrintShops, Editor, Settings, PrintableSelector} from '../screens';
import {NavigationStructure, setupNavigation} from 'lib_navigation';
import {Authentication} from 'lib_screens';
import Parse from 'parse/react-native';
import {FC} from 'react';

interface NavigationProps {
  user?: Parse.User<Parse.Attributes>;
}

const AppRoutes = [
  {name: 'Home', component: Home},
  {name: 'PrintShops', component: PrintShops},
  {
    name: 'Editor',
    component: Editor,
    options: {
      headerShown: true,
    },
  },
];
export const Navigation: FC<NavigationProps> = ({user}) => {
  const initialNavigationOrder = true //user
    ? [...AppRoutes, Authentication]
    : [Authentication, ...AppRoutes];

  const navigationStructure: NavigationStructure = {
    stackScreens: [
      ...initialNavigationOrder,
      {
        name: 'Settings',
        component: Settings,
      },
    ],
    modals: [
      {
        name: 'PrintableSelector',
        component: PrintableSelector,
      },
    ],
  };
  return setupNavigation(navigationStructure);
};
