import React from 'react';
import {View, ScrollView, I18nManager} from 'react-native';
import {Text, Icon, Divider, Section, ListRowItem} from 'lib_components';
import styles from './styles';
import ChangeAppearanceModal from './ChangeAppearanceModal';
import ChangeLanguageModal from './ChangeLanguageModal';
import themeContext from 'lib_contexts/theme-context';
import {useNavigation} from '@react-navigation/native';

type SettingsProps = {};

export const SettingsPage: React.FC<SettingsProps> = () => {
  const navigator = useNavigation();
  const {theme, useSystemTheme} = React.useContext(themeContext);
  const [enableRTL, setEnableRTL] = React.useState(false);
  const [isAppearanceModalVisible, setIsAppearanceModalVisible] =
    React.useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] =
    React.useState(false);

  React.useEffect(() => {
    setEnableRTL(I18nManager.isRTL);
  }, []);

  const _hideAppearanceModal = () => {
    setIsAppearanceModalVisible(false);
  };

  const _hideLanguageModal = () => {
    setIsLanguageModalVisible(false);
  };

  const chevronIconName = I18nManager.isRTL ? 'chevron-left' : 'chevron-right';

  const _renderAppSettingsSection = () => {
    return (
      <Section title="App Settings">
        <ListRowItem
          title="Appearance"
          onPress={() => setIsAppearanceModalVisible(true)}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Text style={styles.settingOptionText}>
                {useSystemTheme ? 'System' : theme.toString()}
              </Text>
              <Icon name={chevronIconName} />
            </View>
          }
        />

        <Divider />
        <ListRowItem
          title="Language"
          onPress={() => setIsLanguageModalVisible(true)}
          rightIcon={
            <View style={styles.settingOptionContainer}>
              <Text style={styles.settingOptionText}>English</Text>
              <Icon name={chevronIconName} />
            </View>
          }
        />
      </Section>
    );
  };

  const _renderMoreInformationSection = () => {
    return (
      <Section title="Data Source">
        <ListRowItem
          title="Connect to dB"
          onPress={() => navigator.navigate('ConnectToParse')}
        />
        <Divider />
      </Section>
    );
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        {_renderAppSettingsSection()}
        {_renderMoreInformationSection()}
      </ScrollView>
      <ChangeAppearanceModal
        isVisible={isAppearanceModalVisible}
        hideModal={_hideAppearanceModal}
      />
      <ChangeLanguageModal
        isVisible={isLanguageModalVisible}
        hideModal={_hideLanguageModal}
      />
    </View>
  );
};
