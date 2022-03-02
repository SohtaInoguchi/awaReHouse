import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


export default function Chat () {
    const socket = io('localhost:7777');
    const sendMessage = () => {
        socket.emit('send-message', "TESTING!!!!!!");
    }

    const [chatMessage, setChatMessage] = useState('');

    // const socket = io('http://localhost:3000', {
    //   path: "/socket-path/"
    // });
    // const socket = io('ws://localhost:3001');
    // socket.on("connection");
    
    useEffect(() => {
      socket.on('connect', () => {
        setChatMessage(`Socket id ${socket.id}`);
      });
    }, [])
  
    return (
        <>
        <h1>{chatMessage}</h1>
        <button onClick={sendMessage}>Send</button>
        </>
    );
}