import Cookies from 'browser-cookies';
import { message } from 'antd';
import axios from 'axios';
import md5 from 'js-md5';

const instance = axios.create({
  baseURL: 'http://localhost:8071/',
  withCredentials: true,
});
axios.defaults.withCredentials = true; //让ajax携带cookie

const initState = {
  userType: '',
  userName: '',
  loading: false
}

const TYPE = {
  UPDATE_PROPS: Symbol('update')
}

export const actions = {
  updateProps: (payload) => (dispatch) => {
    dispatch({
      type: TYPE.UPDATE_PROPS,
      payload,
    })
  },
  //loading control
  loadingControl: (status) => (dispatch) => {
    dispatch(
      actions.updateProps({
        loading: status
      })
    )
  },
  //根据cookie查询登录状态
  getUserInfo: () => (dispatch) => {
    instance.get('/auth/checkLogin').then(({ data: { code, data } }) => {
      const userType = code === 200 ? data.userType : 'login';

      dispatch(
        actions.updateProps({
          userType,
          userName: data.userName,
        })
      )
    })
  },
  //用户登录
  userSignIn: ({ account, password }) => (dispatch) => {
    dispatch(actions.loadingControl(true))

    const params = { account, password: md5(password) }
    instance.post('/auth/checkAuth', params).then(({ data: { code, data } }) => {
      if (code === 200) {
        dispatch(
          actions.updateProps({
            userType: data.userType,
            userName: data.userName,
          })
        )
      }else if (code === 205) {
        message.error(data)
      }
    })
  },
  userSignOut: () => (dispatch) => {
    instance.get('/auth/logout').then(() => {
      Cookies.erase('login-ticket');
      Cookies.erase('login-ticket.sig');

      dispatch(
        actions.updateProps({
          userName: '',
          userType: 'login',
        })
      )
    })
  },
  createUsers: (params) => (dispatch) => {
    instance.post('/auth/createAuth', params)
  }
}

export default (state = initState, { type, payload }) => {
  if (type === TYPE.UPDATE_PROPS) {
    return { ...state, ...payload }
  }
  return state;
}