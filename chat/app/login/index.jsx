import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { io } from "socket.io-client";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const index = () => {
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef();
    const { code } = useLocalSearchParams();
    const [inputMessage, setInputMessage] = useState('');

    const socket = useMemo(() => io('https://chat-backend-32lj.onrender.com'), [])
    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('newUser', { code: code })
        })
        socket.on("recive", (data) => {
            if (data.code == code) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        })
        return () => {
            socket.disconnect()
        }

    }, []);


    useEffect(() => {
        (async () => {
          if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
              name: 'default',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: '#FF231F7C',
            });
          }
        })();
      }, []);






    // Handle sending a message
    const handleSend = async () => {
        // console.log("trigger");

        // await Notifications.scheduleNotificationAsync({
        //     content: {
        //       title: 'Hello!',
        //       body: 'This is a local notification!',
        //     },
        //     trigger: { seconds: 1 },
        //   });

        if (!inputMessage.trim()) return;
        socket.emit("message", { data: inputMessage, socketid: socket.id, code: code });
        setInputMessage('');
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#E0F7FA"
            />
            <View style={styles.header}>
            </View>

            {/* Scrollable Messages Section */}
            <ScrollView
                style={styles.scrollableSection}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.map((message, index) => (
                    <View key={index} style={[styles.messageContainer, message.socketid !== socket.id ? styles.userMessage : styles.doerMessage]}>
                        <View style={styles.messageBubble}>
                            <Text style={styles.messageText}>{message.data}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Input Section */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type something here..."
                        value={inputMessage}
                        onChangeText={setInputMessage}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#E0F7FA',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    scrollableSection: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    messageContainer: {
        marginBottom: 10,
        maxWidth: '80%',
        paddingVertical: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
    },
    doerMessage: {
        alignSelf: 'flex-start',
    },
    sender: {
        fontWeight: 'bold',
        marginBottom: 2,
    },
    messageBubble: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
    },
    messageText: {
        fontSize: 16,
    },
    messageDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
    inputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#6200EE',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default index;
