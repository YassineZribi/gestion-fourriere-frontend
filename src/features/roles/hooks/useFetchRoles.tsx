import { useEffect, useState } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import rolesService from "../services/roles"
import Role from "../../../types/Role";

export default function useFetchRoles() {
    const [roles, setRoles] = useState<Role[]>([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState("");

    useEffect(() => {
        rolesService.getNonAdminRoles()
            .then(res => {
                setRoles(res.data)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return {roles, isLoading, error}
}