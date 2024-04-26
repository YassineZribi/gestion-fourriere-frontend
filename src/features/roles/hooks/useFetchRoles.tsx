import useEffectOnce from "../../../hooks/useEffectOnce";
import rolesService from "../services"
import useRolesStore from "../../../store/useRolesStore";

export default function useFetchRoles() {
    const {setRoles, setLoading, setError, reset} = useRolesStore()

    useEffectOnce(() => {
        setLoading(true)
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
    }, () => reset())

    return null
}