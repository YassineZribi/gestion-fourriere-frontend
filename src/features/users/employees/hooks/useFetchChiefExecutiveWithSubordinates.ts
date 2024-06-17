import { useState } from "react";
import useEffectOnce from "../../../../hooks/useEffectOnce";
import employeesService from "../services"
import EmployeeWithSubrdinates from "../../../../types/EmployeeWithSubordinates";
import { AxiosError } from '../../../../lib/axios/api';


export default function useFetchChiefExecutiveWithSubordinates() {
    const [chiefExecutive, setChiefExecutive] = useState<EmployeeWithSubrdinates | null>(null)
    const [isFetching, setFetching] = useState(false)
    const [error, setError] = useState('');

    useEffectOnce(() => {
        setFetching(true)
        employeesService.getChiefExecutiveWithRecursiveSubordinates()
            .then(res => {
                setChiefExecutive(res.data)
            })
            .catch(err => {
                if (err !== null && err instanceof AxiosError && err.response)
                    setError(err.response.data.message)
                else setError(err.message)
            })
            .finally(() => {
                setFetching(false)
            })
    })

    return {chiefExecutive, isFetching, error}
}