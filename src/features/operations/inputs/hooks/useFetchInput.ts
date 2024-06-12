import { useState } from "react";
import useEffectOnce from "../../../../hooks/useEffectOnce";
import inputsService from "../services"
import Input from "../../../../types/Input";

export default function useFetchInput(id?: string | number | null) {
    const [input, setInput] = useState<Input | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('');

    useEffectOnce(() => {
        if (!id) return;
        setLoading(true)
        inputsService.getInputById(id)
            .then(res => {
                setInput(res.data)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    })

    return {input, isLoading, error}
}