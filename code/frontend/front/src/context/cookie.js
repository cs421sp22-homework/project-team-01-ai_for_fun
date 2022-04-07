import cookie from 'react-cookies'

// Get current cookie
export const loginUser = () => {
  return cookie.load('userInfo')
}

// Login save cookie
export const onLogin = (user) => {
  cookie.save('userInfo', user, { path: '/' })
}

// logout，delete cookie
export const logout = () => {
  cookie.remove('userInfo')
  window.location.href = '/'
}