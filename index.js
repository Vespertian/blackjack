import express from 'express';
import request from 'request';

const app = express();

const port = 8000;

app.use(express.static(__dirname + '/public'))

//proxy para  que cors no moleste
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});