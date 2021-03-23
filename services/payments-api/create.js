import uuid from "uuid";
import dynamoDb from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  console.log(data);
  console.log('----------');
  console.log(event);
  console.log(context);
  const params = {
    TableName: process.env.tableName,
    Item: {
      // Pegar o userID do Cognito
      userId: event.requestContext.authorizer.principalId,
      paymentId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDb.put(params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
