# Requirements

1. Install [Docker](https://www.docker.com/)
1. Install [deno](https://deno.land/)

# Running

Local port defaults to `1993`. Run docker to serve:

```
$ docker build -t app . && docker run -it --init -p 1993:1993 app
```

