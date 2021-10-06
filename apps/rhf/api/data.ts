import { v4 as uuid } from 'uuid';

import { FormType } from '../types';

export const defaultValues: FormType = {
  schedules: [
    {
      id: uuid(),
      date: '2021-10-01',
      rooms: [
        {
          id: uuid(),
          name: '部屋A',
          staffs: [
            {
              id: uuid(),
              name: 'emo',
              from: new Date(),
              to: new Date(),
            },
          ],
        },
        {
          id: uuid(),
          name: '部屋B',
          staffs: [],
        },
      ],
    },
    {
      id: uuid(),
      date: '2021-10-02',
      rooms: [
        {
          id: uuid(),
          name: '部屋A',
          staffs: [],
        },
        {
          id: uuid(),
          name: '部屋B',
          staffs: [],
        },
      ],
    },
    {
      id: uuid(),
      date: '2021-10-03',
      rooms: [
        {
          id: uuid(),
          name: '部屋A',
          staffs: [],
        },
        {
          id: uuid(),
          name: '部屋B',
          staffs: [],
        },
      ],
    },
    {
      id: uuid(),
      date: '2021-10-04',
      rooms: [
        {
          id: uuid(),
          name: '部屋A',
          staffs: [],
        },
        {
          id: uuid(),
          name: '部屋B',
          staffs: [],
        },
      ],
    },
  ],
};
