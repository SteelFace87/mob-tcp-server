const ChatRoom = require('./chatroom');
const chatRoom = new ChatRoom;

const net = require('net');

const server = net.createServer(client => {
    const clientObject = { client };
    console.log(client);
    chatRoom.add(clientObject);

    //checking what is in the chat room
  
    console.log('client connected!');
    //what we do with client text
    client.on('data', data => {
  
        if(data.slice(0, 3).toString() === 'all')
        {
            const socketsArray = chatRoom.call();
            const allSockets = socketsArray.map(each=>each.client);
            allSockets.forEach(socket=>socket.write(`sending to all, ${data.slice(3)}`));
         
        }
     
        console.log(data.toString());
        client.write(`ECHO FRO SERVER: ${data}`);
    });
});

module.exports = { server };
