import http from 'node:http';
import readline from 'readline';
import displayLogsForUser from './model.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Welcome to the GITHUB CLI');
console.log('---------------------------')

server.listen(port, hostname, () => {
    rl.question('Input the username you want to check: ', (name) => {
        console.log("\n")
        displayLogsForUser(name);
    });
})