# CLI

The provided CLI (Command Line Interface) allows you to manage your WebhookX instances.




```sh
Usage:
  webhookx [command]

Available Commands:
  admin       Admin commands
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  migrations  
  start       Start server
  version     Print the version

Flags:
  -h, --help      help for webhookx
      --verbose   Verbose logging.

Use "webhookx [command] --help" for more information about a command.
```



## Global flags

All commands take a set of special, optional flags as arguments:

- `-h`, `--help`: print the command’s help message
- `--verbose`: enable verbose logging.

## Commands

### webhookx admin

```sh
webhookx admin --help
Admin commands

Usage:
  webhookx admin [command]

Available Commands:
  dump        Dump entities to declarative configuration
  sync        Synchronize a declarative configuration to WebhookX.

Flags:
  -h, --help   help for admin

Global Flags:
      --verbose   Verbose logging.

Use "webhookx admin [command] --help" for more information about a command.
```

### webhookx migrations

```sh
$ webhookx migrations --help

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
$ webhookx start --help

Start server

Usage:
  webhookx start [flags]

Flags:
      --config string   The configuration filename
  -h, --help            help for start
```



### webhookx version

```sh
$ webhookx version --help

Print the version with a short commit hash.

Usage:
  webhookx version [flags]

Flags:
  -h, --help   help for version
```



