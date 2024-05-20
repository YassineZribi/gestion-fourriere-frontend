import { useState } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import articleFamiliesService from "../services"
import ArticleFamily from "../../../types/ArticleFamily";

export default function useFetchArticleFamily(id: string | number | null) {
    const [articleFamily, setArticleFamily] = useState<ArticleFamily | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('');

    useEffectOnce(() => {
        if (id === null) return;
        setLoading(true)
        articleFamiliesService.getArticleFamilyById(id)
            .then(res => {
                setArticleFamily(res.data)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    })

    return {articleFamily, isLoading, error}
}