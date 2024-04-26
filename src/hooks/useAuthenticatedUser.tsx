import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { ACCESS_TOKEN_KEY } from "../utils/constants";
import accountService from "../features/account/services";

export default function useAuthenticatedUser() {
    const [isLoading, setLoading] = useState(true);
    const { loadAuthenticatedUser, logout } = useAuthStore()

    useEffect(() => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
        if (accessToken) {
            accountService.getProfile()
                .then(res => {
                    console.log(res)
                    loadAuthenticatedUser(res.data)
                })
                .catch(err => {
                    console.log(err)
                    logout()
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    return { isLoading }
}