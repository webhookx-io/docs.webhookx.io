# Function: A Way of Handling Webhook Verification Chaos

Webhooks are used as callbacks to notify external systems when specific events occur. Verifying the authenticity of these events is crucial to ensure they were sent from the expected sender and have not been tampered with.



Signing events is the most common method for verifying the authenticity. The most widely adopted algorithm is HMAC (hash-based message authentication code), used by providers like GitHub, Slack, Shopify, and Stripe.



### How does signature work?

Typically, a signature is generated from the request body using `HMAC-SHA256` algorithm with a shared secret key, and is included in the request header. Here's what a webhook request might look like:

```
POST / HTTP/1.1
Host: example.com
Webhook-Signature: 757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17

{
    "event_type": "invoice.created",
    "data": {
        "id": "1f81eb52-5198-4599-803e-771906343485"
    }
}
```

> Some webhook providers add a timestamp in the request header to prevent replay attacks.

On the receiving side, the signature is regenerated using the same algorithm and secret key. If it doesn't match the signature in the request header, the request is deemed invalid and should be rejected.



In this article, we won’t dive into the HMAC algorithm itself. What's important to understand is that any modification to the request body will result in a different signature. Even if an attacker is able to intercept and tamper the request, they won’t be able to forge its signature without access to the secret.



Here are pseudocode examples of verifying signature for GitHub and Slack:

```
function verify_github_signature(request) {
	signature = "sha256=" + hmac("SHA-256", "signing key", request.body)
	return compare(signature, request.headers["X-Hub-Signature-256"])
}
```

```
function verify_slack_signature(request) {
	t = request.headers["X-Slack-Request-Timestamp"]
	if absolute_value(now() - t) > 5 minutes {
	  return false
	}
	signature = "v0=" + hmac("SHA-256", "signing key", fmt("v0:%d:%s", t, request.body))
	return compare(signature, request.headers["X-Slack-Signature"])
}
```

Although they both use  `HMAC` algorithm, the verification detail have some differences:

- Slack provides a timestamp header (`X-Slack-Request-Timestamp`) and includes it in the signing string to protect against replay attacks.
- The signature is included in different request headers and follows different formatting conventions.



### The Problem of Inconsistent Standards

Different webhook providers have different signature formats and implementations. The following table lists the differences among well-known providers in terms of formatting.

| Provider | Signature Header        | Signature Format                                            |
| -------- | ----------------------- | ----------------------------------------------------------- |
| GitHub   | `X-Hub-Signature-256`   | `sha256={signature in hex}`                                 |
| Slack    | `X-Slack-Signature`     | `v0={signature in hex}`                                     |
| Shopify  | `X-Shopify-Hmac-SHA256` | `{signature in base64}`                                     |
| Stripe   | `Stripe-Signature`      | `t={timestamp},v1={signature in hex},v0={signature in hex}` |

While developing signature verification for WebhookX, we realized it was difficult to design a unified DSL (domain-specific language) to support verification across all providers — unless they all conformed to a common standard, as proposed by Standard Webhooks.  Unfortunately, this standard was just released years ago and is not supported by any of the above providers yet.



Therefore, we turned to GPL (general-purpose language) approach as it offers maximum expressiveness. The language has to be embeddable, and should be fast and easy to learn.



Naturally, JavaScript became our top candidate.

### Introducing Function Plugin

The Function Plugin in WebhookX allows you to handle inbound requests using JavaScript (ECMAScript 5.1+). It can be used to implement things like signature verification and request body transformation.



Here's an example of verifying GitHub's signature using Function:

```javascript
function handle() {
  var bytes = webhookx.utils.hmac('SHA-256', "your signing secret", webhookx.request.getBody())
  var signature = "sha256=" + webhookx.utils.encode('hex', bytes)
  var signatureHeader = webhookx.request.getHeader("X-Hub-Signature-256")
  console.log(signature)
  if (!webhookx.utils.timingSafeEqual(signature, signatureHeader)) {
    webhookx.response.exit(400, { 'Content-Type': 'application/json' }, { message: 'invalid signature' })
  }
}
```

> `webhookx` is a global object that provides SDK functions for interacting with WebhookX itself. The SDK objects includes `webhookx.request`, `webhookx.utils`,` webhookx.response`, and `webhookx.log`.

Let's break down the code snippet.

The `handle()` function serves as the entry point for handling inbound requests.

**1. Generate the signature**

```javascript
var bytes = webhookx.utils.hmac('SHA-256', "your signing secret", webhookx.request.getBody())
var signature = "sha256=" + webhookx.utils.encode('hex', bytes)
```

- `webhookx.utils.hmac` computes the digest of data using `SHA-256` algorithm and a secret key. It returns the result as a `Uint8Array`.

- `webhookx.utils.encode` encodes the `Uint8Array` into a string using the specified encoding (in this case, hexadecimal).

**2. Compare the signatures**

```javascript
webhookx.utils.timingSafeEqual(signature, signatureHeader)
```

Compares the signature with the one in the header using a timing-safe comparison to avoid timing attacks.

**3. Reject the request if verification fails**

```javascript
webhookx.response.exit(400, { 'Content-Type': 'application/json' }, { message: 'invalid signature' })
```

If the signatures do not match, terminates the inbound request with HTTP 400, and a JSON response.



### Wrapping up

In this blog, we learned how the webhook signature works, and the gap between different webhook providers that makes it difficult to design a unified validation DSL. In the end, we also learned how to use the Function Plugin through a real-world example.



### Links

- [WebhookX](https://github.com/webhookx-io/webhookx)

- [Function Plugin](https://webhookx.io/docs/plugin/function/)
- [Standard Webhooks](https://www.standardwebhooks.com/)
