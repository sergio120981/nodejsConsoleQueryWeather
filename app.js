require('dotenv').config();

const { listarLugares, inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");

const Busqueda = require("./models/busqueda");
require("colors");

const main = async () => {

    const busqueda = new Busqueda();
    busqueda.loadHistorial();

    let opt=0;
    do{

        opt = await inquirerMenu();
        switch (opt) {

            case 1:
                //data input for search
                const lugar=await leerInput('Ciudad: ');

                //searching places and selecting one of them
                const lugares=await busqueda.ciudad(lugar);
                const lugarSeleccionado = await listarLugares(lugares);
                
                if(lugarSeleccionado){

                    //searching info about a specific place
                    const [ciudad]=lugares.filter( lugar => lugar.id===lugarSeleccionado);

                    busqueda.agregarHistorial(ciudad.nombre);
                    //filling info

                    const {temp, min, max, desc}=await busqueda.getInfo(ciudad.lat, ciudad.lon);

                    console.clear();
                    console.log('\nInformacion de la ciudad\n'.green);
                    console.log('Ciudad: '+ciudad.nombre.yellow);
                    console.log(`\tLat: ${ciudad.lat}`);
                    console.log(`\tLon: ${ciudad.lon}`);
                    console.log('Temperatura: '+temp);
                    console.log('\tMinima: '+min);
                    console.log('\tMaxima: '+max);
                    console.log('\Descripcion: '+desc.yellow);
                }
            break;

            case 2:

                busqueda.historial.forEach( (l, i) => {
                    const idx= `${i+1}.`.green;
                    console.log(`${idx} ${l}`);
                });

            break;

            case 3:

                busqueda.limpiarHistorial();

            break;

        };


        if(opt)await pausa();

    }while (opt)
    console.clear();
}


main();