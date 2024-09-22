import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import React, { useContext, useRef, useState } from 'react'
import { SocketContext } from "../SocketContect";


const index = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Sujit Paul', message: 'hii', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 2, sender: 'Sujit Paul', message: 'hi this is urgent task', date: '18/07/2024', senderType: 'user' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
        { id: 3, sender: 'Sudipta', message: 'ok', date: '18/07/2024', senderType: 'doer' },
    ]);

    const scrollViewRef = useRef();


    const { socket } = useContext(SocketContext);




    const [inputMessage, setInputMessage] = useState('');

    const handleSend = () => {
        if (inputMessage.trim()) {
            const newMessage = {
                id: messages.length + 1,
                sender: 'Sudipta',
                message: inputMessage,
                date: 'Today', // This would be dynamically set
                senderType: 'doer',
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');
        }
        socket.emit("sendMessage", {
            taskId: "data.id",
            data: "msgData.message",
            position: "Tab",
        });
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content" // Controls the text color (dark or light)
                backgroundColor="#E0F7FA" // Set your preferred background color
            />
            <View style={styles.header}>
            </View>
            {/* Scrollable Messages Section */}
            <ScrollView style={styles.scrollableSection} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
                {messages.map((message, index) => (
                    <View key={index} style={[styles.messageContainer, message.senderType === 'user' ? styles.userMessage : styles.doerMessage]}>
                        <Text style={styles.sender}>{message.sender}</Text>
                        <View style={styles.messageBubble}>
                            <Text style={styles.messageText}>{message.message}</Text>
                        </View>
                        <Text style={styles.messageDate}>{message.date}</Text>
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
}

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
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    priority: {
        color: 'red',
        marginTop: 5,
    },
    scrollableSection: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    messageContainer: {
        marginBottom: 10,
        maxWidth: '80%',
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

export default index