export const login = (username, password) => dispatch => {
    // Mock authentication with hardcoded credentials
    if (username === 'user' && password === 'pass') {
      dispatch({ type: 'LOGIN_SUCCESS', payload: { username } });
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
    }
  };
  
  export const logout = () => ({ type: 'LOGOUT' });