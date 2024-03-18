import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import { StepIndicatorStyles } from 'react-native-step-indicator/lib/typescript/src/types';
import { fontSize, useAppTheme } from '@src/theme';
import { Box } from '@src/components';

const labels = [
  'Order submitted',
  'Order confirmed',
  'Preparing your order',
  'Order is ready at the restaurant',
  'Driver is picking up your order',
  'Order completed',
];

export const DeliveryStep = () => {
  const { colors } = useAppTheme();

  const stepIndicatorStyles: StepIndicatorStyles = {
    stepStrokeCurrentColor: colors.primary,
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.secondary,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: colors.border,
    stepIndicatorCurrentColor: colors.background,
    stepIndicatorLabelFontSize: fontSize.s,
    currentStepIndicatorLabelFontSize: fontSize.s,
    stepIndicatorLabelCurrentColor: colors.text,
    stepIndicatorLabelFinishedColor: 'white',
    stepIndicatorLabelUnFinishedColor: colors.text,
    labelColor: colors.text,
    labelAlign: 'flex-start',
    currentStepLabelColor: colors.primary,
    labelSize: fontSize.m,
  };

  return (
    <Box paddingHorizontal="m" flex={1}>
      <StepIndicator
        customStyles={stepIndicatorStyles}
        currentPosition={2}
        labels={labels}
        direction="vertical"
        stepCount={labels.length}
      />
    </Box>
  );
};
