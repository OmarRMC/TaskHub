import { useEffect, useState } from "react";
import { userAuthInterface } from "../interface/authInterface";

function useFetch<T>(promise: () => Promise<any>, dataAuth: userAuthInterface | null) {

    const [dataResponse, setDataResponse] = useState<T | []>([]);
    const [links, setLinks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const changeDataResponse = (newData: T) => {
        setDataResponse(newData)
    }
    const updateDataResponse = (newData: T) => {
        const auxi = dataResponse.map((dataItem) => {
            return (newData.id == dataItem.id) ? { ...newData } : { ...dataItem }
        })
        setDataResponse(auxi)
    }
    const addDataResponse = (newData: T) => {
        setDataResponse((dataOld) => {
            return  [...dataOld, {...newData} ]
        })
    }


    const removeDataResponse = (id: number) => {
        setDataResponse(dataResponse.filter((dataItem: any) => dataItem.id != id))
    }

    useEffect(() => {
        if (!dataAuth) return;
        setLoading(true)
        promise(dataAuth?.token).then((d) => {
            const { data, ...links } = d;
            if (data) {
                setDataResponse(data)
                setLinks(links)
            }

        }).catch((error) => {
            setError(error)
        })
            .finally(() => setLoading(false));

    }, [dataAuth]);
    return { dataResponse, loading, error, changeDataResponse, updateDataResponse, removeDataResponse , addDataResponse};
}

export default useFetch;