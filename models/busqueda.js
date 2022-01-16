const axios = require('axios');
const CONF = require('../config/conf');

class Busqueda {
    historial = ['Tegucigalpa', 'Habana'];

    constructor () {

    }

    get parametrosMapBox () {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es'
        };
    }

    get parametrosOpenWeatherMap(){
        return { ///https://api.openweathermap.org/data/2.5/weather?lat=23.08806&lon=-82.395&
            'appid':process.env.OPENWEATHERMAP_KEY,
            'units':'metric',
            'lang':'es'
        };
    }

    async getInfo (lat, lon) {
        try {
            
            const instancia = axios.create({
                baseURL: `${ CONF.OPENWEATHERMAP_URL}lat=${lat}&lon=${lon}`,
                params: this.parametrosOpenWeatherMap
            });

            const resp = await instancia.get();
            //console.log(resp)
            return {
                temp: resp.data.main.temp,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                desc: resp.data.weather[0].description
            };

        } catch (error) {
            console.log('Informacion no disponible!!!'.red);
            throw error;
        }
    }

    async ciudad (lugar = ''){

        try {

            const instancia = axios.create({
                baseURL: `${ CONF.MAPBOX_URL}${ lugar }.json`,
                params: this.parametrosMapBox
            });

            const resp = await instancia.get();
            //const resp= await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/habana.json?language=es&access_token=pk.eyJ1Ijoic2VyZ2lvMTI5MDk4MSIsImEiOiJja3loa3NubjcweGt4MnVtdmh0ZXNtNjg0In0.FU92sfNeHTL5BOVuEhxU1g');
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lon: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {

            console.log('No encontrado!!!'.red);
            //throw error;

        }

        

    };
};

module.exports=Busqueda;