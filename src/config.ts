interface Config {
  connectionsFilePath: string;
  syncsFilePath: string;
  logstashBinPath: string;
}

const config: Config = {
  connectionsFilePath: "connections.json",
  syncsFilePath: "syncs.json",
  logstashBinPath: "C:\\logstash-7.7.1\\logstash-7.7.1\\bin",
};

export default config;
