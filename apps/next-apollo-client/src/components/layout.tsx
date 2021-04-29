import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import React, { ReactNode, VFC } from 'react';

export const Layout: VFC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <AppBar position={'static'}>
        <Toolbar>
          <Typography variant={'h6'} sx={{ flexGrow: 1 }}>
            NextJS Prisma
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};
