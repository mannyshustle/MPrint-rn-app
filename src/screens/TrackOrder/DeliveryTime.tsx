import React from 'react';
import { Box, Text } from '@src/components';

export const DeliveryTime = () => {
  return (
    <Box
      backgroundColor="card"
      justifyContent="center"
      alignItems="center"
      paddingVertical="s">
      <Text variant="secondary">Estimated Delivery Time</Text>
      <Text variant="subHeader" color="primary" marginTop="s">
        04:14 PM
      </Text>
    </Box>
  );
};
