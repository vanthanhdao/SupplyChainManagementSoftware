import { Connection } from 'typeorm';

export const callStoredProcedure = (
  connection: Connection,
  sp: string,
  params: Record<string, unknown>,
) => {
  const paramsStr = Object.keys(params)
    .map((key, index) => `@${key}=@${index}`)
    .join(', ');

  const queryStr = `EXEC ${sp} ${paramsStr}`;

  return connection.query(queryStr, Object.values(params));
};
