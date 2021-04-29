import { AppBar, Box, Toolbar } from '@material-ui/core';
import React, { ReactNode, VFC } from 'react';

export const Layout: VFC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <AppBar position={'static'}>
        <Toolbar>Nextjs</Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};
