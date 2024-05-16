import { useState } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import registersService from "../services"
import Register from "../../../types/Register";

export default function useFetchRegister(id: string | number | null) {
    const [register, setRegister] = useState<Register | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('');

    useEffectOnce(() => {
        if (id === null) return;
        setLoading(true)
        registersService.getRegisterById(id)
            .then(res => {
                setRegister(res.data)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    })

    return {register, isLoading, error}
}