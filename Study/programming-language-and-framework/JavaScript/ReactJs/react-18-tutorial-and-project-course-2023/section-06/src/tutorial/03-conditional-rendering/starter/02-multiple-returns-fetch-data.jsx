import { useEffect, useState } from "react";
const url = "https://api.github.com/users/QuincyLarson";

const MultipleReturnsFetchData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError(true);
        return;
      }
      const user = await response.json();
      console.log(user);
      setUser(user);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) return <h3>Loading ...</h3>;

  if (error || !user)
    return <h3>There was an error while fetching github user</h3>;
  return (
    <div>
      <h2>Fetch Data</h2>
      <img
        style={{ width: "150px", borderRadius: "25px" }}
        src={user.avatar_url}
        alt={user.login}
      />
      <h4>works at {user.company}</h4>
    </div>
  );
};
export default MultipleReturnsFetchData;
