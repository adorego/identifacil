
import {useGlobalContext} from "@/app/Context/store";

export default function CheckEstablecimiento(){
    const { selectedEstablecimiento, setSelectedEstablecimiento } = useGlobalContext();

    console.log(selectedEstablecimiento)

    return selectedEstablecimiento
}