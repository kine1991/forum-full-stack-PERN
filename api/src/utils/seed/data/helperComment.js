// const topics = JSON.parse(fs.readFileSync(path.join(path.join(__dirname, '/data/comments.json')), 'utf-8'));
import path from 'path';
import fs from 'fs';

const aa = fs.readFileSync(path.join(path.join(__dirname, 'comments.json')), 'utf-8')

console.log('aa', aa)