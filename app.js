const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// Flujos de pago
const flowPagoGeneral = (plataforma) => 
    addKeyword(['Pagar', 'pagar']).addAnswer(
        [
            `Metodos de pago disponibles para *${plataforma}*:`,
            '1. Id de Binance: 972117263',
            '2. Paypal',
            '3. Link Stripe',
            '\nPor favor, realice el pago y envie un *captura* o *comprobante* del mismo aqui.',
            'En pocos minutos estaremos procesando su solicitud y enviandole los detalles de su cuenta.',
        ]
    )

// Flujos para cada plataforma
const flowNetflix = addKeyword(['Netflix', 'netflix']).addAnswer(
    [
        'La cuenta de Netflix tiene un valor de $3.5.',
        'Escriba *Pagar* para recibir los metodos de pago.',
    ],
    null,
    null,
    [flowPagoGeneral('Netflix')]
)

const flowMax = addKeyword(['Max', 'max']).addAnswer(
    [
        'La cuenta de Max tiene un valor de $3.0.',
        'Escriba *Pagar* para recibir los metodos de pago.',
    ],
    null,
    null,
    [flowPagoGeneral('Max')]
)

const flowPrimeVideo = addKeyword(['PrimeVideo', 'primevideo', 'Prime', 'prime']).addAnswer(
    [
        'La cuenta de Prime Video tiene un valor de $4.0.',
        'Escriba *Pagar* para recibir los metodos de pago.',
    ],
    null,
    null,
    [flowPagoGeneral('Prime Video')]
)

const flowSpotify = addKeyword(['Spotify', 'spotify']).addAnswer(
    [
        'La cuenta de Spotify tiene un valor de $2.5.',
        'Escriba *Pagar* para recibir los metodos de pago.',
    ],
    null,
    null,
    [flowPagoGeneral('Spotify')]
)

const flowCrunchyroll = addKeyword(['Crunchyroll', 'crunchyroll']).addAnswer(
    [
        'La cuenta de Crunchyroll tiene un valor de $3.0.',
        'Escriba *Pagar* para recibir los metodos de pago.',
    ],
    null,
    null,
    [flowPagoGeneral('Crunchyroll')]
)

// Flujo de selecci¨®n de cuentas
const flowCuentas = addKeyword(['Cuentas', 'cuenta', 'Cuenta']).addAnswer(
    [
        'Selecciona que cuenta deseas contratar:',
        '*Netflix*',
        '*Max*',
        '*PrimeVideo*',
        '*Spotify*',
        '*Crunchyroll*',
    ],
    null,
    null,
    [flowNetflix, flowMax, flowPrimeVideo, flowSpotify, flowCrunchyroll]
)

// Otros flujos
const flowRenovar = addKeyword(['gracias', 'grac']).addAnswer(
    [
        'Estamos para servirte!',
    ]
)

const flowSoporte = addKeyword(['Soporte', 'soporte']).addAnswer(
    ['Espera un momento en linea, ya te vamos a atender.']
)

const flowPrincipal = addKeyword(['hola', 'klk', 'ola', 'Hola', 'epale', 'hey'])
    .addAnswer('Hola, bienvenido a *FacilStreaming*.')
    .addAnswer(
        [
            'Escribe a continuacion como podemos ayudarte:',
            '*Cuenta* para comprar una cuenta nueva.',
            '*Renovar* para renovar tu cuenta.',
            '*Soporte* para obtener ayuda.',
        ],
        null,
        null,
        [flowCuentas, flowRenovar, flowSoporte]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()



