import React from 'react';
import {
  Text,
  Button,
  Box,
  Touchable,
  Image,
  Spacer,
  Container,
} from 'lib_components';
import useActions from './actions';
import {FlatList} from 'react-native';
import {IconButton} from './IconButton';

export const Cart: React.FC = ({}) => {
  const {cartItems, onCheckoutPress} = useActions();

  const renderItem = ({item}, index) => {
    const {previewImageUrls, name, id} = item;
    const imageUrl = previewImageUrls?.[previewImageUrls.length - 1];
    return (
      <Touchable key={id}>
        <Box
          marginVertical={'s'}
          marginHorizontal={'m'}
          borderRadius={'m'}
          flex={1}
          backgroundColor={'white'}>
          <Box flexDirection={'row'} flex={1}>
            <Image
              borderTopLeftRadius={'m'}
              borderBottomLeftRadius={'m'}
              height={120}
              width={120}
              source={{uri: imageUrl}}
            />

            <Box justifyContent={'space-between'} flex={1} margin={'m'}>
              <Text fontWeight="bold">{'name'}</Text>
              <Box
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <IconButton iconName="minus" />
                  <Spacer width={16} />
                  <Text fontWeight="bold">{'1'}</Text>
                  <Spacer width={16} />
                  <IconButton iconName="plus" />
                </Box>
                <Box>
                  <Text fontWeight="bold">{'$300'}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Touchable>
    );
  };
  return (
    <Container isSafeAreaView fullFlex>
      <Box flex={1}>
        {(cartItems?.length ?? 0) > 0 ? (
          <FlatList data={cartItems} renderItem={renderItem} />
        ) : (
          <Text>No Items Added</Text>
        )}
      </Box>
      <Box padding={'m'} flexDirection={'row'} justifyContent={'space-between'}>
        <Text fontWeight="bold">Total:</Text>
        <Text fontWeight="bold">$300</Text>
      </Box>
      <Button label="Checkout" margin={'m'} onPress={onCheckoutPress} />
    </Container>
  );
};

export default Cart;
