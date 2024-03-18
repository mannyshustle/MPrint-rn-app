import React from 'react';
import {Box, Text, Section, Divider} from 'lib_components';
import {CartItem} from 'lib_cloud';
import {formatCurrency} from 'lib_utils';
import {useNavigation} from '@react-navigation/native';

type OrderSummaryProps = {
  cartItems: CartItem[];
  totalPrice: number;
  shippingFee: number;
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  totalPrice,
  shippingFee,
}) => {
  const navigation = useNavigation();

  const onAddItemButtonPress = () => {
    navigation.navigate('DishDetailsModal');
  };

  return (
    <Section
      title="Order Summary"
      actionButtonText="Add Items"
      onButtonActionPress={onAddItemButtonPress}>
      <Box backgroundColor="card">
        <Box padding="m" flexDirection="row" justifyContent="space-between">
          <Box flexDirection="row">
            <Text marginRight="m">{`${cartItems.length}`}</Text>
            {cartItems.map((cartItem, cartItemIndex) => (
              <Box key={cartItemIndex}>
                <Text marginBottom="xs" fontWeight="bold">
                  {'cartItem.dish.title'}
                </Text>
                {/* {cartItem.sideDishes.map((dish, dishIndex) => (
                  <Text variant="secondary" key={dishIndex} marginBottom="xxs">
                    {dish.title}
                  </Text>
                ))} */}
              </Box>
            ))}
          </Box>
          <Text fontWeight="bold">{formatCurrency(totalPrice)}</Text>
        </Box>
        <Divider />
        <Box padding="m">
          <Box flexDirection="row" justifyContent="space-between">
            <Text>Subtotal</Text>
            <Text>{formatCurrency(totalPrice)}</Text>
          </Box>
          <Box marginTop="s" flexDirection="row" justifyContent="space-between">
            <Text>Delivery: 6.1km</Text>
            <Text>{formatCurrency(shippingFee)}</Text>
          </Box>
        </Box>
      </Box>
    </Section>
  );
};
