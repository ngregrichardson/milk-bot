const { GiphyFetch } = require('@giphy/js-fetch-api');

const gf = new GiphyFetch(process.env.GIPHY_TOKEN);

module.exports = gf;
