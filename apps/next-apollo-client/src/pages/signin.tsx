import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useJwt } from '../auth';
import { useSignInMutation } from '../graphql/generated';

type FormType = { email: string; password: string };

const SignIn = () => {
  const router = useRouter();
  const { setToken, token } = useJwt();
  const [singIn] = useSignInMutation();

  useEffect(() => {
    if (token) {
      router.push('/');
      return;
    }
  }, [router, token]);

  const { handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
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
      setToken(result.data.signIn.token);
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
    </Box>
  );
};

export default SignIn;
