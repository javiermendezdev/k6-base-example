# K6 proyecto base ejemplo

Este es un proyecto super sencillo con k6 para basarse en él y poder realizar pruebas de cargar sobre proyectos un poco más reales.

Sería necesario un proyecto con urls reales a configurar en el .env y adaptadas al código de la carpeta scripts.

## Lanzar load-testing

``` bash
docker-compose up --build -d
```

Con este comando se lanza grafana, influxdb y k6, este último usará el script scripts/start.js para lanzar las pruebas que tenga grabadas sobre el proyecto.

Hará falta configurar el dashboard de grafana para ver los datos correctamente.

### Configurar Dashboard Grafana

De momento es un poco manual, habría que ver la manera de automatizarlo cuando se levanta/construye el contenedor.

Usar => docker/k6-load-testing-results_rev3.json para crear el dashboard

http://localhost:3000/dashboard/import
Añadir el json anterior.
Seleccionar app_loadtesting.
Presionar import.

## Scripts

Todos los scripts están enlazados en el Makefile

## Ejemplos test

```bash
/*

EXAMPLES TESTS:

// >>>>>>>>>>>>>>>>>>>>>> Smoke Test (https://k6.io/docs/test-types/smoke-testing):
export let options = {
  vus: 1,  // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  }
};

// >>>>>>>>>>>>>>>>>>>>> Load Testing (https://k6.io/docs/test-types/load-testing):
export let options = {
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

// >>>>>>>>>>>>>>>>>>>>> Stress Testing (https://k6.io/docs/test-types/stress-testing):
export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

// >>>>>>>>>>>>>>>>>>>>> Soak Testing (https://k6.io/docs/test-types/soak-testing):
export let options = {
  stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
};

*/
```