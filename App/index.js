import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from "react-native";

import { client } from "./graphql/client";
import { TopHeadlines } from "./graphql/queries";
import { ArticleRow } from "./components/ArticleRow";
import HeaderRow from "./components/HeaderRow";

const styles = StyleSheet.create({
  headerText: {
    color: "#ff8d01",
    fontWeight: "bold",
    fontSize: 40,
    paddingHorizontal: 10,
    marginBottom: 25,
    marginTop: 5,
    textAlign: "center"
  },
  button: {
    marginTop: 10,
    marginRight: 10,
    flex: 2
  },
  categoryText: {
    fontSize: 20,
    color: "#000",
    marginLeft: 15
  },
  searchArea: {
    marginRight: 10
  },
  searchText: {
    fontSize: 20,
    color: "#000",
    marginLeft: 15,
    textAlign: "right"
  }
});

class App extends React.Component {
  state = {
    articles: [],
    loading: true,
    search: ""
  };

  componentDidMount() {
    this.requestTopHeadlines();
  }

  requestTopHeadlines() {
    client
      .query({
        query: TopHeadlines,
        // TODO: FIND WAY TO CHANGE THIS!
        variables: { category: "technology" }
      })
      .then(response => {
        console.log("response", response);
        this.setState({
          loading: response.loading,
          articles: response.data.headlines.articles
        });
      })
      .catch(err => {
        console.log("error", err);
      });
  }

  renderFooter = () => {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return null;
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    return (
      <SafeAreaView>
        {/* UPGRADE: Choose from a set of categories! */}
        <HeaderRow>
          {/* <TouchableOpacity style={styles.button}>
            <TextInput
              style={styles.categoryText}
              placeholderTextColor={"#555"}
              borderBottomColor={"#000"}
              placeholder="Search"
              onChangeText={this.updateSearch}
              value={this.state.search}
              returnKeyType={"search"}
              onSubmitEditing={() => {
                this.setState({ search: `${this.value}` });
              }}
            />
          </TouchableOpacity> */}
        </HeaderRow>

        <FlatList
          data={this.state.articles}
          ListHeaderComponent={
            <Text style={styles.headerText}>Top Headlines</Text>
          }
          renderItem={({ item, index }) => (
            <ArticleRow index={index} {...item} />
          )}
          keyExtractor={item => `${item.publishedAt}-${item.title}`}
          ListFooterComponent={this.renderFooter()}
        />
      </SafeAreaView>
    );
  }
}

export default App;
