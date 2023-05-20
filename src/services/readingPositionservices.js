const ReadingPosition = require("../models/ReadingPosition");

const getReadingPosition = async (user, volume) => {
  const rp = await ReadingPosition.findOne({
    user: user,
    volume: volume,
  });
  return rp;
};

module.exports = { getReadingPosition };
