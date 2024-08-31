import { asyncTasks } from './tasks';

export function forkJoin(tasks) {
    //Fork: start all task in parallel
    const promises = Promise.all(tasks);

    return promises.then(result => {
        console.log('all tasks completed:', result);
        return result;
    }).catch(error => {
        console.log('something went wrong', error)
        return null;
    });
}

console.log(forkJoin(asyncTasks)) //print all tasks completed: [ 'Result + 1', 'Result + 2', 'Result + 3' ]