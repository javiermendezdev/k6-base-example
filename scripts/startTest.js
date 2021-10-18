
import { check, sleep, group } from 'k6'
import http from "k6/http"
import * as optionsHelper from './helpers/optionsHelper.js'

export function setup() {
   //
}

export let options = optionsHelper.getOptions(__ENV.OPTIONS_TYPE);

export default () => {
    group('Test anything', () => {
        //Manual added endpoint
        let endpointTest = "https://localhost:8888/actuator/ping";
        let response = http.get(
            endpointTest,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                tags: {
                    name: 'test'
                }
            }
        );

        console.log(response.body);
        check(response, {
            'test - httpStatus is 200': (r) => r.status === 200,
        });

        return response;

    })
}