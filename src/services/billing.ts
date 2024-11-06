import { generateClient } from 'aws-amplify/api';
// @ts-ignore
import * as mutations from 'graphql/mutations.ts';
import {
    SaddleCheckoutInput,
    // @ts-ignore
} from "../API.ts";
import AmplifyInit from "aws/aws-api";


AmplifyInit()

const client = generateClient();

export const saddleCheckout = (input: SaddleCheckoutInput) => {
    return client.graphql({
        query: mutations.saddleCheckout,
        variables: { input: input }
    })
}