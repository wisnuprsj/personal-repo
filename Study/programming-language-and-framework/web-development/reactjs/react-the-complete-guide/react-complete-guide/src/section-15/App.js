import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback((taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    fetchTasks(
      {
        url: `${process.env.REACT_APP_FIREBASE}/tasks.json`,
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

// import React from 'react';
// import BackwardCounter from './components/BackwardCounter';
// import ForwardCounter from './components/ForwardCounter';

// function App() {
//   return (
//     <React.Fragment>
//       <ForwardCounter />
//       <BackwardCounter />
//     </React.Fragment>
//   );
// }

// export default App;
