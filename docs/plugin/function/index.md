# Function

Function plugin allows using JavaScript (ECMAScript 5.1+) to customize inbound behavior, and implement features like signature verification and request body transformation.



## Syntax

```javascript
function handle() {
	// ...
}
```



## Examples



### Verify GitHub signature and transform event

```javascript
function handle() {
  // verify signature
  var bytes = webhookx.utils.hmac('SHA-256', "secret", webhookx.request.getBody())
  var signature = "sha256=" + webhookx.utils.encode('hex', bytes)
  var signatureHeader = webhookx.request.getHeader("X-Hub-Signature-256")
  console.log(signature)
  if (!webhookx.utils.digestEqual(signature, signatureHeader)) {
    webhookx.response.exit(400, { 'Content-Type': 'application/json' }, { message: 'invalid signature' })
  }
  // transform payload
  try {
    var obj = JSON.parse(webhookx.request.getBody())
    var event_type = webhookx.request.getHeader('X-GitHub-Event') + "." + obj.action
    webhookx.request.setBody(JSON.stringify({ event_type: event_type, data: obj }))
  } catch (e) {
    console.log(e)
    webhookx.response.exit(400, { 'Content-Type': 'application/json' }, { message: 'Invalid JSON' })
  }
}
```



### Verify Stripe signature and transform event

```javascript
function handle() {
  // verify signature
  let parsed = parse(webhookx.request.getHeader("Stripe-Signature"))

  var signedPayload = `${parsed.timestamp}.${webhookx.request.getBody()}`
  var bytes = webhookx.utils.hmac('SHA-256', "whsec_EE55F...", signedPayload)
  var exceptedSignature = webhookx.utils.encode('hex', bytes)

  var valid = false
  for (let signature of parsed.signatures) {
      if (webhookx.utils.timingSafeEqual(exceptedSignature, signature)) {
          valid = true
          break
      }
  }
  if (!valid) {
      webhookx.response.exit(400, {'Content-Type': 'application/json'}, {message: 'Invalid Signature'})
      return
  }

  // transform payload
  try {
      var obj = JSON.parse(webhookx.request.getBody())
      webhookx.request.setBody(JSON.stringify({event_type: obj.type, data: obj}))
  } catch (e) {
      console.log(e)
      webhookx.response.exit(400, {'Content-Type': 'application/json'}, {message: 'Invalid JSON'})
  }
}
```





## Configuration



::: code-group

```shell [Admin API]
curl -X POST 'http://localhost:8080/workspaces/default/plugins' \
--header 'Content-Type: application/json' \
--data '{
    "name": "function",
    "source_id": "{source_id}",
    "config": {
        "function": "function handle() { console.log('Hello World') }"
    }
}'
```

```yaml [Declarative]
sources:
  - name: default-source
    path: /
    methods: [ "POST" ]
    plugins:
      - name: function
        config:
          function: |
            function handle() { 
            	console.log('Hello World')
            }
```

:::



## Limitations

- The `require` is not supported.
- The execution runtime is limited to 1 second.
- The function script is limited to 1 MB.
- The execution runtime cannot perform any IO, or access any external resources such as the network or file system.



## Built-in functions

The following methods are supported out of the box.

- `JSON.parse()`

- `JSON.stringify()`

- `console.log()`

## Additional objects

The additional objects provides interaction with the internal functionality.

 

### webhookx.request

This module provides a set of functions for retrieving information from incoming requests.



#### webhookx.request.getHost()

Returns the hostname of the request. The value is either the value of the "Host" header or the hostname given in request URL itself.

**Returns**

- `string`: The hostname.

**Usage**

```javascript
/*
GET /path HTTP/1.1
Host: example.com
*/

webhookx.request.getHost() // "example.com"
```



#### webhookx.request.getMethod()

Returns the method of the request.

**Returns**

- `string`: The request method.

**Usage**

```javascript
/*
POST /path HTTP/1.1
*/

webhookx.request.getMethod() // "POST"
```



#### webhookx.request.getPath()

Returns the normalized path component of the request’s URL. 

**Returns**

- `string`: The normalized request URL path.

**Usage**

```javascript
/*
GET /api HTTP/1.1
Host: example.com
*/

webhookx.request.getPath() // "/api"
```



