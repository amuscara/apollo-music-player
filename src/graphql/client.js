import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://react-music-player.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_SECRET,
  },
});

export default client;
