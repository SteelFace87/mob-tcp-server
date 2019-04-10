const net = require('net');
const readline = require('readline');



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '($)',

});

const client = net.createConnection(9990, 'localhost', () => {
    console.log('client connected');
    rl.prompt();
    rl.on('line', line => {

        if(line.charAt(0) != '@'){
            rl.prompt();
        }
      
        if(line.charAt(0) === '@') 
        {
            client.write(line.slice(1));
            rl.prompt();
        }
    });
});

client.on('data', data => {
    console.log(`${data.toString()}`);
    rl.prompt();
});

