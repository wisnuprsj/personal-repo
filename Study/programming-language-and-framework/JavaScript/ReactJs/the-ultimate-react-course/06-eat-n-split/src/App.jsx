import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const showAddFriendForm = () => {
    return setShowAddFriend((prevState) => !prevState);
  };

  const addFriendHandler = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };

  const handleSelection = (friend) => {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  };

  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
          friends={friends}
        />
        {showAddFriend && <FormAddFriend addFriend={addFriendHandler} />}
        <Button onClick={showAddFriendForm} type="button">
          {!showAddFriend ? "Add friend" : "Close"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <FriendItem
          selectedFriend={selectedFriend}
          onSelection={onSelection}
          key={friend.id}
          friend={friend}
        />
      ))}
    </ul>
  );
}

function FriendItem({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  const selectFriend = () => {
    onSelection(friend);
  };
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={selectFriend} type="button" className="button">
        {!isSelected ? "Select" : "Close"}
      </Button>
    </li>
  );
}

function Button({ children, type, onClick }) {
  return (
    <button type={type} className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ addFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const imageChangeHandler = (event) => {
    setImage(event.target.value);
  };

  const submitAddFriend = (event) => {
    event.preventDefault();

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    setName("");
    setImage("https://i.pravatar.cc/48");

    addFriend(newFriend);
  };

  return (
    <form className="form-add-friend" onSubmit={submitAddFriend}>
      <label>🙋‍♂️Friend name</label>
      <input type="text" value={name} onChange={nameChangeHandler} />

      <label>🖼️ Image URL</label>
      <input type="text" value={image} onChange={imageChangeHandler} />

      <Button type="submit" className="button">
        Add
      </Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const changeBillHandler = (event) => {
    setBill(Number(event.target.value));
  };

  const changeExpenseHandler = (event) => {
    setPaidByUser((prevExpense) => {
      let newExpense = Number(event.target.value);
      if (newExpense > bill) return paidByUser;
      return newExpense;
    });
  };

  const changeWhoIsPayingHandler = (event) => {
    setWhoIsPaying(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" value={bill} onChange={changeBillHandler} />

      <label>🕴️ Your expense</label>
      <input type="text" value={paidByUser} onChange={changeExpenseHandler} />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={changeWhoIsPayingHandler}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button type="submit" className="button">
        Split bill
      </Button>
    </form>
  );
}
