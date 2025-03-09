export type Pageable<T> = {
  data: Array<T>,
  paging: {
    current_page: number,
    total_page: number,
    size: number,
  }
}
