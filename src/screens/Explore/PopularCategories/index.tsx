import React from 'react';
import {Dimensions, FlatList} from 'react-native';
import {Box, Image, Text, Touchable} from 'lib_components';
import {useActions} from './actions';

export const PopularCategories: React.FC = () => {
  const {
    popularCategories,
    onCategoryItemPress,
    itemsPerRow,
    isLoadingCategories,
  } = useActions();
  return (
    <Box backgroundColor="card" flexDirection="row" flexWrap="wrap">
      <FlatList
        data={popularCategories}
        keyExtractor={item => item.id}
        numColumns={4}
        renderItem={({item}) => {
          const {id, image, name} = item;
          return (
            <Touchable key={id} onPress={onCategoryItemPress(item)}>
              <Box
                flexDirection="column"
                alignItems="center"
                width={Dimensions.get('window').width / 4}
                borderColor="border"
                borderWidth={1}
                flex={1}
                padding="s">
                <Box>
                  <Image height={50} width={50} source={{uri: image}} />
                </Box>
                <Box>
                  <Text fontWeight="bold">{name}</Text>
                </Box>
              </Box>
            </Touchable>
          );
        }}
      />
    </Box>
  );
};
