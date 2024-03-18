import React from 'react';
import {Box, Icon, Touchable} from 'lib_components';
import {palette} from 'lib_theme';

interface IconButtonProps {
  iconName: string;
}
export const IconButton = ({iconName}: IconButtonProps) => {
  return (
    <Touchable>
      <Box
        shadowColor={'black'}
        shadowOffset={{width: 0, height: 4}}
        shadowOpacity={0.2}
        shadowRadius={8}
        elevation={5}
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColor={'white'}
        height={40}
        width={40}
        borderRadius={'l'}>
        <Icon size={20} name={iconName} color={palette.gray[400]} />
      </Box>
    </Touchable>
  );
};
