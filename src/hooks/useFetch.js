import { useEffect, useState } from "react";
export function useFetch (fetchFn) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>{
        let isMounted = true
        const fetchData = async () =>{
            try {
                const resData = await fetchFn()
                if (isMounted) setData(resData)

            } catch (error) {
                if (isMounted) setError(error)
                console.log('fail from useFetch: ', error);
                throw error
            }
            finally{
                if(isMounted) setLoading(false)
            }
        }
        fetchData()
    },[fetchFn])

    // console.log('data from hook la', data);
    // console.log('error from hook la', error);
    // console.log('loading from hook la', loading);
    return {data, loading, error}
}