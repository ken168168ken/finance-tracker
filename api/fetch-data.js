const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { api, symbol, from, to } = req.query;
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

  try {
    let url;
    if (api === 'TIME_SERIES_WEEKLY') {
      url = `https://www.alphavantage.co/query?function=${api}&symbol=${symbol}&apikey=${API_KEY}`;
    } else if (api === 'CURRENCY_EXCHANGE_RATE') {
      url = `https://www.alphavantage.co/query?function=${api}&from_currency=${from}&to_currency=${to}&apikey=${API_KEY}`;
    } else {
      throw new Error('無效的API類型');
    }

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
