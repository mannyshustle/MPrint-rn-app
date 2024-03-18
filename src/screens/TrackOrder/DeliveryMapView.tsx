import React from 'react';
import MapBox, {
  PROVIDER_GOOGLE,
  Marker,
  MarkerDragStartEndEvent,
  Region,
  Polyline,
} from 'react-native-maps';
import styles from './TrackOrder.style';
import { useAppTheme } from '@src/theme';
import { googleMapDarkModeStyles } from '@src/utils';
import { Box, Image } from '@src/components';

export const DeliveryMapView = () => {
  const { colors, colorScheme } = useAppTheme();
  const [currentLocation, setCurrentLocation] = React.useState<Region>({
    longitude: -122.406417,
    latitude: 37.785834,
    longitudeDelta: 0.0022,
    latitudeDelta: 0.0031,
  });

  const onRegionChangeComplete = (region: Region) => {
    setCurrentLocation(region);
  };

  const onMapBoxPress = (event: MarkerDragStartEndEvent) => {
    const {
      nativeEvent: { coordinate },
    } = event;

    console.log('_onMapBoxPress -> coordinate', coordinate);
  };

  return (
    <Box height="100%">
      <MapBox
        loadingEnabled
        cacheEnabled
        loadingIndicatorColor="black"
        loadingBackgroundColor="black"
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        customMapStyle={
          colorScheme === 'dark' ? googleMapDarkModeStyles : undefined
        }
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={onMapBoxPress}
        region={currentLocation}>
        <Marker
          coordinate={{
            longitude: -122.406417,
            latitude: 37.785834,
          }}>
          <Box backgroundColor="white" borderRadius="xxxl">
            <Image
              source={require('@src/assets/drivers/location.png')}
              width={28}
              height={28}
            />
          </Box>
        </Marker>
        <Marker
          coordinate={{
            ...currentLocation,
            longitude: -122.40755639970303,
            latitude: 37.78638161404493,
          }}>
          <Box backgroundColor="white" borderRadius="xxxl" padding="s">
            <Image
              source={require('@src/assets/drivers/driver-marker.png')}
              width={28}
              height={28}
            />
          </Box>
        </Marker>
        <Polyline
          lineDashPattern={[3, 3, 3, 3]}
          coordinates={[
            { latitude: 37.78651041289761, longitude: -122.40747157484294 },
            { latitude: 37.78662062947493, longitude: -122.406404055655 },
            { latitude: 37.78569323533935, longitude: -122.40623038262129 },
            {
              latitude: 37.785834,
              longitude: -122.406417,
            },
          ]}
          strokeColor={colors.primary}
          strokeWidth={2}
        />
      </MapBox>
    </Box>
  );
};
