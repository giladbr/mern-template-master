const api = require("./api");
const { wordCount } = require("./util");
const fs = require("fs");

module.exports = {
    getNews: async () => {
        const news = await api.getNews();
        let wordCounter = 0, wordCountObj = {}, index = 0;
        for (let article of news.articles) {
            const { title, description } = article;
            wordCounter += wordCount(title, description);
            article.wordCount = wordCounter;
            wordCountObj[index] = wordCounter;
            wordCounter = 0;
            index++;
        }

        fs.writeFile("wordCount", JSON.stringify(wordCountObj), {}, () => {
            console.log("Word count file written to server.");
        });
        return news;
    }
};