#### webhookx.request.getHeaders()

Returns an object containing all request headers.

**Returns**

- `object`: The request headers.

**Usage**

```javascript
/*
GET / HTTP/1.1
Host: example.com
X-Foo: bar1
X-Foo: bar2
*/

var headers = webhookx.request.getHeaders()
headers['Host']   // "example.com"
headers['X-Foo']  // "bar1,bar2"
```



#### webhookx.request.getHeader(name)

Returns the first value of the specified request header.



**Parameters**

- name (`string`): The name of the header to be returned.

**Returns**

- `string` | `null`: The value of the header that first occurrence, or `null` if not present.

**Usage**

```javascript
/*
GET / HTTP/1.1
Host: example.com
X-Foo: bar1
X-Foo: bar2
*/

webhookx.request.getHeader('Host') 				// "example.com"
webhookx.request.getHeader('X-Foo') 			// "bar1"
webhookx.request.getHeader('X-Unknown') 	// null
```



#### webhookx.request.getBody()

Returns the request body.

**Returns**

- `string`: The request body.

**Usage**

```javascript
/*
POST / HTTP/1.1
Content-Type: application/json

{"foo":"bar"}
*/

webhookx.request.getBody() // '{"foo":"bar"}'
```



#### webhookx.request.setBody(body)

Sets the request body.

**Parameters**

- body (`string`): The new body to be set. 

**Usage**

```javascript
webhookx.request.setBody('{"foo":"bar","key":"value"}')
```



### webhookx.response



#### webhookx.response.exit(status, headers, body)

Terminates a request with given response.

**Parameters**

- status (`number`): The response code.
- headers (`object` | `null`): The response headers.
- body (`object` | `string`): The response body. Passing object body will be converted to JSON.

**Usage**

```javascript
webhookx.response.exit(200, nil, 'OK')

webhookx.response.exit(200, 
  { 'Content-Type': 'application/json' }, 
  { message: 'OK' }
)
```



### webhookx.utils

This module provides a set of utility functions.



#### webhookx.utils.hmac(algorithm, key, data)

Computes the digest of data with the key using a hash algorithm.

**Parameters**

- algorithm (`string`): The hash algorithm. `SHA-1`, `SHA-256`, `SHA-512`, and `MD5` are supported.
- key (`string`): The key.
- data (`string`): The data.

**Returns**

- `Uint8Array`: The digest byte array.

**Usage**

```javascript
webhookx.utils.hmac('SHA-1', 'secret', 'string') // [238 138 201 13 45 114 136 90 66 71 248 106 221 234 76 60 41 164 203 164]
```



#### webhookx.utils.encode(encoding, data)

Encodes data with a encoding.

**Parameters**

- encoding (`string`): The available encoding are `hex`, `base64`, and `base64url`.
- data (`Uint8Array` | `string`): The data to be encoded.

**Returns**

- `string`: The encoded string.

**Usage**

```javascript
webhookx.utils.encode('hex', 'string') // 737472696e67
webhookx.utils.encode('hex', webhookx.utils.hmac('SHA-1', 'secret', 'string')) // ee8ac90d2d72885a4247f86addea4c3c29a4cba4
```



#### webhookx.utils.timingSafeEqual(str1, str2)

Returns whether `str1` is equal to `str2` in a timing-safe manner. 

>  Note: using constant-time string comparison can prevent timing attacks, especially regarding signature comparison.

**Parameters**

- str1 (`string`)
- str2 (`string`)

**Returns**

- `boolean`

**Usage**

```javascript
webhookx.utils.timingSafeEqual('foo', 'foo') // true
webhookx.utils.timingSafeEqual('foo', 'foobar') // false
```



### webhookx.log

This module provides a set of functions about log.



#### webhookx.log.LEVEL(message)

Writes message into WebhookX log using a log level. The supported levels are

- `webhookx.log.debug(message)`
- `webhookx.log.info(message)`
- `webhookx.log.warn(message)`
- `webhookx.log.error(message)`

**Usage**

```javascript
webhookx.log.debug("debug message")
webhookx.log.info("info message")
webhookx.log.warn("warn message")
webhookx.log.error("error message")
```
