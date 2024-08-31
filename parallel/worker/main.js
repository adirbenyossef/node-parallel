const { Worker } = require('worker_threads');
const os = require('os');
const { processTasks } = require('../bulk-sync-parallel');

// Get the number of CPU cores
const numCores = os.cpus().length;
const tasks = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));

let completedTasks = 0;
const startTime = Date.now();

// Function to create workers
function createWorker(task) {
    try {
        return new Promise((resolve) => {
            const worker = new Worker('./worker.js');
            worker.on('message', (message) => {
              console.log(message);
              completedTasks++;
              if (completedTasks === tasks.length) {
                console.log(`All tasks completed in ${(Date.now() - startTime) / 1000} seconds`);
              }
              resolve();
            });
            worker.postMessage(task);
          });
    } catch(e) {
        console.error(e);
    }
}

// Distribute tasks among the workers
async function distributeTasks() {
  const promises = [];
  for (let i = 0; i < tasks.length; i += numCores) {
    for (let j = 0; j < numCores && i + j < tasks.length; j++) {
        promises.push(createWorker(tasks[i + j]));
    }

    await Promise.all(promises);
  }
}

distributeTasks();