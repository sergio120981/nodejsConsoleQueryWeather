const inquirer = require("inquirer");
require("colors");

const preguntas=[{
    type: "list",
    name: "opcion",
    message: "Que desea hacer?",
    choices:[
        {
            value: 1,
            name: `${'1. '.green} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2. '.green} Historial`
        },
        {
            value: 3,
            name: `${'3. '.green} Borrar historial`
        },
        {
            value: 0,
            name: '0. Salir'.red
        }
    ] 
}];

const inquirerMenu=async()=>{
    console.clear();
    console.log('========================='.green);
    console.log('  SELECCIONE UNA OPCION  '.yellow);
    console.log('========================='.green);

    const {opcion}= await inquirer.prompt(preguntas);
    return opcion;
}

const leerInput = async (message)=> {
    const question = [
        {
            type: "input",
            name: 'desc',
            message,
            validate(value){
                if(value.length===0){
                    return 'Ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc}=await inquirer.prompt(question);
    return desc;
};

const pausa = async () => {

    const question = [
        {
            type: "input",
            name: 'enter',
            message: 'Presione '+'ENTER'.red+' para continuar'
        }
    ];

    const {enter}=await inquirer.prompt(question);
    return enter;
};

const listarLugares = async ( lugares) => {

    let choices=[];

    lugares.forEach(lugar => {
        choices.push(
        {
            value: lugar.id,
            name: lugar.nombre.green
        });
    });

    choices.unshift(
        {
            value: 0,
            name: 'Cancelar...'.red
        }
    );

    const preguntas=[{
        type: "list",
        name: "lugar",
        message: "Seleccione un lugar".blue,
        choices}];

    const {lugar}=await inquirer.prompt(preguntas);
    return lugar;
};

module.exports={
    leerInput,
    inquirerMenu,
    pausa,
    listarLugares
};