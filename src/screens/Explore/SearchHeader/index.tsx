import {Box, TextField} from 'lib_components';
import React from 'react';

export const SearchHeader = () => {
  return (
    <Box backgroundColor="card" padding="s">
      <TextField
        backgroundColor="background"
        leftIcon="search"
        borderWidth={0}
        inputProps={{
          placeholder: 'Find places, dishes, restaurants, etc.',
        }}
      />
    </Box>
  );
};
