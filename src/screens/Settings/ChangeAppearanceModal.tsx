import * as React from 'react';
import themeContext from 'lib_contexts/theme-context';
import {ColorSchemeName} from 'react-native';
import {Dialog, RadioButton, RadioOption} from 'lib_components';

type ChangeAppearanceModalProps = {
  isVisible: boolean;
  hideModal: () => void;
};

const appearanceOptions: RadioOption[] = [
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'System',
    value: 'system',
  },
];

const ChangeAppearanceModal: React.FC<ChangeAppearanceModalProps> = ({
  isVisible,
  hideModal,
}) => {
  const {setTheme, theme, useSystemTheme, setUseSystemTheme} =
    React.useContext(themeContext);

  let defaultValue = theme;
  if (useSystemTheme) {
    defaultValue = 'system';
  }

  const _onItemPressed = (item: RadioOption) => {
    const selectedTheme = item.value;
    if (selectedTheme !== 'system') {
      type NewType = ColorSchemeName;

      setTheme(selectedTheme as NewType);
      setUseSystemTheme(false);
    } else {
      setUseSystemTheme(true);
    }
  };

  return (
    <Dialog
      title="Change Appearance"
      isVisible={isVisible}
      onBackdropPress={hideModal}>
      <RadioButton
        data={appearanceOptions}
        onItemPressed={_onItemPressed}
        defaultValue={defaultValue}
      />
    </Dialog>
  );
};

export default ChangeAppearanceModal;
