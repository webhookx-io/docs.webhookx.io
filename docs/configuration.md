# WebhookX Configuration

> [!TIP]
> Configuration can be provided through YAML file (`config.yml`) or environment variables with `WEBHOOKX_` prefix.

Note that environment variable takes higher priority than the one in the YAML file.

## Environment Variables

### General

#### role

Enable cluster mode. This allows some nodes in the cluster to run as the control plane
and others to run as the data plane.

Support values ares:

- `standalone`: disable cluster mode.
- `cp`: this node runs as the control plane. It connects to the database to provide entity management.
- `dp_proxy`: this node runs as the Proxy data plane.
- `dp_worker`: this node runs as the Worker data plane.



- Env: `WEBHOOKX_ROLE`

- Values: `standalone`, `cp`, ,`dp_worker`,`dp_proxy`.

- Default: `standalone`

#### anonymous_reports

Whether to send anonymous data such as version to WebhookX.

- Env: `WEBHOOKX_ANONYMOUS_REPORTS`
- Default: `true`

### Log

#### file

Log filename.

- Env: `WEBHOOKX_LOG_FILE`

- Default: `/dev/stdout`

#### level

Log level.

- Env: `WEBHOOKX_LOG_LEVEL`
- Values: `debug`,`info`,`warn`,`error`

- Default: `/dev/stdout`

#### format

Log format.

- Env: `WEBHOOKX_LOG_FORMAT`
- Values: `text`,`json`

- Default: `text`

### Access Log

#### file

Access Log filename.

- Env: `WEBHOOKX_ACCESS_LOG_FILE`

- Default: `/dev/stdout`

#### format

Access Log format.

- Env: `WEBHOOKX_ACCESS_LOG_FORMAT`
- Values: `text`,`json`

- Default: `text`

### Database

#### host

Postgres host.

- Env: `WEBHOOKX_DATABASE_HOST`

- Default: `localhost`

#### port

Postgres port.

- Env: `WEBHOOKX_DATABASE_PORT`

- Default: `5432`

#### username

Postgres username.

- Env: `WEBHOOKX_DATABASE_USERNAME`

- Default: `webhookx`

#### password

Postgres password.

- Env: `WEBHOOKX_DATABASE_PASSWORD`

#### database

Postgres database.

- Env: `WEBHOOKX_DATABASE_DATABASE`

- Default: `webhookx`

#### parameters

Postgres connection parameters.

- Env: `WEBHOOKX_DATABASE_PARAMETERS`

- Default: `application_name=webhookx&sslmode=disable&connect_timeout=10`

#### max_pool_size

Specifies the maximum number of connection to the Postgres server.

- Env: `WEBHOOKX_DATABASE_MAX_POOL_SIZE`

- Default: `40`

#### max_life_time

Specifies the maximum life time (in seconds) for a connection.

- Env: `WEBHOOKX_DATABASE_MAX_LIFE_TIME`

- Default: `1800`

### Redis

#### host

- Env: `WEBHOOKX_REDIS_HOST`

- Default: `localhost`

#### port

- Env: `WEBHOOKX_REDIS_PORT`

- Default: `6379`

#### password

- Env: `WEBHOOKX_REDIS_PASSWORD`

- Default:

#### database

- Env: `WEBHOOKX_REDIS_DATABASE`

- Default: `0`

### Admin

#### listen

address and ports on which the Admin interface should listen.

- Example: `localhost:8081`, `0.0.0.0:8081`
- Env: `WEBHOOKX_ADMIN_LISTEN`

- Default: `off`

#### debug_endpoints

- Env: `WEBHOOKX_ADMIN_DEBUG_ENDPOINTS`

- Default: `false`

#### tls.cert

Path to the SSL certificate.

- Env: `WEBHOOKX_ADMIN_TLS_CERT`
- Default: ``

#### tls.key

Path to the SSL certificate key.

- Env: `WEBHOOKX_ADMIN_TLS_KEY`
- Default: ``

### Status

#### listen

address and ports on which the Status interface should listen.

- Default: `127.0.0.1:8082`

#### debug_endpoints

- Env: `WEBHOOKX_STATUS_DEBUG_ENDPOINTS`

- Default: `true`

### Proxy

#### listen

address and ports on which the Proxy (Ingestion) interface should listen.

