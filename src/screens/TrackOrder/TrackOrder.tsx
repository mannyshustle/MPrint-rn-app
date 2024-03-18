import React from 'react';
import { DeliveryTime } from './DeliveryTime';
import { DeliveryStep } from './DeliveryStep';
import { DriverInformation } from './DriverInformation';
import { Divider, Box, Button } from '@src/components/elements';
import { useExploreStackNavigation } from '@src/hooks';
import { DeliveryMapView } from './DeliveryMapView';

export const TrackOrder = () => {
  const navigation = useExploreStackNavigation();
  const [isMapViewVisible, setIsMapViewVisible] = React.useState(false);

  const onOrderSomethingElseButtonPress = () => {
    navigation.navigate('Explore');
  };

  const onMapViewButtonPress = () => {
    setIsMapViewVisible(!isMapViewVisible);
  };

  return (
    <Box flex={1}>
      <Box flex={1}>
        <Box>
          <DeliveryTime />
          <Divider />
          <DriverInformation />
        </Box>
        {isMapViewVisible ? <DeliveryMapView /> : <DeliveryStep />}
      </Box>
      <Box
        width="100%"
        paddingTop="m"
        paddingHorizontal="m"
        backgroundColor="card">
        <Button
          label={!isMapViewVisible ? 'Map View' : 'Order Status View'}
          isFullWidth
          onPress={onMapViewButtonPress}
        />
        <Button
          label="Cancel your order"
          isFullWidth
          variant="transparent"
          onPress={onOrderSomethingElseButtonPress}
        />
      </Box>
    </Box>
  );
};
