import { useState } from "react";

const UseStateArray = () => {
  const [users, setUsers] = useState([
    { id: "u1", name: "John" },
    { id: "u2", name: "Nami" },
    { id: "u3", name: "Robin" },
  ]);

  const removeUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const removeAllUser = () => {
    setUsers([]);
  };

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h4>{user.name}</h4>
            <button type="button" onClick={() => removeUser(user.id)}>
              remove
            </button>
          </div>
        );
      })}
      <button type="button" onClick={removeAllUser}>
        remove all users
      </button>
    </div>
  );
};

export default UseStateArray;
