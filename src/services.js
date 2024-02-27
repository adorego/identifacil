import {API_REGISTRO} from "../config";

async function getDatos(endpoint){

    const res = await fetch(`${API_REGISTRO}${endpoint}`)

    if(!res.ok) throw new Error('Something went wrong')

    return await res.json()
}
