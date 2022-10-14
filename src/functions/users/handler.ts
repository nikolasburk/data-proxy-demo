import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { PrismaClient } from "@prisma/client";

// GET https://168ca0bo4a.execute-api.us-east-1.amazonaws.com/dev/users?name=nikolas
// note: this request works without any prisma code, trying deploy with prismaclient instantiation but without query
// -> instantiating PrismaClient creates an internal server error,

// logs: https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Faws-node-typescript-dev-users
console.log(`Instantiating PrismaClient outside handler ...`);
const prisma = new PrismaClient({
  log: ['info']
});

const users = async (event) => {
  // if (!event.queryStringParameters || !event.queryStringParameters.name) {
  //   return formatJSONResponse({
  //     message: `No name provided`,
  //   });
  // }
  const name = event.queryStringParameters && event.queryStringParameters.name ? event.queryStringParameters.name : null
  const user = await prisma.user.create({
    data: {
      name,
    },
  });
  console.log(`Created user ${user.name || 'without a name'}`);

  const userCount = await prisma.user.count();
  console.log(`There are ${userCount} users in the database`);

  return formatJSONResponse({
    message: `Created user ${user.name || 'without a name'}. There are ${userCount} users in the database.`,
    // event,
  });
};

export const main = middyfy(users);