- Example: `localhost:8080`, `0.0.0.0:8080`
- Env: `WEBHOOKX_PROXY_LISTEN`

- Default: `off`

#### tls.cert

Path to the SSL certificate.

- Env: `WEBHOOKX_PROXY_TLS_CERT`
- Default: ``

#### tls.key

Path to the SSL certificate key.

- Env: `WEBHOOKX_PROXY_TLS_KEY`
- Default: ``

#### timeout_read

The maximum amount of time (in seconds) for reading the request.

- Env: `WEBHOOKX_PROXY_TIMEOUT_READ`
- Default: 10

#### timeout_write

The maximum amount of time (in seconds) before timing out writes of the response

- Env: `WEBHOOKX_PROXY_TIMEOUT_WRITE`
- Default: 10

#### max_request_body_size

The maximum request body size in bytes.

- Env: `WEBHOOKX_PROXY_MAX_REQUEST_BODY_SIZE`
- Default `1048576` (1 MB)

#### response.code

- Env: `WEBHOOKX_PROXY_RESPONSE_CODE`
- Default: `200`

#### response.content_type

- Env: `WEBHOOKX_PROXY_RESPONSE_CONTENT_TYPE`
- Default: `application/json`

#### response.body

- Env: `WEBHOOKX_PROXY_RESPONSE_BODY`
- Default: `{"message": "OK"}`

#### queue.type

Supported values are `redis`, `off`.

- Env: `WEBHOOKX_PROXY_QUEUE_TYPE`
- Default: `redis`

#### queue.redis.*

### Worker

#### enabled

Whether to enable the worker.

- Env: `WEBHOOKX_WORKER_ENABLED`

- Default: `false`

#### deliverer.timeout

The worker delivery timeout (in milliseconds).

- Env: `WEBHOOKX_WORKER_DELIVERER_TIMEOUT`
- Default: `60000`

#### pool.size

- Env: `WEBHOOKX_WORKER_POOL_SIZE`

- Default: `10000`

#### pool.concurrency

- Env: `WEBHOOKX_WORKER_POOL_SIZE`

- Default: Number of CPU * 100

### Metrics

#### attributes

Customized attributes for each metric

- Env: `WEBHOOKX_METRICS_ATTRIBUTES`
- Type: map
- Default:

#### exports

List of the enabled vendor exports. supported value is `opentelemetry` for now.

- Env: `WEBHOOKX_METRICS_EXPORTS`

- Type: array

- Default: `[]`

#### push_interval

Push interval (in seconds) at which metrics are sent to the OpenTelemetry Collector.

- Env: `WEBHOOKX_METRICS_PUSH_INTERVAL`

- Default: `10`

#### opentelemetry.protocol

Opentelemetry protocol. Supported values are `grpc`, `http/protobuf`.

- Env: `WEBHOOKX_METRICS_OPENTELEMETRY_PROTOCOL`
- Default: `http/protobuf`

#### opentelemetry.endpoint

Opentelemetry endpoint.

- Example: `http://localhost:4318/v1/metrics` for `http/protobuf` protocol, `localhost:4317` for `grpc` protocol.

- Env: `WEBHOOKX_METRICS_OPENTELEMETRY_ENDPOINT`
- Default: `http://localhost:4318/v1/metrics`

### Tracing

#### enabled

Whether to enable Tracing.

- Env: `WEBHOOKX_TRACING_ENABLED`

- Default: `false`

#### attributes

Customized attributes for each trace

- Env: `WEBHOOKX_TRACING_ATTRIBUTES`
- Type: map
- Default:

#### opentelemetry.protocol

Opentelemetry protocol. Supported values are `grpc`, `http/protobuf`.

- Env: `WEBHOOKX_TRACING_OPENTELEMETRY_PROTOCOL`
- Default: `http/protobuf`

#### opentelemetry.endpoint

Opentelemetry endpoint.

- Example: `http://localhost:4318/v1/traces` for `http/protobuf` protocol, `localhost:4317` for `grpc` protocol.

- Env: `WEBHOOKX_TRACING_OPENTELEMETRY_ENDPOINT`
- Default: `http://localhost:4318/v1/traces`

#### sampling_rate

Tracing instrumentation sampling rate. and `1.0` for 100%.

