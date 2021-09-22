import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import * as path from "path";
import { Operation } from "../data/models";
import OperationStatus from "../data/models/OperationStatus";
import { ConnectionsStore, OperationsStore } from "../data/stores";

const runs: {
  [key: number]: {
    process: ChildProcessWithoutNullStreams;
    operation: Operation;
  };
} = {};
const DRIVER_PATH = path.resolve(
  path.join("src", "logstash", "postgres", "import", "postgresql-42.2.16.jar")
);

const operationsStore = new OperationsStore();

export function start(options) {
  //   const operation = new Operation(options);
  const operation = new Operation();
  const logstashConfigFilePath = path.resolve(
    path.join("src", "logstash", "postgres", "import", "logstash-postgres.conf")
  );
  const logstashBinPath = "C:\\logstash-7.7.1\\logstash-7.7.1\\bin";
  const cp = spawn("logstash.bat", ["-f", logstashConfigFilePath], {
    cwd: logstashBinPath,
    env: {
      DRIVER_PATH,
      //   PGHOST: operation.originConnection.host,
      PGDATABASE: operation.originDatabase,
      //   PGUSER: operation.originConnection.username,
      //   PGPASSWORD: operation.originConnection.password,
      TABLE_NAME: operation.originTable,
      //   ES_HOST: operation.targetConnection.host,
      //   ES_PORT: `${operation.targetConnection.port}`,
      ES_INDEX: operation.targetIndex,
    },
  });
  operation.start = new Date();
  operation.status = OperationStatus.Running;
  operation.pid = cp.pid;

  runs[cp.pid] = { process: cp, operation };
  operationsStore.add(operation);
  console.log(`PID: ${cp.pid}`);
  cp.stdout.on("data", (data) => {
    const info: string = data.toString();
    console.log(info);
    if (info.includes("[ERROR]")) {
      console.error(info);
      console.log("Found error, shutting down");
      cp.kill();
    }
  });

  cp.on("exit", (code) => {
    console.log(`child process exited with code ${code}`);
    if (code == 0) {
      console.log("Done successfully");
    } else {
      console.log("Process failed");
    }
  });
}

export function test() {
  const connectionStore = new ConnectionsStore();

  const options = {
    originConnectionId: "44b92c01-9565-4792-8ff7-fa1d9da8ccae",
    targetConnectionId: "71d3bedd-bc54-42b9-857d-ddb77c726f18",
    originTable: "actor",
    originDatabase: "dvdrental",
    targetIndex: "docs2",
    type: "import",
  };

  start(options);
}
