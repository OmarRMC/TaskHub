import { useEffect, useState } from "react";
import { userAuthInterface } from "../interface/authInterface";

function useFetch(promise: () => Promise<any>, dataAuth: userAuthInterface | null) {

    const [dataResponse, setDataResponse] = useState([]);
    const [links, setLinks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const changeDataResponse = (newData: any) => {
        setDataResponse(newData)
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
    return { dataResponse, loading, error, changeDataResponse };
}

export default useFetch;