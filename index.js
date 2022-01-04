const { default: axios } = require('axios');
const api = require('./api');
const symbol = process.env.SYMBOL;
const profitability = parseFloat(process.env.PROFITABILITY);

setInterval(async () => {

    let buy = 0, sell = 0;
    const result = await api.depth(symbol);

    if (result.bids && result.bids.length) {
        console.log(`Ordem de compra - Quem quer comprar ${result.bids[0][0]}`);
        buy = parseFloat(result.bids[0][0]);
    }

    if (result.asks && result.asks.length) {
        console.log(`Ordem de venda - Quem quer vender ${result.asks[0][0]}`);
        sell = parseFloat(result.asks[0][0]);
    }

    if (sell < 450) {
        console.log('Hora de comprar');

        const account = await api.accountInfo();
        
        const coins = account.balances.filter(b => symbol.indexOf(b.asset) !== -1);
        console.log('POSIÇÃO DA CARTEIRA');
        console.log(coins);

        console.log('Verificando se tenho grana...');
        if (sell <= parseInt(coins.find(c => c.asset === 'BUSD').free)) {
            console.log('Temos grana! Comprando agora...');
            const byuOrder = await api.newOrder(symbol, 1);
            console.log(`orderId: ${byuOrder.orderId}`);
            console.log(`status: ${byuOrder.status}`);

            console.log('Posicionando venda Futura');
            const price = parseInt(sell * profitability);
            console.log(`Vendendo por ${price} (${profitability})`);
            const sellOrder = await api.newOrder(symbol, 1, price, 'SELL', 'LIMIT');
            console.log(`orderId: ${sellOrder.orderId}`);
            console.log(`status: ${sellOrder.status}`);
        }

    } else if (buy > 500) {
        console.log('Hora de vender');
    } else {
        console.log('Aguardando mercado');
    }


}, process.env.CRAWLER_INTERVAL)