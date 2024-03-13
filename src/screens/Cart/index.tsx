import React from 'react';
import {Container, Text, Card} from 'lib_components';
import useActions from './actions';
import {FlatList} from 'react-native';

export const Cart: React.FC = ({}) => {
  const {cartItems} = useActions();

  return (
    <Container isSafeAreaView fullFlex>
      <Container fullFlex alignCenter justifyCenter>
        {(cartItems?.length ?? 0) > 0 ? (
          <FlatList
            data={cartItems}
            renderItem={({item}) => (
              <Container margin={10}>
                <Card
                  title={item?.get('printableId')}
                  // subTitle={item?.brand}
                  images={item?.get('previewImageUrls')}
                  // onPress={handleEditor(item)}
                />
              </Container>
            )}
          />
        ) : (
          <Text>No Items Added</Text>
        )}
      </Container>
    </Container>
  );
};

export default Cart;
