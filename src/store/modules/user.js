import { login, logout, getInfo, setPass, setEmail } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import { info } from 'autoprefixer'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    email: '',
    avatar: '',
    info: {},
    claims: {},
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_PASS: (state, password) => {
    state.password = password
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, infox) => {
    state.info = infox
  },
  SET_USER_CLAIMS: (state, infox) => {
    state.claims = infox
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { phone, password, captcha, captcha_timestamp, captcha_challenge } = userInfo
    return new Promise((resolve, reject) => {
      login({ phone: phone.trim(), password: password, captcha_code: captcha.trim(), captcha_challenge, captcha_time: captcha_timestamp }).then(response => {
        console.log(response)
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        const { status, data } = error.response
        if (typeof status !== "undefined" && status === 401) {
          reject("登陆失败:" + data.message)
        } else {
          reject(error)
        }
      })
    })
  },

  // user change password
  setPass({ commit }, userPassInfo) {
    const { old_password, new_password, confirm_password } = userPassInfo
    return new Promise((resolve, reject) => {
      setPass({ old_password: old_password, new_password: new_password, confirm_password: confirm_password }).then(response => {
        console.log(response)
        // commit('SET_TOKEN', response.token)
        // setToken(response.token)
        resolve()
      }).catch(error => {
        const { status, data } = error.response
        if (typeof status !== "undefined" && status === 401) {
          reject("登陆失败:" + data.message)
        } else {
          reject(error)
        }
      })
    })
  },

  // user change password
  setEmail({ commit }, userPassInfo) {
    const { email, phone } = userPassInfo
    return new Promise((resolve, reject) => {
      setEmail({ email: email, phone: phone }).then(response => {
        console.log(response)
        // commit('SET_TOKEN', response.token)
        // setToken(response.token)
        resolve()
      }).catch(error => {
        const { status, data } = error.response
        if (typeof status !== "undefined" && status === 401) {
          reject("登陆失败:" + data.message)
        } else {
          reject(error)
        }
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { claims, user } = response
        if (response.status !== 0) {
          return reject('用户信息获取失败，无法登录')
        }
        commit('SET_NAME', user.username)
        commit('SET_EMAIL', user.email)
        commit('SET_AVATAR', "https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg")
        commit('SET_USER_INFO', user)
        commit('SET_USER_CLAIMS', claims)
        commit('SET_ROLES', claims.roles)
        console.log("fetch user data");
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        commit('SET_ROLES', [])
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

