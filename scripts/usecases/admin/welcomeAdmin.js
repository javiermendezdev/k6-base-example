import {group } from "k6";
import * as apiAuthService from '../../services/auth/apiAuthService.js'
import * as optionsHelper from '../../helpers/optionsHelper.js'
import * as apiUsers from '../../services/api/apiUsers.js'

export let options = optionsHelper.getOptions(__ENV.OPTIONS_TYPE);
options.thresholds['http_req_duration{name:apiPeopleList}'] = ['avg<1000', 'max<5000'];

export function setup() {
    return apiAuthService.authAdmin();
}

export default function (token) {

    group(
        `Admin - Welcome page (/app/admin)`,
        function () {

            // List users:
            apiUsers.getList(token);

            // Maybe more actions ...
        }
    );
}
