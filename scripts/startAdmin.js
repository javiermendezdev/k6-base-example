
import { group, sleep } from 'k6'

import welcomeAdmin from './usecases/admin/welcomeAdmin.js'
import { options as welcomeAdminOptions } from './usecases/admin/welcomeAdmin.js'

import * as optionsHelper from './helpers/optionsHelper.js'
import * as apiAuthService from './services/auth/apiAuthService.js'

export function setup() {
    return {
        token: apiAuthService.authAdmin(),
    };
}


export let options = optionsHelper.getOptions(__ENV.OPTIONS_TYPE);


let optionsSum = {} // here we use the imported options to create a sum of options to run all tests
Object.entries(options.thresholds).forEach(item => optionsSum[item[0]] = item[1]);
// Extended options.thresholds:
Object.entries(welcomeAdminOptions.thresholds).forEach(item => optionsSum[item[0]] = item[1]);

options.thresholds = optionsSum;


export default (data) => {
    group('Portal - Admin Welcome', () => {
        welcomeAdmin(data.token);
        sleep(4)

        //More case of uses in admin ...
    })
}