const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

module.exports = function(){
    console.log(`Master ${process.pid} is running`);

    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });

    const workers = Object.keys(cluster.workers);

    function restartWorker(i) { //[2]
      if (i >= workers.length) return;
      const worker = cluster.workers[workers[i]];
      console.log(`Stopping worker: ${worker.process.pid}`);
      worker.disconnect(); //[3]

      worker.on('exit', () => {
        if (!worker.suicide) return;
        const newWorker = cluster.fork(); //[4]
        newWorker.on('listening', () => {
          restartWorker(i + 1); //[5]
        });
      });
    }
    restartWorker(0);
}