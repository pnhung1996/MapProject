/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapViews from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

import data from './data/data';

const BOT = "Bot";
const USER = "User"
const CHAT_GUESS_COLOR = "rgb(113,134,199)";
const CHAT_OWNER_COLOR = "rgb(255,255,255)";
const BACKGROUND = "rgb(241,244,253)";

function createMessage({ textInput, setTextInput = null, setConversation = null, sender, conversation, setDisplayButtonSend = null }) {
  if (textInput === "" || textInput === null) {
    return;
  }
  const id = new Date();
  const newMessage = {
    client_id: 123,
    id: id,
    sender: sender,
    content: textInput
  };
  if (setTextInput !== null && setConversation !== null && setDisplayButtonSend !== null) {
    setTextInput("");
    setDisplayButtonSend(false);
    setConversation([...conversation, newMessage]);
  }
}

function ChatMessage({ item }) {
  const backgroundColor = item.sender === "Bot" ? CHAT_GUESS_COLOR : CHAT_OWNER_COLOR;
  const textColor = item.sender === "Bot" ? CHAT_OWNER_COLOR : CHAT_GUESS_COLOR;
  const alignSelf = item.sender === "Bot" ? 'flex-start' : 'flex-end';
  return (
    <View style={[styles.chatMessageContainer,
    {
      backgroundColor: backgroundColor,
      alignSelf: alignSelf,
    }]}>
      <Text style={{ color: textColor }}>{item.content}</Text>
    </View>
  )
}

function App() {
  const [textInput, setTextInput] = useState("");
  const [conversation, setConversation] = useState(data);
  const [displayButtonSend, setDisplayButtonSend] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ backgroundColor: CHAT_GUESS_COLOR, width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('./images/robot.png')} style={{ width: 40, height: 40, resizeMode: 'cover', tintColor: "#ffffff" }} />
        </View>
        <FlatList style={styles.chatContainer}
          data={conversation}
          renderItem={({ item }) => ChatMessage({ item })}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={<View style={{ height: 40, width: '100%' }}></View>}
          scrollsToTop={false}>
        </FlatList>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInputStyle}
            multiline={true}
            maxLength={500}
            placeholder="Aa"
            onChangeText={text => {
              setTextInput(text);
              setDisplayButtonSend(text !== "" && text !== null)
            }}
            value={textInput}
          />
          {displayButtonSend ?
            <Ionicons
              name='ios-send-sharp'
              size={25}
              color={CHAT_GUESS_COLOR}
              onPress={() => {
                const sender = USER;
                createMessage({
                  textInput,
                  setTextInput,
                  setConversation,
                  sender,
                  conversation,
                  setDisplayButtonSend
                });
              }} />
            : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: "#ffffff",
  },
  chatContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: BACKGROUND,
    flexDirection: 'column',
    padding: 10,
  },
  chatMessageContainer: {
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    borderColor: CHAT_GUESS_COLOR,
    borderWidth: 1,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 10,
  },
  textInputContainer: {
    width: '100%',
    height: 55,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: BACKGROUND,
    alignItems: 'center'
  },
  textInputStyle: {
    flex: 1,
    height: '100%',
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 5,
    marginLeft: 10,
    marginRight: 10
  }
});

export default App;
