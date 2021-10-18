import http from "k6/http";
import { check, sleep, group } from "k6";

export function ping() {
    let response = http.get(
        __ENV.APP_URL + "/actuator/ping",
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            tags: {
                name: 'apiActuatorPing'
            }
        }
    );

    check(response, {
        'apiActuatorPing - httpStatus is 200': (r) => r.status === 200,
    });

    return response;
}

export function health() {
    let response = http.get(
        __ENV.APP_URL + "/actuator/health",
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            tags: {
                name: 'apiActuatorHealth'
            }
        }
    );

    check(response, {
        'apiActuatorHealth - httpStatus is 200': (r) => r.status === 200,
    });

    return response;
}