import React from 'react';
import {FlatList, Image} from 'react-native';
import useActions from './actions';
import {Header} from '../../../../lib/lib-react-native/src/components/Header';
import {Container, Text} from 'lib_components';
import styles from './styles';

export const Categories: React.FC = ({}) => {
  const {
    currentTitle,
    currentLevelCategories,
    isLoadingCategories,
    showBackButton,
    handleBack,
    handleCategoryPress,
  } = useActions();

  return (
    <Container fullFlex backgroundColor="#f9f9f9">
      <Header
        title={currentTitle}
        onBackPress={handleBack}
        showBackButton={showBackButton}
        actions={[
          {
            icon: 'magnify',
          },
        ]}
      />
      <Container fullFlex marginTop={16} backgroundColor="#f9f9f9">
        <FlatList
          data={currentLevelCategories}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Container
              onPress={handleCategoryPress(item)}
              style={styles.itemContainer}>
              <Container style={styles.textContainer}>
                <Text style={styles.text} heading2>
                  {item.name}
                </Text>
              </Container>

              <Container
                style={styles.imageContainer}
                backgroundColor={'yellow'}
              />
              <Image source={{uri: item.image}} style={styles.itemImage} />
            </Container>
          )}
        />
      </Container>
    </Container>
  );
};

export default Categories;
