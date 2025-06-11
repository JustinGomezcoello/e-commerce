// Función para obtener el token del localStorage
export const getToken = () => localStorage.getItem('token');

// Función para obtener la información del usuario del localStorage
export const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};

// Función para cerrar sesión
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
};

// Función para obtener headers con autorización
export const getAuthHeaders = () => {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}; 