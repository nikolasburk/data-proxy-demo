import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

// curl -X POST https://8gxsev37xe.execute-api.us-east-1.amazonaws.com/dev/hello -H "Content-Type: application/json" -d '{"name":"Nikolas"}'

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    // event,
  });
};

export const main = middyfy(hello);
