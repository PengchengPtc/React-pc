const TOKEN_KEY = "geek_pc";
// 定义三个token操作函数并返回
const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export { getToken, setToken, clearToken };
