const { parentPort } = require('worker_threads');

parentPort.on('message', (task) => {
  // Simulate the asynchronous task
  setTimeout(() => {
    parentPort.postMessage(`Task ${task.id} completed`);
  }, 100);
});