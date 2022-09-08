const axios = require("axios");

const apiKey = "2278a1e1255c4cdf90d39e2e177da016",
    baseURL = `http://newsapi.org/v2/everything?language=en&pageSize=100&sortBy=publishedAt&sources=bbc-news&apiKey=${apiKey}`;

module.exports = {
    getNews: async () => {
        const {data} = await axios.get(baseURL);
        return data;
    }
}