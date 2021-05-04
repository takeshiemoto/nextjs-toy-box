import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useJwt } from '../auth';
import { useSignInMutation } from '../graphql/generated';
import { useNoAuth } from '../useNoAuth';

type FormType = { email: string; password: string };

const SignIn = () => {
  useNoAuth();

  const [singIn] = useSignInMutation();
  const { setJwt, jwt } = useJwt();

  const { handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      email: 'takeshi.emoto@jointcrew.co.jp',
      password: 'helloworld',
    },
  });

  const submit = handleSubmit(async ({ email, password }: FormType) => {
    try {
      const result = await singIn({
        variables: {
          email,
          password,
        },
      });
      setJwt({
        token: result.data.signIn.token,
        expiry: result.data.signIn.tokenExpiry,
      });
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
        flexDirection: 'column',
      }}
    >
      <Card sx={{ width: 500 }}>
        <CardContent>
          <Typography variant={'h6'} sx={{ textAlign: 'center' }}>
            Sign In
          </Typography>
          <Box component={'form'} onSubmit={submit}>
            <Box sx={{ mt: 3 }}>
              <Controller
                name={'email'}
                control={control}
                render={({ field }) => (
                  <TextField
                    variant={'outlined'}
                    size={'small'}
                    placeholder={'Email'}
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Controller
                name={'password'}
                control={control}
                render={({ field }) => (
                  <TextField
                    autoComplete={'on'}
                    variant={'outlined'}
                    size={'small'}
                    placeholder={'Password'}
                    type={'password'}
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button
                color={'primary'}
                variant={'contained'}
                type={'submit'}
                fullWidth
              >
                Sing In
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      {jwt && (
        <Box sx={{ width: 500, my: 2, overflow: 'scroll' }}>{jwt.token}</Box>
      )}
      {jwt && <Box sx={{ width: 500, my: 1 }}>{jwt.expiry}</Box>}
    </Box>
  );
};

export default SignIn;
