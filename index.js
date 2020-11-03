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

app.get('/estado', (req, res) => {
    request({
        url: 'http://172.105.20.118:8080'
    }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
            return res.status(500).json({
                type: 'error',
                message: err.message
            });
        }
        res.json(JSON.parse(body));
    })
});

//proxy para cuando se une al juego 
app.get('/join', (req, res) => {
    request({
        url: 'http://172.105.20.118:8080/join'
    }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
            return res.status(500).json({
                type: 'error',
                message: err.message
            });
        }

        res.json(JSON.parse(body));
        console.log('join');
    })
})

app.get('/leave', (req, res) => {
    request({
        url: 'http://172.105.20.118:8080/leave'
    }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
            return res.status(500).json({
                type: 'error',
                message: err.message
            });
        }

        res.json(JSON.parse(body));
        console.log('leave');
    })
})

app.get('/puesto', (req, res) => {
    request({
        url: 'http://172.105.20.118:8080/puesto'
    }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
            return res.status(500).json({
                type: 'error',
                message: err.message
            });
        }

        res.json(JSON.parse(body));
    })
})

app.get('/hit', (req, res) => {
    request({
        url: 'http://172.105.20.118:8080/hit'
    }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
            return res.status(500).json({
                type: 'error',
                message: err.message
            });
        }

        res.json(JSON.parse(body));
        console.log('hit');
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});