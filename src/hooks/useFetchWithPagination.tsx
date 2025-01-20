import { useEffect, useState } from 'react';
import FetchWithPaginationResponse from '../types/FetchWithPaginationResponse';
import { useSearchParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

export default function useFetchWithPagination<T>(fetchFunction: (criteria: string) => Promise<AxiosResponse<FetchWithPaginationResponse<T>, any>>, advancedFilters: readonly string[] = []) {
    const [responseData, setResponseData] = useState<FetchWithPaginationResponse<T> | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await fetchFunction(searchParams.toString())
            console.log(res.data);
            
            setResponseData(res.data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [searchParams])

    const handleSort = (name: string) => {
        const sortList = searchParams.getAll("sort")
        const itemAlreadyExists = !!sortList.find(item => item.split("-")[0] === name)
        if (!itemAlreadyExists) {
            searchParams.append("sort", `${name}-asc`)
        }
        else {
            const newSortList = sortList
                .filter(item => {
                    const [key, value] = item.split("-")
                    if (key === name && value === "desc") {
                        return false
                    }
                    return true
                })
                .map(item => {
                    const [key, value] = item.split("-")
                    if (key === name) { // && if (value === "asc")
                        return `${name}-desc`;
                    }
                    else
                        return item
                })
            searchParams.delete("sort")
            for (const x of newSortList) {
                searchParams.append("sort", x)
            }
        }
        const page = searchParams.get("page")
        if (page && page !== "1") searchParams.set("page", "1")

        setSearchParams(searchParams)
    }

    const handleFilter = (property: string, value: string) => {
        if (value) {
            searchParams.set(property, value)
        } else {
            searchParams.delete(property)
        }
        const page = searchParams.get("page")
        if (page && page !== "1") searchParams.set("page", "1")

        setSearchParams(searchParams)
    }

    const handleClearFilters = () => {
        const newSearchParams: { [key: string]: any } = {
            sort: searchParams.getAll("sort")
        }
        const page = searchParams.get("page")
        if (page && page !== "1") newSearchParams["page"] = "1"

        /* Keep advanced filter params (begin) */
        for (const advancedFilter of advancedFilters) {
            const value = searchParams.get(advancedFilter)
            if (value?.trim()) {
                newSearchParams[advancedFilter] = value
            }
        }
        /* Keep advanced filter params (end) */

        setSearchParams(newSearchParams)
    }

    const handleClearAdvancedFilters = () => {
        for (const property of advancedFilters) {
            searchParams.delete(property)
        }

        const page = searchParams.get("page")
        if (page && page !== "1") searchParams.set("page", "1")

        setSearchParams(searchParams)
    }

    const getFilterParams = () => {
        const allFilterParams: { [key: string]: any } = {};

        for (const [key, value] of searchParams.entries()) {
            if (key !== "page" && key !== "sort" && !advancedFilters.includes(key)) allFilterParams[key] = value
        }

        return allFilterParams
    }

    const getAdvancedFilterParams = () => {
        const allAdvancedFilterParams: { [key: string]: any } = {};

        for (const advancedFilter of advancedFilters) {
            const value = searchParams.get(advancedFilter)
            if (value?.trim()) {
                allAdvancedFilterParams[advancedFilter] = value
            }
        }

        return allAdvancedFilterParams
    }

    const getSearchParam = (key: string) => {
        return searchParams.get(key)
    } 

    const getSearchParams = () => {
        return searchParams
    }

    const setPageParam = (pageNumber: number) => {
        searchParams.set("page", String(pageNumber))
        setSearchParams(searchParams)
    }

    const hasFilters = () => {
        const filters = getFilterParams()
        for (const property in filters) {
            // console.log(`${property}: ${filters[property]}`);
            if (filters[property]?.trim())
                return true
        }
        return false
    }

    const hasAdvancedFilters = () => {
        const advancedFilters = getAdvancedFilterParams()
        for (const property in advancedFilters) {
            // console.log(`${property}: ${advancedFilters[property]}`);
            if (advancedFilters[property]?.trim())
                return true
        }
        return false
    }

    const getSortList = () => {
        return searchParams.getAll("sort")
    }


    const [showFilters, setShowFilters] = useState(() => hasFilters());
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(() => hasAdvancedFilters());

    const toggleFilters = () => {
        setShowFilters(prev => !prev);
        handleClearFilters()
    };

    const toggleAdvancedFilters = () => {
        setShowAdvancedFilters(prev => !prev);
        handleClearAdvancedFilters()
    };

    // all queryParams (including : filterParams + sort + page + size)
    // const queryParams = Object.fromEntries(searchParams.entries())

    const onCreateEntity = () => {
        handleClearFilters()
        handleClearAdvancedFilters()
        const page = searchParams.get("page")
        if (page === null || page === "1") fetchData()
    }

    const onDeleteEntity = () => {
        fetchData()
    }

    const onUpdateEntity = onDeleteEntity


    return {
        responseData,
        isLoading,
        error,
        fetchData,
        
        handleSort,
        handleFilter,
        showFilters,
        showAdvancedFilters,
        toggleFilters,
        toggleAdvancedFilters,
        handleClearFilters,
        handleClearAdvancedFilters,
        hasFilters,
        hasAdvancedFilters,
        setPageParam,
        getSearchParam,
        getSearchParams,
        getFilterParams,
        getAdvancedFilterParams,
        getSortList,
        
        onCreateEntity,
        onDeleteEntity,
        onUpdateEntity

    }

}