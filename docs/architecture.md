# Architecture

WebhookX is consists of three components, which are Admin, Proxy, and Worker. 

![architecture.png](/public/images/architecture.png)


### Components

#### Admin

Admin expose a RESTful API on port `:8080` for managing WebhookX entities.


#### Proxy

Proxy expose an HTTP server for receiving events.


#### Worker

Worker deliveries events to endpoints.


## Runtime Dependencies

WebhookX requires the following dependencies to work

- PostgreSQL 13+


- Redis 6.2+
