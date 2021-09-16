interface Config {
  connectionsFilePath: string;
  operationsFilePath: string;
  logstashBinPath: string;
}

const config: Config = {
  connectionsFilePath: "connections.json",
  operationsFilePath: "operations.json",
  logstashBinPath: "C:\\logstash-7.7.1\\logstash-7.7.1\\bin",
};

export default config;
