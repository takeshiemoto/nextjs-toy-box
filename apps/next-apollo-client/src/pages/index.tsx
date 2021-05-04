import { Box, Typography } from '@material-ui/core';
import React from 'react';

import { useMessageQuery } from '../graphql/generated';
import { useRequireAuth } from '../useRequireAuth';

export function Index() {
  useRequireAuth();

  const { data, loading } = useMessageQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ m: 1 }}>
      {!loading && data && (
        <Typography variant={'body1'}>{data.message}</Typography>
      )}
    </Box>
  );
}

export default Index;
