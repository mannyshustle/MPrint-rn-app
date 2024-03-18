import React from 'react';
import {Carousel, Section, Card} from 'lib_components';
import {Dimensions} from 'react-native';
import {CarouselRenderItemInfo} from 'react-native-reanimated-carousel/lib/typescript/types';
import {Product} from 'lib_cloud';
import {useActions} from './actions';

export const PopularProducts: React.FC = () => {
  const {
    popularProducts,
    isLoadingProducts,
    onButtonActionPress,
    onProductPress,
  } = useActions();
  const renderItem = (props: CarouselRenderItemInfo<Product>) => {
    const {images, name} = props.item;
    return (
      <Card
        key={props.index}
        coverImage={{uri: images?.[0]?.src}}
        coverImageSize="m"
        title={name}
        marginLeft="m"
        titleProps={{
          numberOfLines: 1,
        }}
        subTitleProps={{
          numberOfLines: 2,
        }}
        onPress={onProductPress(props.item)}
      />
    );
  };

  return (
    <Section
      title="Popular Products"
      actionButtonText="View more"
      onButtonActionPress={onButtonActionPress}>
      <Carousel
        width={Dimensions.get('window').width}
        height={255}
        numItemsPerSlide={1.2}
        data={popularProducts ?? []}
        snapEnabled
        renderItem={renderItem}
      />
    </Section>
  );
};
