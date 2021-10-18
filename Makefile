default:
	@printf "$$HELP"

# Load Testing
loadtesting-docker-up:
	docker-compose stop && docker-compose up --build -d && docker-compose ps

loadtesting-clean-influxdb:
	curl -i -XPOST http://localhost:8086/query --data-urlencode "q=DROP DATABASE k6"


loadtesting-script:
	docker-compose run k6 run -e OPTIONS_TYPE=${options_type} /scripts/$(script)

# Admin portal
loadtesting-admin:
	docker-compose run k6 run -e OPTIONS_TYPE=${options_type} /scripts/startAdmin.js

# Healthchecks
loadtesting-healthchecks:
	docker-compose run k6 run -e OPTIONS_TYPE=${options_type} /scripts/startHealthchecks.js

# Test
loadtesting-test:
	docker-compose run k6 run -e OPTIONS_TYPE=${options_type} /scripts/startTest.js

define HELP
# Load Testing:
	- make loadtesting-docker-up\t Load docker
	- make loadtesting-clean-influxdb\t Clean data in influxdb
	- make loadtesting-script\t Load a custom script (relative filepath into /scripts/**) with options_type={smoke|soak|loadtesting|capacity}
	- make loadtesting-admin\t Load startAdmin.js for admin portal with options_type={smoke|soak|loadtesting|capacity}
	- make loadtesting-healthchecks\t Load startHealthchecks.js with options_type={smoke|soak|loadtesting|capacity}
# Others ..

 Please execute "make <command>". Example make help

endef

export HELP