const PRODUCTION = process.env.PRODUCTION;
const axios = require("axios");
// Routes
// =============================================================
module.exports = function (app) {


  //app.get("/ext/google/:city", function(req, res) {
//list{library, cafe, park, pizza, bar}
  // api key from dot env
  const queryUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=library%20new%20york&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${PRODUCTION}`;

  // axios call to the url google and res.json the response query
  axios.get(queryUrl).then(function (res) {
    const places = res.data.map(function (place) {
      console.log(place) 
    });


    
  });

}