import {config} from 'config';
import { authHeader, handleResponse } from '../_helpers';

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.URL_API}/users`, requestOptions).then(handleResponse);
}