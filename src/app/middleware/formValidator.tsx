

export function FormValidator(datosObligatorios:any, datosFormulario:any) : boolean{
    let passValidation = true
    console.log('hola')

    Object.keys(datosObligatorios).forEach(key=>{
        if(datosObligatorios[key]){
            switch (typeof datosObligatorios[key]) {
                case 'number':

                    break;

                default:
                    console.log(typeof datosObligatorios[key]);

            }

        }
    })
    return passValidation;
}