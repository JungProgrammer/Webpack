const rp = require('request-promise');

module.exports = async function (city = '') {
    if(!city){
        throw new Error("Имя города не может быть пустым");
    }

    const KEY = 'a0b0f054191e4bc79e3d996f1bd9cc40';
    const uri = 'http://api.openweathermap.org/data/2.5/weather';

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    };

    try{
        const data = await rp(options);
        const celsius = (data.main.temp - 32) * 5 / 9;
        //console.log(data);

        return{
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch(error) {
        return {
            weather: null,
            error: error.error.message
        };
    }
};