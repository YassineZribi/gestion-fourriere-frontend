import { useState } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import institutionService from "../services"
import Institution from "../../../types/Institution";
import { AxiosError } from '../../../lib/axios/api';

export default function useHandleInstitution() {
    const [institution, setInstitution] = useState<Institution | null>(null)
    const [isFetching, setLoading] = useState(true)
    const [error, setError] = useState('');
    const [isNotFoundError, setNotFoundError] = useState(false);

    const updateInstitution = (institution: Institution) => {
        setInstitution(institution)
    }

    useEffectOnce(() => {
        institutionService.getInstitution()
            .then(res => {
                setInstitution(res.data)
            })
            .catch(err => {                
                setNotFoundError(err !== null && err instanceof AxiosError && err.response?.status === 404)
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    })

    return { institution, updateInstitution, isFetching, error, isNotFoundError }
}