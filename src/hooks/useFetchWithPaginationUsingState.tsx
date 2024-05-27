import { useEffect, useState } from 'react';
import FetchWithPaginationResponse from '../types/FetchWithPaginationResponse';
import { AxiosResponse } from 'axios';

export default function useFetchWithPaginationUsingState<T>(fetchFunction: (criteria: string) => Promise<AxiosResponse<FetchWithPaginationResponse<T>, any>>) {
    const [responseData, setResponseData] = useState<FetchWithPaginationResponse<T> | null>(null)
    const [searchParams, setSearchParams] = useState(new URLSearchParams());
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await fetchFunction(searchParams.toString())
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
        const newSearchParams = new URLSearchParams(searchParams); // Clone the current params
        setSearchParams(newSearchParams)
    }

    const handleFilter = (property: string, value: string) => {
        if (value) {
            searchParams.set(property, value)
        } else {
            searchParams.delete(property)
        }
        const page = searchParams.get("page")
        if (page && page !== "1") searchParams.set("page", "1")
        const newSearchParams = new URLSearchParams(searchParams); // Clone the current params
        setSearchParams(newSearchParams)
    }

    const handleClearFilters = () => {
        const newSearchParams = new URLSearchParams();
        searchParams.getAll("sort").forEach(s => {
            newSearchParams.append("sort", s)
        })
        const page = searchParams.get("page")
        if (page && page !== "1") newSearchParams.set("page", "1")

        setSearchParams(newSearchParams)
    }

    const getFilterParams = () => {
        const allFilterParams: { [key: string]: any } = {};

        for (const [key, value] of searchParams.entries()) {
            if (key !== "page" && key !== "sort") allFilterParams[key] = value
        }

        return allFilterParams
    }

    const getSearchParam = (key: string) => {
        return searchParams.get(key)
    } 

    const setPageParam = (pageNumber: number) => {
        const newSearchParams = new URLSearchParams(searchParams); // Clone the current params
        newSearchParams.set("page", String(pageNumber))
        setSearchParams(newSearchParams)
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

    const getSortList = () => {
        return searchParams.getAll("sort")
    }


    const [showFilters, setShowFilters] = useState(true /* () => hasFilters() */);

    const toggleFilters = () => {
        setShowFilters(prev => !prev);
        handleClearFilters()
    };

    // all queryParams (including : filterParams + sort + page + size)
    // const queryParams = Object.fromEntries(searchParams.entries())

    const onCreateEntity = () => {
        handleClearFilters()
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
        toggleFilters,
        handleClearFilters,
        hasFilters,
        setPageParam,
        getSearchParam,
        getFilterParams,
        getSortList,
        
        onCreateEntity,
        onDeleteEntity,
        onUpdateEntity

    }

}