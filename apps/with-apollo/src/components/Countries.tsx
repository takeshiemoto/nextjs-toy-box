import { gql, useQuery } from '@apollo/client';
import React, { VFC } from 'react';

const QUERY = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

type Countries = { code: string; name: string; emoji: string };

export const Countries: VFC = () => {
  const { data, loading, error } = useQuery<{ countries: Countries[] }>(QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return null;
  }
  return (
    <div>
      <ul>
        {data.countries.map((c) => (
          <li key={c.code}>
            <div>
              {c.emoji} {c.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
