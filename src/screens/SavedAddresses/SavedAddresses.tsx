import React from 'react';
import { Box, Section, Divider, Icon, ListRowItem } from '@src/components';
import { ScrollView } from 'react-native-gesture-handler';
import { favoriteAddresses } from '@src/data/mock-address';
import { useExploreStackNavigation } from '@src/hooks';

export const SavedAddresses = () => {
  const navigation = useExploreStackNavigation();

  const addAddressItemPress = () => {
    navigation.navigate('AddAddress');
  };

  return (
    <ScrollView>
      <Section title="Favorites" hasDivider={false}>
        <Box>
          {favoriteAddresses.map((item, index) => {
            const { id, name, description, isHome, isWork } = item;
            let leftElement;
            if (isHome) {
              leftElement = <Icon name="home" />;
            } else if (isWork) {
              leftElement = <Icon name="briefcase" />;
            }
            return (
              <Box key={index}>
                <ListRowItem
                  id={id}
                  title={name}
                  subTitle={description}
                  leftElement={leftElement}
                />
                <Divider />
              </Box>
            );
          })}
          <ListRowItem
            title="Add an Address"
            subTitle="Save your favourite places"
            onPress={addAddressItemPress}
          />
        </Box>
      </Section>
    </ScrollView>
  );
};
