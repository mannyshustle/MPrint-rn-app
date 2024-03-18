import React from 'react';
import {Box, Text, Button} from 'lib_components';
import {OrderSuccessModal} from './SuccessOrderModal';
import {formatCurrency} from 'lib_utils';

type PlaceOrderProps = {
  totalPrice: number;
  shippingFee: number;
};

export const PlaceOrder: React.FC<PlaceOrderProps> = ({
  totalPrice,
  shippingFee,
}) => {
  const [isSuccessOrderModalVisible, setIsSuccessOrderModalVisible] =
    React.useState(false);

  const onPlaceOrderButtonPress = () => {
    setIsSuccessOrderModalVisible(true);
  };

  return (
    <Box
      backgroundColor="card"
      padding="m"
      borderTopWidth={0.5}
      borderTopColor="border">
      <Box flexDirection="row" justifyContent="space-between" marginBottom="m">
        <Text>Total</Text>
        <Text fontWeight="bold">
          {formatCurrency(totalPrice + shippingFee)}
        </Text>
      </Box>
      <Button
        isFullWidth
        onPress={onPlaceOrderButtonPress}
        label="Place Order"
      />
      <OrderSuccessModal
        isVisible={isSuccessOrderModalVisible}
        setIsVisble={setIsSuccessOrderModalVisible}
      />
    </Box>
  );
};
