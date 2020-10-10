import { InMemoryCache, HttpLink, ApolloClient } from '@apollo/client';

const cache = new InMemoryCache();
const link = new HttpLink({ uri: 'http://localhost:3001/' });

const client = new ApolloClient({ cache, link });

export default client;
