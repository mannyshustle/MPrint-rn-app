import React from 'react';
import {Animated} from 'react-native';
import {Box, Text, Button, BottomSheetModal, LottieView} from 'lib_components';
import styles from './SuccessOrderModal.style';
import {useActions} from './actions';

type OrderSuccessModalProps = {
  isVisible: boolean;
  setIsVisble: (value: React.SetStateAction<boolean>) => void;
};

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isVisible,
  setIsVisble,
}) => {
  const {
    isAnimationFinished,
    fadeIn,
    fadeOut,
    onAnimationFinish,
    onBackdropPress,
    onOrderSomethingElseButtonPress,
    onTrackOrderButtonPress,
  } = useActions(setIsVisble);

  return (
    <BottomSheetModal
      isOpened={isVisible}
      snapPoints={['50%']}
      onClose={onBackdropPress}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box width="100%" alignItems="center">
          <LottieView
            source={require('lib_assets/animations/order-success.json')}
            autoPlay
            loop={false}
            onAnimationFinish={onAnimationFinish}
            height={120}
          />
          {!isAnimationFinished && (
            <Animated.View
              style={[styles.processingOrderContainer, {opacity: fadeOut}]}>
              <Text fontWeight="bold">Processing Your Order...</Text>
            </Animated.View>
          )}
          <Animated.View
            style={[styles.successMessageContainer, {opacity: fadeIn}]}>
            <Text variant="header" fontWeight="bold" color="primary">
              Thank you for your order.
            </Text>
            <Text textAlign="center" marginTop="s">
              You can track the delivery in the "Orders" section.
            </Text>
          </Animated.View>
        </Box>
        <Animated.View
          style={[styles.footerButtonContainer, {opacity: fadeIn}]}>
          <Button
            label="Track My Order"
            isFullWidth
            onPress={onTrackOrderButtonPress}
          />
          <Button
            label="Order Something Else"
            isFullWidth
            variant="transparent"
            marginTop="s"
            onPress={onOrderSomethingElseButtonPress}
          />
        </Animated.View>
      </Box>
    </BottomSheetModal>
  );
};
