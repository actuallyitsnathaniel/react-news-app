import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: "https://newsapi.org/v2/",
  headers: {
    Authorization: "17908a11c3c14fba8450fc2d1b9e1135"
  }
});

export const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});
