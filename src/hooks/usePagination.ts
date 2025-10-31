import { ref } from "vue"

export default function usePagination() {
  const pagination = ref({
    pageNo: 1,
    pageSize: 10,
    total: 0,
    sizes: [10, 20, 50, 100],
    layout: 'total, sizes, ->, prev, pager, next, jumper',
    sort: null as string | null,
    order: null as string | null,
  })

  function getParams() {
    return {
      pageNo: pagination.value.pageNo,
      pageSize: pagination.value.pageSize,
      from: (pagination.value.pageNo - 1) * pagination.value.pageSize,
      limit: pagination.value.pageSize,
      ...(
        pagination.value.sort && pagination.value.order && {
          sort: pagination.value.sort,
          order: pagination.value.order,
        }
      ),
    }
  }

  async function onSizeChange(pageSize: number) {
    pagination.value.pageSize = pageSize
  }

  async function onCurrentChange(pageNo: number) {
    pagination.value.pageNo = pageNo
  }

  async function onSortChange(prop: string, order: string) {
    pagination.value.sort = prop
    pagination.value.order = order === 'ascending' ? 'asc' : 'desc'
  }

  return {
    pagination,
    getParams,
    onSizeChange,
    onCurrentChange,
    onSortChange,
  }
}
