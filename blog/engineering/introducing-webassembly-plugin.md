# Introducing WebAssembly Plugin

There are many dimensions to software, one of which is extensibility. Achieving well extensibility without significantly compromising performance is a challenge that many software face.



This is where WebAssembly comes in.

### What is WebAssembly?

WebAssembly (abbreviated Wasm) is a binary instruction format designed for efficient execution and compact representation. Its primary goal is to enable applications to run at near-native performance on the Web.



WebAssembly was first announced in 2015 and officially released in 2017. Every major browser has fully supported it since then. As its name suggests, WebAssembly is akin to an assembly language for the web, designed to be executed by users' web browsers.

### How does it work?

![wasm execution](/public/images/post/img-wasm-execution.png)

The Wasm runtime is a sandboxed environment that executes Wasm programs. Popular runtimes include V8 (browsers), Wasmtime, Wasmer, Wasm3, and WasmEdge.



Wasm has been adopted on the web in applications, such as AutoCAD, Figma, Photoshop, and WordPress.

It also supports non-web environments. Perhaps this is the most exciting part — running code that compiled from various programming language. This technology has been widely adopted by the industry, like Wasm-Proxy in Envoy, Cloudflare Workers, and Edge Computing.

### How does WebAssembly work with WebhookX?

> WebhookX is a fast, reliable, and cloud-native webhooks gateway, offering features like routing, automatic retries, multi-tenancy, observability, and plugins.

Previously, users found it challenging to customize the delivery request, while the plugin system is already there. Naturally, we introduce the WebAssembly as a Plugin.



The delivery request can now be fully customized via Wasm Plugin to implement custom features like:

- Authentication
- Customize signature
- Request headers customization & Request payload transformation



The plugin execution is shown below

![plugin execution](/public/images/post/img-plugin-execution.png)

As we can see there is a runtime inside the Wasm Plugin, which I've explained before.



What is ABI? How does the Host interact with Wasm Modules?



Well, WebAssembly itself defines:

- Bytecode format and its execution semantics
- The ways of Wasm Module to export and import functions

That’s about it. Everything else is up to the implementation. Hence, we need ABI (Application Binary Interface) as a calling convention between two programs.



In WebAssembly, an ABI specification usually defines

- Functions that exposed by the Host
- Callbacks that provide to the Host
- Data types



The Host interacts with Wasm Modules by calling callbacks, and the module can also invoke the host functions


![plugin execution](/public/images/post/img-host-wasm-interact-flow.png)

### Hello, WebAssembly Plugin

Let's explore more by writing a simple Wasm Plugin.



Many programming languages can be compiled to Wasm Module, such as AssemblyScript, C++, Go, and Rust.  Here is an example in Go that transforms the delivery requests to a hardcoded one

```go
package main

import "unsafe"

// the main function is required by compiler
func main() {}

const OK = 0
const Debug = 0

//go:wasmimport env get_request_json
func getRequestJson(returnValueData unsafe.Pointer, returnValueSize unsafe.Pointer) int32
//go:wasmimport env set_request_json
func setRequestJson(value string) int32
//go:wasmimport env log
func log(logLevel int32, str string) int32

func ptrToString(p uintptr, size int32) string {
	return unsafe.String((*byte)(unsafe.Pointer(p)), size)
}

//go:wasmexport allocate
func allocate(size int32) *byte {
	buf := make([]byte, size)
	return &buf[0]
}

//go:wasmexport transform
func transform() int32 {
	var requestJsonPtr int32  // var to store json pointer
	var requestJsonSize int32 // var to store json size

	// uses unsafe.Pointer to get its generic pointer type so can be access by the Host
	status := getRequestJson(unsafe.Pointer(&requestJsonPtr), unsafe.Pointer(&requestJsonSize))
	if status != OK { return 0 }

	// cast to string
	requestJson := ptrToString(uintptr(requestJsonPtr), requestJsonSize)

	log(Debug, requestJson)

	json := `{"url":"https://httpbin.org/anything","method":"POST","headers":{"foo":"bar"},"payload":"{}"}`
	status = setRequestJson(json) // set the new request
	if status != OK { return 0 }

	return 1
}

```

This program exposes required callbacks `transform` and `allocate` via directive `go:wasmexport`.

- `transform`: the entry point of module to implement custom logic
- `allocate`: allocate continuous memory buffer using the in-VM memory allocator

The program imports functions `get_request_json` , `set_request_json` , and `log` from the host via directive `go:wasmimport`.

#### Compile to WebAssembly

> Note: Go >= 1.24 is required to compile the example, as it uses features like `go:wasmexport` and `string` parameter that were introduced in Go 1.24.



```
GOOS=wasip1 GOARCH=wasm go build -buildmode=c-shared -o main.wasm
```

#### Enable Wasm Plugin

```
curl http://localhost:8080/workspaces/default/plugins \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "wasm",
    "endpoint_id": "{endpoint_id}",
    "config": {
        "file": "/path/to/main.wasm"
    }
}'
```

#### Test it

Any events routing to the endpoint will be sent to `https://httpbin.org/anything`, with method `POST`, headers `Foo: bar`, and payload `{}`.

### Conclusion

In this article, we learned what WebAssembly and ABI is, and how it works with WebhookX. We also learned how to write a Wasm Plugin.



For more examples of Wasm Plugin, see [webhookx/examples](https://github.com/webhookx-io/webhookx/tree/main/examples).

### Resources

- [webassembly.org](https://webassembly.org/)

- [WebhookX WebAssembly Plugin](https://github.com/webhookx-io/webhookx/blob/main/pkg/plugin/wasm/README.md)
- [WebAssembly Plugin ABI specification](https://github.com/webhookx-io/webhookx/tree/main/pkg/plugin/wasm/versions)

- WebAssembly in production

  - [WebAssembly in Snapchat](https://eng.snap.com/cross_platform_messaging_experience)

  - [WebAssembly in Figma](https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/)

