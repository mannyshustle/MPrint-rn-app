import React from 'react';
import { ScrollView } from 'react-native';
import {
  RadioButton,
  Icon,
  RadioOption,
  IconProps,
  Box,
} from '@src/components';
import { paymentMethods } from '@src/data/mock-payment-method';

type PaymentMethodProps = {};

export const PaymentMethod: React.FC<PaymentMethodProps> = () => {
  const data: RadioOption[] = paymentMethods.map((item) => {
    const { id, name, icon } = item;
    return {
      label: name,
      value: id,
      rightElement: <Icon name={icon as IconProps['name']} />,
    };
  });

  const onItemPress = (item: RadioOption) => {
    return () => {
      console.log(item);
    };
  };

  return (
    <Box flex={1} backgroundColor="card">
      <ScrollView>
        <RadioButton
          data={data}
          onItemPress={onItemPress}
          containerProps={{
            paddingHorizontal: 'm',
          }}
        />
      </ScrollView>
    </Box>
  );
};
