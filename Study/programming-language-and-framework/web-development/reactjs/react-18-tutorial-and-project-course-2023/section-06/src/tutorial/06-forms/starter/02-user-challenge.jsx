import { useEffect, useState } from "react";
import { data } from "../../../data";

const UserChallenge = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(data);
    setUsers(data);
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const submitUser = (e) => {
    e.preventDefault();
    setUsers((prevUsers) => [...prevUsers, { id: crypto.randomUUID(), name }]);
    setName("");
  };

  const removeUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div>
      <form className="form" onSubmit={submitUser}>
        <h4>Add User</h4>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-input"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <button type="submit" className="btn btn-block" disabled={!name}>
          submit
        </button>
      </form>
      {/* render users below */}

      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} -{" "}
              <button
                className="btn btn-danger"
                onClick={() => removeUser(user.id)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default UserChallenge;
