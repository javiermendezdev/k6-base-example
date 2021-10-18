import http from "k6/http";
import { check } from "k6";


export function getList(token) {
    let response = http.get(
        __ENV.APP_URL + "/api/users?size=10&sort=firstname,asc",
        {
            headers: {
                Accept: "application/json",
                Authorization: token,
                "Content-Type": "application/json",
            },
            tags: {
                name: 'apiUsersList'
            }
        }
    );

    check(response, {
        'apiUsersList - httpStatus is 200': (r) => r.status === 200,
    });

    return response;
}