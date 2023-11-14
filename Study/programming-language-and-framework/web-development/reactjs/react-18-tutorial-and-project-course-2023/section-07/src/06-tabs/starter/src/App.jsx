import { useEffect, useState } from "react";
import JobInfo from "./JobInfo";

const url = "https://course-api.com/react-tabs-project";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const jobs = await response.json();
      setJobs(jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <section className="jobs-center">
        <div className="loading"></div>
      </section>
    );
  }

  return (
    <section className="jobs-center">
      {/* button container */}

      {/* jobs info */}
      <JobInfo jobs={jobs} />
    </section>
  );
};
export default App;
