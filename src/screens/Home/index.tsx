import React from 'react';
import {Container, Button, Text, Card} from 'lib_components';
import useActions from './actions';
import {FlatList} from 'react-native';

export const Home: React.FC = ({}) => {
  const {navigator, results, isLoading} = useActions();
  const handleNewOrder = () => {
    navigator.navigate('PrintableSelector');
  };
  console.log(results?.[0].get("imageUrls"))
  return (
    <Container isSafeAreaView fullFlex>
      <Container fullFlex alignCenter justifyCenter>
        {(results?.length ?? 0) > 0 ? (
          <FlatList
            data={results}
            renderItem={({item}) => (
              <Container margin={10}>
                <Card
                  title={"asda"}
                  // subTitle={item?.brand}
                  images={item?.get("imageUrls")}
                  // onPress={handleEditor(item)}
                />
              </Container>
            )}
          />
        ) : (
          <Text>Orders</Text>
        )}
      </Container>
      <Button text="New Order" onPress={handleNewOrder} />
    </Container>
  );
};

export default Home;
