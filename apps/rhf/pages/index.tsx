import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { defaultValues } from '../api/data';
import { Form } from '../components/Form';
import { FormType } from '../types';

export function Index() {
  const { control, handleSubmit } = useForm<FormType>({ defaultValues });
  const [result, setResults] = useState<FormType | undefined>(undefined);

  const onValid: SubmitHandler<FormType> = (data) => {
    setResults(data);
  };

  const onInvalid: SubmitErrorHandler<FormType> = () => {
    console.log('error');
  };

  const submit = handleSubmit(onValid, onInvalid);

  return (
    <Box p={2}>
      <Form control={control} submit={submit} />
      <Box p={2}>{JSON.stringify(result)}</Box>
    </Box>
  );
}

export default Index;
