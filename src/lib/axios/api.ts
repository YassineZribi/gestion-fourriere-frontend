import axios from 'axios';
export { AxiosError, type AxiosResponse } from 'axios';
import { ACCESS_TOKEN_KEY, APPLICATION_JSON } from '../../utils/constants';

const baseURL = import.meta.env.VITE_API_URL

export function getFullResourcePath(resourcePath: string) {
    return baseURL + resourcePath;
}

const config = {
    baseURL,
    headers: {
        'Content-Type': APPLICATION_JSON,
    },
}

// Create a base instance without the authorization accessToken
export const PUBLIC_API = axios.create(config);

// Create a base instance with the authorization accessToken
export const PRIVATE_API = axios.create(config);

// Add an interceptor to the instance with the accessToken to attach the authorization header
PRIVATE_API.interceptors.request.use(
    (config) => {
        // Retrieve the accessToken from localStorage
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

        // If accessToken exists, attach it to the Authorization header
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
