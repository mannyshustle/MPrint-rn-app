import React from 'react';
import {Container, Button, Text, Card} from 'lib_components';
import useActions from './actions';
import {FlatList} from 'react-native';

export const Orders: React.FC = ({}) => {
  const {orders} = useActions();

  return (
    <Container isSafeAreaView fullFlex>
      <Container fullFlex alignCenter justifyCenter>
        {(orders?.length ?? 0) > 0 ? (
          <FlatList
            data={orders}
            renderItem={({item}) => (
              <Container margin={10}>
                <Card
                  title={item?.get('printableId')}
                  // subTitle={item?.brand}
                  images={item?.get('imageUrls')}
                  // onPress={handleEditor(item)}
                />
              </Container>
            )}
          />
        ) : (
          <Text>Orders</Text>
        )}
      </Container>
    </Container>
  );
};

export default Orders;
