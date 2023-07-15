import axios from 'axios';

const axiosCustom = axios.create();

axiosCustom.interceptors.response.use(
    response => {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // Redirect to "/admin" route
            window.location.href = '/admin';
        }
        return Promise.reject(error);
    }
);

export default axiosCustom;
