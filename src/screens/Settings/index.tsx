import { createStack } from 'lib_navigation';
import {SettingsPage} from './SettingsPage';
import { ConnectToParse } from 'lib_components';

export const Settings =() => createStack( [
    {
      name: 'SettingsPage',
      component: SettingsPage,
    },
    {
      name: 'ConnectToParse',
      component: ConnectToParse,
    },
  ])