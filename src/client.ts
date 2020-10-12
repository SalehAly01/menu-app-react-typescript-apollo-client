import { InMemoryCache, ApolloClient } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache();
const link = createUploadLink({ uri: 'http://localhost:3001/' });

const client = new ApolloClient({ cache, link });

export default client;
