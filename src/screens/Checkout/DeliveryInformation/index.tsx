import React from 'react';
import {Platform} from 'react-native';
import {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {
  Box,
  Text,
  Button,
  Section,
  Divider,
  DateTimePicker,
  Image,
} from 'lib_components';
import {useNavigation} from '@react-navigation/native';

export const DeliveryInformation = () => {
  const navigation = useNavigation();
  const [date, setDate] = React.useState(new Date(1598051730000));
  const [showDateTimePicker, setShowDateTimePicker] = React.useState(false);

  const onChangeAddressButtonPress = () => {
    navigation.navigate('ChangeAddress');
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDateTimePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTimeButtonPress = () => {
    setShowDateTimePicker(!showDateTimePicker);
  };

  return (
    <Section
      title="Deliver to"
      actionButtonText="Change address"
      hasDivider={false}
      onButtonActionPress={onChangeAddressButtonPress}>
      <Box backgroundColor="card">
        <Box flexDirection="row" padding="m">
          <Box marginRight="m">
            <Image
              source={require('lib_assets/checkout/map.png')}
              width={80}
              height={80}
              borderRadius="m"
            />
          </Box>
          <Box>
            <Text fontWeight="bold" marginBottom="s">
              588 Blanda Square - Virginia
            </Text>
            <Text variant="secondary" accessibilityRole="link" marginBottom="s">
              Add floor / unit number
            </Text>
            <Text variant="secondary">Add a note to driver</Text>
          </Box>
        </Box>
        <Divider />
        <Box padding="m" flexDirection="row" justifyContent="space-between">
          <Box>
            <Text variant="secondary" marginBottom="s">
              Delivery time
            </Text>
            <Text>Deliver now (15 mins)</Text>
          </Box>
          <Box justifyContent="center">
            <Button
              variant="outline"
              buttonSize="s"
              label={showDateTimePicker ? 'Done' : 'Change time'}
              onPress={onChangeTimeButtonPress}
            />
          </Box>
        </Box>
      </Box>
      {showDateTimePicker && (
        <DateTimePicker value={date} onChange={onChange} margin="m" />
      )}
    </Section>
  );
};
