let startTime = null;

export function processTasks(tasks, batchSize) {
    startTime = Date.now();
    const taskQueue = [...tasks];
    let activeTasks = 0;

  function runNext() {
    if (activeTasks < batchSize && taskQueue.length > 0) {
      const task = taskQueue.shift();
      activeTasks++;
     
      task().then(() => {
        activeTasks--;
        runNext();
      });
    }

    if (taskQueue.length > 0) {
      setImmediate(runNext); // Continue processing in the next event loop cycle
    }
  }

  // Start processing initial batch
  for (let i = 0; i < batchSize; i++) {
    runNext();
  }
}

// Example Usage
const tasks = Array.from({ length: 100 }, (_, i) => () => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Task ${i + 1} completed`);
        if(i == 99) {
          console.log(`All tasks completed in ${(Date.now() - startTime) / 1000} seconds`);
        }
        resolve();
      }, 100);
    })
});

processTasks(tasks, 5); // Run tasks in batches of 5
