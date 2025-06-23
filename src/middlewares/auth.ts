import { EndpointRequest, EndpointResponse, Middleware } from '@liqd-js/endpoint';

export default new class AuthMiddleware extends Middleware
{
    public useCallback( request: EndpointRequest, response: EndpointResponse, next: () => void )
    {
        console.log('auth');

        //req.user = { id: 1, name: 'Lucullus' };

        next();
    }
}