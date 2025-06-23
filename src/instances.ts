import { EndpointRequest, HTML } from '@liqd-js/endpoint';

const template = new (require('@liqd-js/template'))(
{
    directories: [ __dirname + '/../templates' ], 
    //dictionaries: [ __dirname + '/../i18n/general.json', __dirname + '/../i18n/blog.json' ]
});

export type TemplateOptions = 
{
    scope?: any,
    props?: any,
    locale?: string
};

async function render( name: string, request: EndpointRequest, options: TemplateOptions = {} )
{
    return new HTML( await template.render( name, 
    {
        scope: 
        {
            ...scope,
            ...options.scope
        },
        props: options.props,
        locale: options.locale || 'sk'
    }));
}

const scope = 
{
    format: 
    {
        price: ( value: number, currency: string, precise: boolean = false ) => Intl.NumberFormat( 'sk-SK', { style: 'currency', currency, minimumFractionDigits: precise || value !== Math.round( value ) ? 2 : 0, maximumFractionDigits: 2 }).format( value ),
        day: ( date: Date ) => Intl.DateTimeFormat( 'sk-SK', { weekday: 'long' }).format( date ),
        shortdate: ( date: Date ) => Intl.DateTimeFormat( 'sk-SK', { month: 'long', day: 'numeric' }).format( date )
    },
    time:
    {
        weekday: ( date: Date ) =>
        {
            return ( date.getDay() + 6 ) % 7;
        },
        workdays_to_days: ( workdays: number, office_hours: number, from: Date ) =>
        {
            let date = new Date( from ), day = scope.time.weekday( date ), days;

            ( office_hours && office_hours <= date.getHours() && day < 5 ) && ++workdays;
            (( workdays -= ( days = Math.min( workdays, ( 4 - day )))) !== 0 ) && ( days += workdays + Math.ceil( Math.max( 0, workdays ) / 5 ) * 2 - ( day === 6 ? 1 : 0 ));

            return days;
        },
        date_after_workdays: ( workdays: number, office_hours: number, from: Date ) =>
        {
            let date = new Date( from );
            date.setDate( date.getDate() + scope.time.workdays_to_days( workdays, office_hours, from ));

            return date;
        },
        age: ( date: Date ) =>
        {
            let now = new Date();

            const locale = 'sk';
            const days = Math.floor(( now.getTime() - date.getTime()) / 86400000 );
            const months = now.getFullYear() * 12 + now.getMonth() - date.getFullYear() * 12 - date.getMonth();

            if( days < 1 )
            {
                return { 'sk': 'dnes', 'cs': 'dnes', 'de': 'heute', 'en': 'today' }[ locale ];
            }
            else if( days === 1 )
            {
                return { 'sk': 'včera', 'cs': 'včera', 'de': 'gestern', 'en': 'yesterday' }[ locale ];
            }
            else if( days < 7 )
            {
                return { 'sk': 'pred ' + days + ' dňami', 'cs': 'před ' + days + ' dny', 'de': 'vor ' + days + ' Tagen', 'en': days + ' days ago' }[ locale ];
            }
            else if( days < 14 )
            {
                return { 'sk': 'minulý týždeň', 'cs': 'minulý týden', 'de': 'letzte Woche', 'en': 'last week' }[ locale ];
            }
            else if( days < 21 )
            {
                return { 'sk': 'pred 2 týždňami', 'cs': 'před 2 týdny', 'de': 'vor 2 Wochen', 'en': '2 weeks ago' }[ locale ];
            }
            else if( days < 28 )
            {
                return { 'sk': 'pred 3 týždňami', 'cs': 'před 3 týdny', 'de': 'vor 3 Wochen', 'en': '3 weeks ago' }[ locale ];
            }
            else if( months < 2 )
            {
                return { 'sk': 'minulý mesiac', 'cs': 'minulý měsíc', 'de': 'letzten Monat', 'en': 'last month' }[ locale ];
            }
            else
            {
                return { 'sk': 'pred ' + months + ' mesiacmi', 'cs': 'před ' + months + ' měsíci', 'de': 'vor ' + months + ' Monaten', 'en': months + ' months ago' }[ locale ];
            }
        }
    }
}

export {render, scope }