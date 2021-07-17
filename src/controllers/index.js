const functions = require("../functions");
const ctrl = {};

ctrl.createShortUrl = (req, res) => {
  let { body } = req;
  let { long_url } = body;

  if (!long_url)
    return res.status(400).json({ success: false, err: "missing params" });

  functions
    .getUrl(long_url)
    .then((shortUrl) => {
      return res.status(200).json({ success: true, data: shortUrl });
    })
    .catch(() => {
      let { host } = req.headers;
      functions
        .createShortUrl(host, long_url)
        .then((shortUrl) => {
          return res.status(200).json({ success: true, data: shortUrl });
        })
        .catch((err) => {
          return res.status(200).json({
            success: true,
            err: err.message,
          });
        });
    });
};

ctrl.redirect = (req, res) => {
  let { code } = req.params;
  functions
    .getUsingCode(code)
    .then((url) => {
      console.log(url);
      res.redirect(url);
    })
    .catch((err) => {
      res.status(404).send("Page not found");
    });
};

module.exports = ctrl;
