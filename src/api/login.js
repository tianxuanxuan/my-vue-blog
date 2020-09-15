import request from '@/utils/request.js'

export default {
  login (data) {
    return request({
      url: '/service-blog/account/login',
      method: 'post',
      data
    })
  },
  register (data) {
    return request({
      url: '/service-blog/account/sign',
      method: 'post',
      data
    })
  },
  logout () {
    return request({
      url: '/service-blog/account/logout',
      method: 'get'
    })
  }
}
