export default interface FetchWithPaginationResponse<T> {
    content: T[],
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        offset: number,
        unpaged: boolean,
        paged: boolean
    },
    totalElements: number,
    totalPages: number,
    last: boolean,
    size: number,
    number: number,
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
}