# Overview
JSONSchema Validator plugin allows you to validate the event request body before delivery to the endpoint. With predefined a [JSON Schema](https://json-schema.org/overview/what-is-jsonschema) definition, it ensures that the incoming data adheres to the expected structure and format, enhancing data integrity and reliability. 

If the validation fails, the event will not be delivered to the endpoint, and an error response will be returned to the sender.


# Validation
## Request Body Structure Requirement
The request body is expected to be a JSON object with the following structure:

```json
{
    "event_type": "string",
    "data": { }
}
```

- The `data` field will be validated against the corresponding JSON Schema defined for the `event_type`, if no schema is defined for the `event_type`, the `default_schema` will be used if provided. if neither is available, the request will be considered valid.
- The plugin is suggested to be used together with the [Function](../function/index.md) plugin to transform the payload into the expected structure before validation. 


## Request Body JSON Schema Definition
1. `draft`: the JSON Schema draft version, currently supports `6`.
2. `default_schema` (optional): a default JSON Schema to be used when the `event_type` does not define a specific schema.
3. `schemas`: the JSON Schemas definitions mapped by `event_type`, where each key is an `event_type` and the value is the corresponding JSON Schema.

| Parameter       | Type   | Required | Description                                      | Default|
| --------------- | ------ | -------- | ------------------------------------------------ |--------|
| draft           | string | Yes      | The JSON Schema draft version                    | `6`    |
| default_schema  | object | No       | A default JSON Schema to use for same definitions of multiple `event_type` |  `null`   |
| schemas         | object | Yes      | A mapping of event types to their corresponding JSON Schemas. | `{event_type:jsonschema}` |

# Examples

## Configuration Example
```yaml
plugins:
  - name: jsonschema-validator
    config:
      draft: "6"
      default_schema: |
        {
            "type": "object",
            "properties": {
                "id": { "type": "string" },
                "created_at": { "type": "string", "format": "date-time" }
            },
            "required": ["id", "created_at"]
        }
      schemas:
        user.created: |
            {
                "type": "object",
                "properties": {
                    "user_id": { "type": "string" },
                    "email": { "type": "string", "format": "email" }
                },
                "required": ["user_id", "email"]
            }
```

## Event Request Body Example
```json
{
    "event_type": "user.created",
    "data":{
        "user_id": "uuid-1234",
        "email": "test@example.com"
    }
}
```


# Configuration

::: code-group

```shell [Admin API]
curl -X POST 'http://localhost:8080/workspaces/default/plugins' \
--header 'Content-Type: application/json' \
--data '{
    "name": "jsonschema-validator",
    "source_id": "{source_id}",
    "config": {
        "draft": "6",
        "schemas": {
            "user.created": {
                "type": "object",
                "properties": {
                    "id": { "type": "string" },
                    "amount": { "type": "integer", "minimum": 1 },
                    "currency": { "type": "string", "minLength": 3, "maxLength": 6 }
                },
                "required": ["id", "amount", "currency"]
            }
    }
}'
```

```yaml [Declarative]
sources:
  - name: default-source
    path: /
    methods: ["POST"]
    plugins:
      - name: "jsonschema-validator"
        config:
          draft: "6"
          schemas:
            charge.succeeded:
              schema: |
                {
                  "type": "object",
                  "properties": {
                      "id": { "type": "string" },
                      "amount": { "type": "integer", "minimum": 1 },
                      "currency": { "type": "string", "minLength": 3, "maxLength": 6 }
                  },
                  "required": ["id", "amount", "currency"]
                }

```
:::

## Limitations
- Only supports JSON request bodies with `Content-Type: application/json`.
- Only validates JSON request bodies that contain both `event_type` and `data` fields.
- Only supports JSON Schema defintions up to [Draft 6](https://json-schema.org/draft-06), other drafts are WIP.



