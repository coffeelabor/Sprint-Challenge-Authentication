module.exports = {
  jsonWebTokenSecret:
    process.env.JWT_SECRET || "Hey, youre not supposed to see this!"
};
