import http from 'node:http';
import askQuestion from './model.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
})


console.log('\n')
console.log('\n')
console.log('Welcome to the GITHUB CLI');
console.log('--------------------------------------------------------')

server.listen(port, hostname, () => {
    askQuestion();
})