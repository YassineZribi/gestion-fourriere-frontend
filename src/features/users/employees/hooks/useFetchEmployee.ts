import { useState } from "react";
import useEffectOnce from "../../../../hooks/useEffectOnce";
import employeesService from "../services"
import Employee from "../../../../types/Employee";

export default function useFetchEmployee(id: string | number | null) {
    const [employee, setEmployee] = useState<Employee | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('');

    useEffectOnce(() => {
        if (id === null) return;
        setLoading(true)
        employeesService.getEmployeeById(id)
            .then(res => {
                setEmployee(res.data)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    })

    return {employee, isLoading, error}
}