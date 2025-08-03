.PHONY: run
run:
	npm run docs:dev

.PHONY: build
build:
	npm run docs:build

.PHONY: preview
preview:
	npm run docs:preview

.PHONY: oy2j
oy2j:
	npx openapi-format https://raw.githubusercontent.com/webhookx-io/webhookx/refs/heads/main/openapi.yml -o ./docs/openapi/openapi.json