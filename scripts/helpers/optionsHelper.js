
export const OPTIONS_TYPE = {
    SMOKE: "smoke",
    LOAD_TESTING: "loadtesting",
    STRESS: "stress",
    SOAK: "soak",
    CAPACITY: "capacity",
    CAPACITY_SMALL: "capacitySmall",
    CAPACITY_FAST: "capacityFast"
};

export function getOptions(type) {

    let stages = [];
    let thresholds = {};
    switch (type) {
        // Comprobar el correcto funcionamiento de las grabaciones:
        case OPTIONS_TYPE.SMOKE:
            stages = [
                { target: 1 }
            ];
            thresholds = {
                http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
            };
            break;
        // Medir la respuesta en base a una carga de usuarios determinada
        case OPTIONS_TYPE.LOAD_TESTING:
            stages = [
                { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
                { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
                { duration: '5m', target: 0 }, // ramp-down to 0 users
            ];
            thresholds = {
                http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
            };
            break;
        // Ver qué sucede si rompemos los límites establecidos para la aplicación
        case OPTIONS_TYPE.STRESS:
            stages = [
                { duration: '2m', target: 100 }, // below normal load
                { duration: '5m', target: 100 },
                { duration: '2m', target: 200 }, // normal load
                { duration: '5m', target: 200 },
                { duration: '2m', target: 300 }, // around the breaking point
                { duration: '5m', target: 300 },
                { duration: '2m', target: 400 }, // beyond the breaking point
                { duration: '5m', target: 400 },
                { duration: '10m', target: 0 }, // scale down. Recovery stage.
            ];
            break;
        // Validar el comportamiento del sistema con una carga dada durante un largo período de tiempo
        case OPTIONS_TYPE.SOAK:
            stages = [
                { duration: '2m', target: 400 }, // ramp up to 400 users
                { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
                { duration: '2m', target: 0 }, // scale down. (optional)
            ];
            break;
        // Llegar a conocer el número de usuarios/transacciones que el sistema puede mantener.
        case OPTIONS_TYPE.CAPACITY:
            stages = [
                { duration: '4m', target: 100 },
                { duration: '4m', target: 200 },
                { duration: '4m', target: 300 },
                { duration: '4m', target: 400 },
                { duration: '4m', target: 500 },
                { duration: '4m', target: 600 },
                { duration: '4m', target: 700 },
                { duration: '4m', target: 800 },
                { duration: '4m', target: 900 },
                { duration: '4m', target: 1000 },
            ];
            thresholds = {
                http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
            };
            break;
        case OPTIONS_TYPE.CAPACITY_SMALL:
            stages = [
                { duration: '4m', target: 100 },
                { duration: '4m', target: 200 },
                { duration: '4m', target: 300 },
                // { duration: '1m', target: 50 },
                // { duration: '1m', target: 100 },
                // { duration: '1m', target: 150 },
                // { duration: '1m', target: 250 },
                // { duration: '1m', target: 300 },
                // { duration: '1m', target: 350 },
                // { duration: '1m', target: 400 },
                // { duration: '1m', target: 450 },
                // { duration: '1m', target: 500 },
                // { duration: '1m', target: 550 },
                // { duration: '1m', target: 600 },
                // { duration: '1m', target: 650 },
                // { duration: '1m', target: 700 },
                // { duration: '1m', target: 750 },
                // { duration: '1m', target: 800 },
                // { duration: '1m', target: 850 },
                // { duration: '1m', target: 900 },
                // { duration: '1m', target: 950 },
                // { duration: '1m', target: 1000 },
                // { duration: '1m', target: 1050 },
            ];
            thresholds = {
                http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
            };
            break;
        case OPTIONS_TYPE.CAPACITY_FAST:
            stages = [
                { duration: '6m', target: 500 },
            ];
            thresholds = {
                http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
            };
            break;
    }

    return {
        stages: stages,
        thresholds: thresholds
    };

    return [
        { target: 1, duration: '3s' },
        //stress:
        // { duration: '2m', target: 100 }, // below normal load
        // { duration: '5m', target: 100 },
        // { duration: '2m', target: 200 }, // normal load
        // { duration: '5m', target: 200 },
        // { duration: '2m', target: 300 }, // around the breaking point
        // { duration: '5m', target: 300 },
        // { duration: '2m', target: 400 }, // beyond the breaking point
        // { duration: '5m', target: 400 },
        // { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ];
}