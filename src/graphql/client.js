import ApolloClient from 'apollo-client';
import { gql } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://react-music-player.hasura.app/v1/graphql',

    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          'x-hasura-admin-secret': process.env.REACT_APP_HASURA_SECRET,
        },
      },
    },
  }),
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Song {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    input SongInput {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    type Query {
      queuedSongs: [Song]!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,
});

const data = {
  queuedSongs: [],
};

client.writeData({ data });

export default client;

// import ApolloClient from 'apollo-boost';

// const client = new ApolloClient({
//   uri: 'https://react-music-player.hasura.app/v1/graphql',
//   headers: {
//     'x-hasura-admin-secret': process.env.REACT_APP_HASURA_SECRET,
//   },
// });
