import React from 'react';
import {Section, Box, Text, Icon, Button} from 'lib_components';
import {useNavigation} from '@react-navigation/native';

export const PaymentMethod = () => {
  const navigation = useNavigation();

  const onAddAPromoButtonPress = () => {
    navigation.navigate('Promotion');
  };

  const onPaymentMethodButtonPress = () => {
    navigation.navigate('PaymentMethod');
  };

  return (
    <Section title="Payment Method">
      <Box
        backgroundColor="card"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Box flexDirection="row" alignItems="center">
          <Button variant="transparent" onPress={onPaymentMethodButtonPress}>
            <Box flexDirection="row" alignItems="center">
              <Icon name="cash" isPrimary />
              <Text marginLeft="s" color="primary">
                Cash On Delivery
              </Text>
            </Box>
          </Button>
        </Box>
        <Button variant="transparent" onPress={onAddAPromoButtonPress}>
          <Text variant="primary">Add a promo</Text>
        </Button>
      </Box>
    </Section>
  );
};
