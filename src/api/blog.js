import request from '@/utils/request.js'

export default {
  insertBlog (data) {
    return request({
      url: '/service-blog/m-blog/insertBlog',
      method: 'post',
      data
    })
  },

  deleteBlogById (id) {
    return request({
      url: `/service-blog/m-blog/deleteBlogById/${id}`,
      method: 'delete'
    })
  },

  selectById (id) {
    return request({
      url: `/service-blog/m-blog/selectBlogById/${id}`,
      method: 'get'
    })
  },

  limitSelect (current, size) {
    return request({
      url: `/service-blog/m-blog/limitSelect/${current}/${size}`,
      method: 'get'
    })
  },

  updateBlogById (data) {
    return request({
      url: '/service-blog/m-blog/updateBlogById',
      method: 'put',
      data
    })
  }
}
