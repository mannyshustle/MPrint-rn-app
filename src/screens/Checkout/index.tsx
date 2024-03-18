import React from 'react';
import {ScrollView} from 'react-native';
import {DeliveryInformation} from './DeliveryInformation';
import {OrderSummary} from './OrderSummary';
import {PaymentMethod} from './PaymentMethod';
import {PlaceOrder} from './PlaceOrder';
import {AppContext} from '@contexts';
import {Container} from 'lib_components';

const SHIPPING_FEE = 5;

export const Checkout = () => {
  const {cartItems} = React.useContext(AppContext);
  return (
    <Container isSafeAreaView fullFlex>
      <ScrollView>
        <DeliveryInformation />
        <OrderSummary
          cartItems={cartItems}
          totalPrice={100}
          shippingFee={SHIPPING_FEE}
        />
        <PaymentMethod />
      </ScrollView>
      <PlaceOrder totalPrice={100} shippingFee={SHIPPING_FEE} />
    </Container>
  );
};
