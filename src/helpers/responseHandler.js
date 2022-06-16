exports.response = (res, message, results, pageInfo, stats = 200) => {
  const data = {
    success: true
  }

  if (stats >= 400) data.success = false
  if (message) data.message = message
  if (results) data.results = results
  if (pageInfo) data.pageInfo = pageInfo
  
  return res.status(stats).json(data)
}

exports.pageInfo = (total, limit, page, endpoint) => {
  const {APP_URL} = process.env
  const lastPage = Math.ceil(total / limit)
  const pageInfo = {
    prev: page > 1 ? `${APP_URL}/${endpoint}?&page=${page - 1}&limit=${limit}` : null,
    next: page < lastPage ? `${APP_URL}/${endpoint}?&page=${page + 1}&limit=${limit}` : null,
    totalData: total,
    currentPage: page,
    lastPage,
  }
  return pageInfo
}
