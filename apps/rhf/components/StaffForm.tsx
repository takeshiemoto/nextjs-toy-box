import { Button, Flex, Input, Td, VStack } from '@chakra-ui/react';
import { VFC } from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';

import { FormType } from '../types';

type Props = {
  control: Control<FormType>;
  parentIndex: number;
  childIndex: number;
};

export const StaffForm: VFC<Props> = ({ control, parentIndex, childIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `schedules.${parentIndex}.rooms.${childIndex}.staffs`,
  });

  const handleAppendClick = () => {
    append({
      name: '',
      from: new Date(),
      to: new Date(),
    });
  };

  const handleRemoveClick = (index: number) => {
    return () => remove(index);
  };

  return (
    <Td w={40}>
      <VStack>
        {fields.map((value, index) => (
          <Flex key={value.id} gridGap={2}>
            <Controller
              control={control}
              name={`schedules.${parentIndex}.rooms.${childIndex}.staffs.${index}.name`}
              render={({ field }) => (
                <Input
                  type={'text'}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name={`schedules.${parentIndex}.rooms.${childIndex}.staffs.${index}.from`}
              render={({ field }) => (
                <Input
                  type={'text'}
                  value={String(field.value)}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name={`schedules.${parentIndex}.rooms.${childIndex}.staffs.${index}.to`}
              render={({ field }) => (
                <Input
                  type={'text'}
                  value={String(field.value)}
                  onChange={field.onChange}
                />
              )}
            />
            <Button
              colorScheme={'pink'}
              size={'sm'}
              onClick={handleRemoveClick(index)}
            >
              削除
            </Button>
          </Flex>
        ))}
        <Button
          colorScheme={'teal'}
          size={'sm'}
          onClick={handleAppendClick}
          isFullWidth
        >
          追加
        </Button>
      </VStack>
    </Td>
  );
};
