# CLI

The provided CLI (Command Line Interface) allows you to manage your WebhookX instances.




```sh
Usage:
  webhookx [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  migrations  
  start       Start server
  version     Print the version

Flags:
  -h, --help   help for webhookx

Use "webhookx [command] --help" for more information about a command.
```



## Global flags

All commands take a set of special, optional flags as arguments:

-   `-h`, `--help`: print the command’s help message

## Commands



### webhookx migrations

```sh
Usage:
  webhookx migrations [command]

Available Commands:
  reset       Reset the database
  status      Print the migration status
  up          Run any new migrations

Flags:
      --config string   The configuration filename
  -h, --help            help for migrations

Use "webhookx migrations [command] --help" for more information about a command.
```



### webhookx start

```sh
Start server

Usage:
  webhookx start [flags]

Flags:
      --config string   The configuration filename
  -h, --help            help for start
```



#### webhookx version

```sh
Print the version with a short commit hash.

Usage:
  webhookx version [flags]

Flags:
  -h, --help   help for version
```



