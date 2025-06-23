import { Get, Request, Response, Param, EndpointRequest } from '@liqd-js/endpoint';
import { render } from '../instances';

/*
<a href="/">Domov</a>
    <a href="/o-nas">O nas</a>
    <a href="/sluzby">Sluzby</a>
    <a href="/cenova-ponuka">Cenova ponuka</a>
    <a href="/realizacie">Realizacie</a>
    <a href="/referencie">Referencie</a>
    <a href="/faq">FAQ</a>
    <a href="/blog">Blog</a>
    <a href="/kontakt">Kontakt</a>*/

export default class BaseController
{
    @Get('/') public async index( @Request request: EndpointRequest )
    {
        return render(  'Page/Index', request );
    }
    
    @Get('/o-nas') public async about_us( @Request request: EndpointRequest )
    {
        return render( 'Page/About-us', request );
    }

    @Get('/sluzby') public async ( @Request request: EndpointRequest )
    {
        return render( 'Page/Services', request );
    }

    @Get('/cenova-ponuka') public async quote( @Request request: EndpointRequest )
    {
        return render( 'Page/Quote', request );
    }

    @Get('/realizacie') public async portfolio( @Request request: EndpointRequest )
    {
        return render( 'Page/Portfolio', request );
    }

    @Get('/referencie') public async testimonials( @Request request: EndpointRequest )
    {
        return render( 'Page/Testimonials', request );
    }

    @Get('/faq') public async faq( @Request request: EndpointRequest )
    {
        return render( 'Page/FAQ', request );
    }

    @Get('/blog') public async blog( @Request request: EndpointRequest )
    {
        return render( 'Page/Blog', request );
    }

    @Get('/kontakt') public async contact( @Request request: EndpointRequest )
    {
        return render( 'Page/Contact', request );
    }
}