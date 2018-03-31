import React from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  TextInput,
  StyleSheet,
  Text,
  View
} from "react-native";

class Translation extends React.Component {
  render() {
    return (
      <Text style={{ paddingBottom: 20, color: "#fff", fontStyle: "italic" }}>
        {this.props.value}
      </Text>
    );
  }
}

export default class Translator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      from: "cebuano",
      to: "english",
      translation: "",
      type: "",
      loading: false
    };
  }
  onSubmit = () => {
    if (!this.state.query) {
      return Alert.alert("Oops!", "Type a word to translate", [
        { text: "OK", onPress: () => console.log("OK pressed") }
      ]);
    }
    this.textInput.clear();
    this.setState({ loading: true });
    return fetch(
      `http://192.168.254.114:8000/api/translate/${this.state.from}/${
        this.state.to
      }/${this.state.query}`,
      {
        method: "POST"
      }
    )
      .then(res => res.json())
      .then(data => {
        if (!data.translation) {
          return this.setState({
            translation: data.data,
            type: null,
            query: "",
            loading: false
          });
        }
        return this.setState({
          translation: data.translation,
          type: data.type,
          query: "",
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const Loader = props => {
      const { loading } = props;
      return (
        <ActivityIndicator size="large" color="#fff" animating={loading} />
      );
    };
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: "steelblue",
          justifyContent: "center"
        }}
      >
        <TextInput
          style={{
            height: 60,
            color: "#fff"
          }}
          ref={input => {
            this.textInput = input;
          }}
          underlineColorAndroid={"transparent"}
          placeholder="Type a word to translate"
          onChangeText={query => this.setState({ query })}
        />
        <Button
          onPress={this.onSubmit}
          title="Translate"
          accessibilityLabel="Learn more about this purple button"
        />
        <View style={{ paddingTop: 40 }}>
          <Loader loading={this.state.loading} />
          <Text style={{ paddingBottom: 10, fontSize: 20, color: "#fff" }}>
            Translation:{" "}
          </Text>
          <Translation value={this.state.translation} />
          <Text style={{ paddingBottom: 10, fontSize: 20, color: "#fff" }}>
            Type:{" "}
          </Text>
          <Translation value={this.state.type} />
        </View>
      </View>
    );
  }
}