- Env: `WEBHOOKX_TRACING_SAMPLING_RATE`

- Default: `1.0`



## YAML

[config.yml](https://github.com/webhookx-io/webhookx/blob/main/config.yml).

```yaml
# ---------------------------
# WebhookX configuration file
# ---------------------------

log:
  file: /dev/stdout
  level: info   # supported values are debug, info, warn, and error.
  format: text  # supported values are "text" and "json"

access_log:
  file: /dev/stdout
  format: text  # supported values are "text" and "json"

database:
  host: localhost
  port: 5432
  username: webhookx
  password:
  database: webhookx
  parameters: 'application_name=webhookx&sslmode=disable&connect_timeout=10'  # The connection uri parameters.
                                                                              # See https://www.postgresql.org/docs/current/libpq-connect.html
  max_pool_size: 40                                                           # The maximum number of connections
  max_lifetime: 1800                                                          # The maximum lifetime (in seconds) of a connection

redis:
  host: localhost
  port: 6379
  password:
  database: 0

#------------------------------------------------------------------------------
# Cluster
#------------------------------------------------------------------------------
#role: standalone                   # Enables cluster mode.
                                    # This allows some nodes in the cluster to run as the control plane
                                    # and others to run as the data plane.
                                    #
                                    # supported values are:
                                    #
                                    # - `standalone`: disable cluster mode.
                                    # - `cp`: this node runs as the control plane.
                                    #   It connects to the database to provide entity management.
                                    # - `dp_proxy`: this node runs as the Proxy data plane.
                                    # - `dp_worker`: this node runs as the Worker data plane.

anonymous_reports: true             # sends anonymous data such as software version to WebhookX.

#------------------------------------------------------------------------------
# ADMIN
#------------------------------------------------------------------------------

admin:
  #listen: 127.0.0.1:8080
  #debug_endpoints: true             # enables debugging and profiling endpoints. see https://pkg.go.dev/net/http/pprof
  #tls:
  #  cert: /path/to/server.crt
  #  key: /path/to/server.key

#------------------------------------------------------------------------------
# STATUS
#------------------------------------------------------------------------------

status:
  listen: 127.0.0.1:8082
  debug_endpoints: true              # enables debugging and profiling endpoints. see https://pkg.go.dev/net/http/pprof

#------------------------------------------------------------------------------
# WORKER
#------------------------------------------------------------------------------

worker:
  enabled: false
  deliverer:
    timeout: 60000
  pool:
    size: 10000                     # pool size, default to 10000.
    concurrency: 0                  # pool concurrency, default to 100 * CPUs

#------------------------------------------------------------------------------
# PROXY
#------------------------------------------------------------------------------
proxy:
  #listen: 127.0.0.1:8081
  #tls:
  #  cert: /path/to/server.crt
  #  key: /path/to/server.key
  timeout_read: 10                  # read timeout (in seconds), 0 indicates unlimited.
  timeout_write: 60                 # write timeout (in seconds), 0 indicates unlimited.
  max_request_body_size: 1048576
  response:
    code: 200
    content_type: application/json
    body: '{"message": "OK"}'

  queue:
    type: redis                     # supported values are redis, off
    redis:
      host: localhost
      port: 6379
      password:
      database: 0

#------------------------------------------------------------------------------
# METRICS
#------------------------------------------------------------------------------
metrics:
  attributes:                                   # global attributes for each metric
    env: prod
  #exports: [ opentelemetry ]                   # list of enabled vendor exports. supported value are opentelemetry
  push_interval: 10                             # interval(in seconds) at which metrics are sent to the OpenTelemetry Collector
  opentelemetry:
    protocol: http/protobuf                     # supported value are http/protobuf, grpc
    endpoint: http://localhost:4318/v1/metrics  # http/protobuf(http://localhost:4318/v1/metrics), grpc(localhost:4317)

#------------------------------------------------------------------------------
# TRACING
#------------------------------------------------------------------------------
tracing:
  enabled: false
  attributes:                                   # global attributes for each trace
    env: prod
  sampling_rate: 1.0
  opentelemetry:
    protocol: http/protobuf                     # supported value are http/protobuf, grpc
    endpoint: http://localhost:4318/v1/traces   # http/protobuf(http://localhost:4318/v1/traces), grpc(localhost:4317)
```
