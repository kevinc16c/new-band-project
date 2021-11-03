import 'isomorphic-fetch';
import {config} from 'config'

export const api = {
    auth:{
        async login(data){
            const response = await fetch(config.URL_API + '/empleados/login',{
            // const response = await fetch(config.URL_API + '/empleados/login',{
              method: 'POST',
            //   type: 'no-cors',  
			  headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
			  },
			  body: JSON.stringify(data)
            });
            console.log(response)
            const responseData = await response.json();
            return responseData;
        },
        async getAuthenticatedUser() {
            const response = await fetch(config.URL_API + '/authenticated', {
                method: 'GET',
                headers: {'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`},
			});
            const data = await response.json();
            return data;
        },
    }
};