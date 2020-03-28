const express = require('express'); //servidor web
const restful = require('node-restful'); //serve para implementar web services de uma forma mais fácil
const server = express(); //startar o server
const mongoose = restful.mongoose;
const bodyParser = require('body-parser');
const cors = require('cors');

//Database
mongoose.Promise = global.Promise; //pegando api de promises do node e associando a api de promises do mongoose, porque a api do mongoose da deprecated, não está sendo mais mantida, para evitar mensagens de advertencia
mongoose.connect('mongodb://db/mydb');

//Middlewares
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cors());

//ODM
const Client = restful.model('Client', {
    name: {type: String, required: true}
});

//Rest API
Client.methods(['get', 'post', 'put', 'delete']);
Client.updateOptions({new: true, runValidators: true});

//Routes
Client.register(server, '/clients');

//Startat Server
server.listen(3000);