export interface RequestResponse{
  sucess:boolean;
  respuesta:any;
}
export async function api_request<T>(
  url:string,
  config: RequestInit
): Promise<RequestResponse>{
    console.log("Antes de la consulta....")
    const response = await fetch(url, config);
    const respuesta:RequestResponse = {
      sucess:false,
      respuesta:{}
    }
    if(!response.ok){
      respuesta.sucess = false;
      respuesta.respuesta = await response.json();
    }else{
      respuesta.sucess = true;
      respuesta.respuesta = await response.json();
    }
    

    return respuesta;
  
}