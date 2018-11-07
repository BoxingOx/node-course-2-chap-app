
var generateMessage = (from, text) =>{
  return {
    from,
    text,
    createdAt : new Date().getTime()
  }// end object to be returned
};// end fxn for var generateMessage


var generateLocationMessage = (from, latitude, longitude)=>{

  return{
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  };// end object to be returned
};// end fxn for var generateLocationMessage

module.exports = {generateMessage, generateLocationMessage};
