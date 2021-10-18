
import { group, sleep } from 'k6'


import * as apiActuator from './services/healthchecks/apiActuator.js'
import * as optionsHelper from './helpers/optionsHelper.js'


export function setup() {
   //
}


export let options = optionsHelper.getOptions(__ENV.OPTIONS_TYPE);

export default () => {
    group('Actuator', () => {
        apiActuator.ping();
        sleep(1);
        //apiActuator.health();
    })
    //sleep(1)
}