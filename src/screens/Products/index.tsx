import React from 'react';
import {Card, Container, Loading} from 'lib_components';
import useActions from './actions';
import {FlatList} from 'react-native';

export const Products: React.FC = () => {
  const {products, handleEditor, isLoadingProducts} = useActions();
  return (
    <Container isSafeAreaView fullFlex>
      {isLoadingProducts ? (
        <Loading full />
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          renderItem={({item}) => (
            <Container fullFlex marginVertical={10}>
              <Card
                title={item?.name}
                coverImage={{uri: item?.images?.[0].src}}
                onPress={handleEditor(item)}
              />
            </Container>
          )}
        />
      )}
    </Container>
  );
};

export default Products;
