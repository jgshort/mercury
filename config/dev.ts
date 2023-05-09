const config = {
  isDev: true,
  server: {
    port: 8443,
    //certFile: './localhost.crt',
    //keyFile: './localhost.key',
    alpnProtocols: [
      "h2",
      "http/1.1"
    ]
  }
};

export { config }
