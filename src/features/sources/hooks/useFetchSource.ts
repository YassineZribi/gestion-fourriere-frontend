import { useState } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import sourcesService from "../services"
import Source from "../../../types/Source";

export default function useFetchSource(id: string | number | null) {
    const [source, setSource] = useState<Source | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('');

    useEffectOnce(() => {
        if (id === null) return;
        setLoading(true)
        sourcesService.getSourceById(id)
            .then(res => {
                setSource(res.data)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    })

    return {source, isLoading, error}
}