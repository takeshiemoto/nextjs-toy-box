import { Button, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { VFC } from 'react';
import { Control, useFieldArray } from 'react-hook-form';

import { FormType } from '../types';
import { StaffForm } from './StaffForm';
import { TableHeader } from './TableHeader';

type Props = {
  control: Control<FormType>;
  submit: () => Promise<void>;
};

export const Form: VFC<Props> = ({ control, submit }) => {
  const { fields } = useFieldArray({ control, name: 'schedules' });

  return (
    <form onSubmit={submit}>
      <Table>
        <TableHeader />
        <Tbody>
          {fields.map((value, parentIndex) => (
            <Tr key={value.id}>
              <Td width={2}>{value.date}</Td>
              {value.rooms.map((r, childIndex) => (
                <StaffForm
                  key={r.id}
                  control={control}
                  parentIndex={parentIndex}
                  childIndex={childIndex}
                />
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button mt={2} type={'submit'} isFullWidth colorScheme={'teal'}>
        Submit
      </Button>
    </form>
  );
};
