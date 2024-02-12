import React from 'react';
import {Container, Card} from 'lib_components';
import useActions from './actions';
import {FlatList} from 'react-native';
import {printables} from '../../lib/sampleShop';
export const PrintableSelector: React.FC = ({}) => {
  const {navigator} = useActions();
  const handleEditor = item => () => {
    navigator.navigate('Editor', {
      blueprint: item
    });
  };

  return (
    <Container fullFlex margin={20}>
      <FlatList
        data={printables}
        renderItem={({item}) => (
          <Container margin={10}>
            <Card
              title={item?.title}
              subTitle={item?.brand}
              images={item?.images}
              onPress={handleEditor(item)}
            />
          </Container>
        )}
      />
    </Container>
  );
};

export default PrintableSelector;
