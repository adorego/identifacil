import {postEntity} from "@/components/utils/utils";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

type SubmitType = {
    isEditMode: boolean;
    openSnackbar: (args0: string, severity: "" | "success" | "info" | "warning" | "error")=>void;
    datosFormulario: Object;
    params: any;
    setLoading:  React.Dispatch<React.SetStateAction<boolean>>;
    router:AppRouterInstance;
    selecciones: any;
}

export default async function SubmitExpediente({isEditMode, openSnackbar, datosFormulario, params, setLoading, router, selecciones}:SubmitType){
    const form_method = isEditMode ? 'PUT' : 'POST'
    console.log('hola2')
    console.log(form_method)
    const endpoint_api = `${process.env.NEXT_PUBLIC_IDENTIFACIL_IDENTIFICACION_REGISTRO_API}/datos_penales/expedientes`
    const stateForm: any = {
        ...datosFormulario,
        hechosPuniblesCausas: selecciones.map((item:any) => Object.values(item)),
    }


    const requiredFields = ['hechosPuniblesCausas', 'caratula_expediente']

    if (stateForm.hechosPuniblesCausas.length <= 0 || stateForm.caratula_expediente == '' || stateForm.numeroDeExpediente == "") {
        openSnackbar('Falta completar campos requeridos', 'error')
    } else {

        try {
            setLoading(true);



            const url = form_method == 'PUT'
                ? `${endpoint_api}/${params.id}` // PUT
                : `${endpoint_api}`; // POST

            // console.log(stateForm)
            console.log(form_method)
            console.log(url)

            const response = await fetch(url, {
                method: form_method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stateForm),
            });

            setLoading(false);

            if (response.ok) {
                const message = form_method == 'PUT'
                    ? `expediente actualizada correctamente.`
                    : `expediente creada correctamente.`;

                openSnackbar(message, 'success');
                // router.push(`/expediente`);
            } else {
                throw new Error('Error en la petición');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    }

}