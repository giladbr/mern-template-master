module.exports = () => {
  const express = require("express");
  const router = express.Router();

  const api = require("./api");

  /**** Routes ****/
  router.get('/news', async (req, res) => {
    const news = await api.getNews();
    res.json(news);
  });

  return router;
}
