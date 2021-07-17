const Url = require("../models");

const getUrl = (url) => {
  return new Promise(async (resolve, reject) => {
    if (!url) return reject();
    let urlData = await Url.findOne({ longUrl: url }).catch((err) => {
      return reject(err.message);
    });
    if (!urlData) return reject();

    return resolve(urlData);
  });
};

const getUsingCode = (shortCode) => {
  return new Promise((resolve, reject) => {
    if (!shortCode) return reject();

    Url.findOne({ shortCode })
      .then((data) => {
        if (!data.longUrl) return reject();
        return resolve(data.longUrl);
      })
      .catch((err) => {
        return reject(err.message);
      });
  });
};

const generateShortCode = () => {
  return new Promise((resolve, reject) => {
    let shortCode = Math.random().toString(36).slice(2);
    return resolve(shortCode);
  });
};

const createShortUrl = (host, longUrl) => {
  return new Promise(async (resolve, reject) => {
    if (!longUrl.startsWith("https") || !longUrl.startsWith("http")) {
      if (longUrl.startsWith("www.")) {
        longUrl = "https://" + longUrl;
      } else {
        longUrl = "https://www." + longUrl;
      }
    }
    let isUrlPresent = await getUrl(longUrl).catch(() => false);
    if (isUrlPresent) {
      return reject(new Error("url already present"));
    }
    let shortCode = await generateShortCode().catch((err) => {
      return reject(err.message);
    });

    let shortUrl;
    try {
      shortUrl = host + "/" + shortCode;
    } catch (e) {
      return reject(e.message);
    }
    let urlObj = Url({
      longUrl: longUrl,
      shortUrl: shortUrl,
      shortCode: shortCode,
    });
    urlObj
      .save()
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err.message);
      });
  });
};

module.exports = { getUrl, generateShortCode, createShortUrl, getUsingCode };
