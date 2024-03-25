import React from 'react';
import useActions from './actions';
import {Container, Gallery} from 'lib_components';

export const ImageGallery: React.FC = ({}) => {
  const {imageUrls} = useActions();
  return (
    <Container fullFlex backgroundColor="#f9f9f9">
      <Gallery imagesUrls={imageUrls} />
    </Container>
  );
};

export default ImageGallery;
