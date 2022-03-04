import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import App from './App';
// require('dotenv').config();

export default function Chat () {
    
    const inputRef = React.createRef();
    const [chatMessages, setChatMessage] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState([]);
    
    // socket io
    // const PORT = process.env.PORT || 7777;
    // const socketUrl = process.env.URLTWO || `localhost:7777`
    // const socketUrl = process.env.URL || `localhost:8000`
    // const socket = io(`${socketUrl}`);
    // const socket = io(`https://awarehouse-staging.herokuapp.com/${process.env.PORT}`);
    // const socket = process.env.NODE_ENV === "development" ? io(`localhost:7777`) : io();
    let socket;

    // useEffect(() => {
    //     socket = io();
    // }, []);

    const onSendMessage = (message) => {
        let temp = [...receivedMessage];
        temp.push(message);
        console.log("onSendMessage");
        setReceivedMessage(temp);
    }
    
    // socket.off("receive-message").on("receive-message",onSendMessage);
    // socket.off("receirve-message", onSendMessage);

    const sendMessage = (e) => {
        socket = io();
        e.preventDefault();
        let temp = [...chatMessages];
        temp.push(inputRef.current.value);
        setChatMessage(temp);
        socket.emit('send-message', inputRef.current.value);
        inputRef.current.value = "";    
        // socket.off("receive-message").on("receive-message",onSendMessage);
        socket.on("receive-message",onSendMessage);
        socket.disconnect("receirve-message");
    }

    // const sendQuery = (e) => {
    //     e.preventDefault();
    //     socket.emit('send-message', "Ask Etienne");
    // }
  
    return (
        <>
        <button onClick={sendMessage}>Send messege</button><br/>
        <input ref={inputRef} type='text' placeholder='Enter message'/>
        {/* <button onClick={sendQuery}>How can I be rich?</button> */}
        <div id='sent-message'>{chatMessages.map((message, index) => <p key={index}>{message}</p>)}</div>
        <div id='received-message'>{receivedMessage.map((message, index) => <p key={index}>{message}</p>)}</div>
        </>
    );
}