export interface PaginationHookProps {
    totalCount: number,
    pageSize: number,
    siblingCount: number,
    currentPage: number,
}
export interface PaginationProps extends PaginationHookProps {
    onPageChange: Function,
    className: string,
}