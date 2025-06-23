import 'dotenv/config';

import Endpoint from '@liqd-js/endpoint';

//import SessionMiddleware from './middlewares/session';

import BaseController from './controllers/base';
import DataControler from './controllers/data';

Endpoint.create(
{
    middlewares: [  ],
    controllers: [ DataControler, BaseController ], 
    port: 8080 
});

/*
? - recenzie
X - partneri
X - predajne
? - o nas
? - kotaktujte nas
*/