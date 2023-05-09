# Mercury

An (older) experiment with deno 1.13 and TypeScript.

# Requirements

1. Install [Docker](https://www.docker.com/)
1. Install [deno](https://deno.land/)

# Running

Local port defaults to `1993`. Run docker to serve:

```
$ docker build -t app . && docker run -it --init -p 8443:8443 app
```

### License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.

