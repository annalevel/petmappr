import axios from 'axios';

var currentToken = "";

export async function generateToken() {
    const uninterceptedClient = axios.create();
    const {data: {access_token: newToken}} = await uninterceptedClient.post(
        `${process.env.PETFINDER_API_BASE_URL}/oauth2/token`,
        `grant_type=client_credentials&client_id=${process.env.PETFINDER_API_KEY}&client_secret=${process.env.PETFINDER_API_SECRET}`
        );
    currentToken = newToken;
    return newToken;
}

// Insert auth headers into each external API request
axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${currentToken}`;
        return config;
    }
);

// Manage hourly token refreshes
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            return generateToken().then((token) => {
                currentToken = token;
                return axios(originalRequest);
            });
        }

        return Promise.reject(error);
    }
);

export default axios;