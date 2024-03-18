import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Animated} from 'react-native';

export const useActions = setIsVisble => {
  const navigator = useNavigation();
  const fadeIn = React.useRef(new Animated.Value(0)).current;
  const fadeOut = React.useRef(new Animated.Value(1)).current;
  const [isAnimationFinished, setIsAnimationFinished] = React.useState(false);
  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: isAnimationFinished ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeOut, {
      toValue: isAnimationFinished ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isAnimationFinished, fadeIn, fadeOut]);

  const onAnimationFinish = () => {
    setIsAnimationFinished(true);
  };

  const onBackdropPress = () => {
    setIsVisble(false);
    setIsAnimationFinished(false);
  };

  const onOrderSomethingElseButtonPress = () => {
    // clearCart();
    setIsVisble(false);
    navigator.navigate('Explore');
  };

  const onTrackOrderButtonPress = () => {
    // clearCart();
    setIsVisble(false);
    navigator.navigate('TrackOrder');
  };

  return {
    isAnimationFinished,
    fadeIn,
    fadeOut,
    onAnimationFinish,
    onBackdropPress,
    onOrderSomethingElseButtonPress,
    onTrackOrderButtonPress,
  };
};
