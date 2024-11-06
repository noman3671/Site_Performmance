import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';

// const requirejs = require('requirejs');
const Init = () => {
    Amplify.configure({
        ...amplifyconfig,
        "aws_user_files_s3_bucket": import.meta.env.VITE_REACT_APP_S3_BUCKET,
        "aws_user_files_s3_bucket_region": "us-east-1",
        "aws_cognito_identity_pool_id": import.meta.env.VITE_REACT_APP_IDENTITY_POOL_ID
    });
}

/**
 * @return {import('public/apiGateway-js-sdk/apigClient.js').apigClientFactory}
 */
// eslint-disable-next-line no-undef
// const ApiGateway = apigClientFactory?.newClient({
//     apiKey: "ICNExLiUwH3c9AxGYXQXy73x34iiUWRC14qPJNYz"
// });

export {
    // ApiGateway
}

export default Init;