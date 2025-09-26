# WebhookX

WebhookX is a lightweight and high-performance webhooks gateway that manages the entire webhook lifecycle. It is designed to be zero-loss, efficient, highly scalable, and low maintenance cost. 

WebhookX has been open-sourced from the day it was created.

WebhookX is licensed under the Apache 2.0 License.

## Key Features

### High Performance

Extensively uses caching and pooling techniques to optimize performance.

### Zero Loss

WebhookX ensures every ingested event will not be lost and is delivered reliably.

### Plugins

WebhookX comes with built-in inbound and outbound plugins for authentication and transformation. 

### Rate Limiting

Both endpoint and source entities can be configured to apply a rate limit policy on incoming and outgoing traffic. This prevents downstream and WebhookX itself from being overloaded.

### Multi-tenancy

Each workspace provides the isolation of entities, ensuring that traffic from one tenant does not interfere with another.

### Observability

Understanding the state of the system is critical to providing a reliable webhook infrastructure. WebhookX goes even further by giving you full visibility into every individual webhook request.

### Scalability

WebhookX can be scaled horizontally by running multiple instances or adopting the CP/DP architecture. In a cluster of CP/DP architecture, each node can operate in one of two roles: the Control Plane (CP), responsible for managing configuration, or the Data Plane (DP), which processes incoming and outgoing traffic.



## Posts

- [Introducing WebAssembly Plugin](https://docs.webhookx.io/blog/engineering/introducing-webassembly-plugin)
- [Function: A Way of Handling Webhook Verification Chaos](https://docs.webhookx.io/blog/engineering/function-a-way-of-handling-webhook-verification-chaos)

