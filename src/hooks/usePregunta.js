import { useEffect, useState } from "react";
import { getPregunta } from "../database/db";

export function usePregunta(preguntaId=1) {
    const [preguntaMap, setPregunta] = useState({id:0, pregunta:'', respuesta:'', a:'',b:'',c:''});
    const [isLoading, setIsLoading] = useState(true);
    const [isSelected, setIsSelected] = useState(false);
    const [correcta, setCorrecta] = useState(false);
    const {  id, pregunta, respuesta, ...opciones} = preguntaMap

    useEffect(() => {
        setIsSelected(false);
        setCorrecta(false);
        getPregunta(preguntaId).then((value) => {
          setPregunta(value);
          setIsLoading(false);
        });
      }, [preguntaId]);

    return {  id, pregunta, respuesta, opciones ,setPregunta};
}