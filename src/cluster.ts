import cluster from 'cluster';
import os from 'os';

export class Cluster {
  static register(callback): void {
    if (!cluster.isWorker) {
      console.log(`Master server started on ${process.pid}`);

      // ensure workers exit cleanly
      process.on('SIGINT', function () {
        console.log('Cluster shutting down...');
        for (const id in cluster.workers) {
          cluster.workers[id].kill();
        }
        process.exit(0);
      });

      const cpus = os.cpus().length;

      for (let i = 0; i < cpus; i++) {
        cluster.fork();
      }
      cluster.on('online', function (worker) {
        console.log('Worker %s is online', worker.process.pid);
      });
      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      callback();
    }
  }
}
