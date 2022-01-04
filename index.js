const { default: axios } = require('axios');
const api = require('./api');
const symbol = process.env.SYMBOL;

setInterval(async () => {

    // let buy = 0, sell = 0;
    // const result = await api.depth(symbol);

    // if (result.bids) {
    //     console.log(`Ordem de compra - Quem quer comprar ${result.bids[0][0]}`);
    //     buy = parseFloat(result.bids[0][0]);
    // }

    // if (result.asks && result.asks.length) {
    //     console.log(`Ordem de venda - Quem quer vender ${result.asks[0][0]}`);
    //     sell = parseFloat(result.asks[0][0]);
        console.log(await api.accountInfo());
    // }


    // if (sell < 0.080940) {
    //     console.log('Hora de comprar');
    // } else if (buy > 0.080970) {
    //     console.log('Hora de vender');
    // } else {
    //     console.log('Aguardando mercado');
    // }


}, process.env.CRAWLER_INTERVAL)