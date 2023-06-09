import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from './router';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

var port = 8080;
server.listen(port, () => {
    console.log('Server running on http://localhost:%d/', port);
});

const MONGO_URL = 'mongodb+srv://kevinkdinh14:Ra3xvVNnkWZjM8fh@cluster0.yw0kcme.mongodb.net/?retryWrites=true&w=majority'; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));


app.get('/', function (req, res) {
    res.send("Hello from root application URL");
})




app.use('/', router());