import {Home, Settings} from '../screens';
import {NavigationStructure, setupNavigation} from 'lib_navigation';
import {Authentication} from 'lib_screens';
import Parse from 'parse/react-native';
import {FC} from 'react';

interface NavigationProps {
  user?: Parse.User<Parse.Attributes>;
}
export const Navigation: FC<NavigationProps> = ({user}) => {
  const initialNavigationOrder = user
    ? [
        {
          name: 'Home',
          component: Home,
        },
        Authentication,
      ]
    : [
        Authentication,
        {
          name: 'Home',
          component: Home,
        },
      ];

  const navigationStructure: NavigationStructure = {
    stackScreens: [
      ...initialNavigationOrder,
      {
        name: 'Settings',
        component: Settings,
      },
    ],
  };
  return setupNavigation(navigationStructure);
};
