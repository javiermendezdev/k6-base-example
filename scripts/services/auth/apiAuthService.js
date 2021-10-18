import http from "k6/http";
import { check } from "k6";

export function auth(authBasic) {
    let response = http.post(__ENV.AUTH_URL + '/token?grant_type=client_credentials'
        , {}
        , {
            headers: {
                'Authorization': 'Basic ' + authBasic
            },
            tags: {
                name: 'authserviceGetToken'
            }
        }
    );

    check(response, {
        'authserviceGetToken is status 200': r => r.status === 200,
        'authserviceGetToken is access token present': r => r.json().hasOwnProperty('access_token'),
        'authserviceGetToken access token is not undefined': r => (r.json()['access_token'] !== undefined),
    });

    return response.json()['access_token'];
}


export function authAdmin() {
    return auth(__ENV.AUTH_BASIC_ADMIN);
}

