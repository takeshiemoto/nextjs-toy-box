import React, { VFC } from 'react';

import { AuthLayout } from '../auth/AuthContext';

const Protected: VFC = () => {
  return <AuthLayout>Protected Page</AuthLayout>;
};

export default Protected;
