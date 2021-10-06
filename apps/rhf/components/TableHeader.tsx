import { Th, Thead, Tr } from '@chakra-ui/react';
import { VFC } from 'react';

export const TableHeader: VFC = () => {
  const rooms = ['部屋A', '部屋B'];
  return (
    <Thead>
      <Tr>
        <Th>日付</Th>
        {rooms.map((value) => (
          <Th key={value}>{value}</Th>
        ))}
      </Tr>
    </Thead>
  );
};
