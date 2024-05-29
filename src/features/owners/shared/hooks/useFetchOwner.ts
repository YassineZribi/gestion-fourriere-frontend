import { useState } from "react";
import useEffectOnce from "../../../../hooks/useEffectOnce";
import ownersService from "../services"
import Owner from "../../../../types/Owner";

export default function useFetchOwner(id: string | number | null) {
    const [owner, setOwner] = useState<Owner | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('');

    useEffectOnce(() => {
        if (id === null) return;
        setLoading(true)
        ownersService.getOwnerById(id)
            .then(res => {
                setOwner(res.data)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    })

    return {owner, isLoading, error}
}