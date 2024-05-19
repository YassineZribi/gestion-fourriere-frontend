import { useState } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import measurementUnitsService from "../services"
import MeasurementUnit from "../../../types/MeasurementUnit";

export default function useFetchMeasurementUnit(id: string | number | null) {
    const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('');

    useEffectOnce(() => {
        if (id === null) return;
        setLoading(true)
        measurementUnitsService.getMeasurementUnitById(id)
            .then(res => {
                setMeasurementUnit(res.data)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    })

    return {measurementUnit, isLoading, error}
}