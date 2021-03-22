import { success, failure } from "../../libs/response-lib";

export async function handler(event, context) {
    return success('Testing lambda authorizer');
}