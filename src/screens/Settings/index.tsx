import {createStack} from 'lib_navigation';
import {SettingsPage} from './SettingsPage';

export const Settings = () =>
  createStack([
    {
      name: 'SettingsPage',
      component: SettingsPage,
    },
  ]);
