import fs from 'fs';
import { EndpointResponse, Get, Path, Response } from '@liqd-js/endpoint';

const MIME: any = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'application/x-font-ttf', '.otf': 'application/x-font-opentype', '.woff': 'application/font-woff', '.woff2': 'application/font-woff2' };

export default class DataController
{
    @Get('/data/**') public async data( @Path path: string, @Response response: EndpointResponse )
    {
        console.log( __dirname + '/../..' +  path );

        if( fs.existsSync( __dirname + '/../..' +  path ))
        {
            response.writeHead( 200, 
            {
                'Content-Type': MIME[ path.match( /(\.\w+)$/ )![1] ],
                'Cache-Control': 'public, max-age=604800',
                'Expires': new Date(Date.now() + 604800000).toUTCString()
            });
            
            fs.createReadStream( __dirname + '/../..' + path ).pipe( response );
        }
        else
        {
            response.writeHead( 404, { 'Content-Type': 'text/plain' }).end( 'Not found' );
        }
        
        return response;
    }
}