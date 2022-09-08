module.exports = () => {
  const express = require("express");
  const router = express.Router();

  const newsController = require("./newsController");

  /**** Routes ****/
  router.get('/news', async (req, res) => {
    const news = await newsController.getNews();
    res.json(news);
  });

  return router;
}
