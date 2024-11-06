import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { fetchAuthSession } from 'aws-amplify/auth';

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_REACT_APP_APPSYNC_GRAPHQL_ENDPOINT
});

const authLink = setContext(async (_, { headers }) => {
    try {
        const { tokens } = await fetchAuthSession();
        const token = tokens?.idToken?.toString();

        return {
                headers: token ? {
                  ...headers,
                  authorization: token ? token : '',
                }
                :
                 {
                    ...headers,
                    'x-api-key': import.meta.env.VITE_REACT_APP_GRAPHQL_API_KEY,
                  }
                ,
              };

    } catch (error) {
        console.error("Error in auth context link:", error);
    }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: import.meta.env.NODE_ENV !== 'production'
});

export default client;
