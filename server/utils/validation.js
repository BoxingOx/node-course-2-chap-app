  var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0; // returns true or false trim takes away space characters
  };

  module.exports = {isRealString};
