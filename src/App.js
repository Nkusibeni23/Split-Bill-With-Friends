import React, { useState } from "react";

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
  const [Friends, setFriends] = useState(initialFriends);
  const [show, setShow] = useState(false);
  const [isSelected, setIsSelected] = useState(null);

  function NewFriend(AddFriend) {
    setFriends([...Friends, AddFriend]);
  }

  function handleClick() {
    setShow(!show);
  }

  function handleShow(selectedFriend) {
    setIsSelected((prevSelectedFriend) =>
      prevSelectedFriend && prevSelectedFriend.id === selectedFriend.id
        ? null
        : selectedFriend
    );
  }

  function handleSplit(value) {
    if (!isSelected) {
      return;
    }

    const updatedFriends = Friends.map((friend) =>
      friend.id === isSelected.id
        ? { ...friend, balance: friend.balance + value.whoIsPaying }
        : friend
    );

    setFriends(updatedFriends);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friend
          Friends={Friends}
          onToggle={NewFriend}
          onSelected={handleShow}
          selectedFriend={isSelected}
        />
        {show ? <AddFriend onToggle={NewFriend} onClick={handleClick} /> : null}
        <Button onClick={handleClick}>{show ? "Close" : "Add Friend"}</Button>
      </div>
      {isSelected && (
        <SplitBill selectedFriend={isSelected} onCalculate={handleSplit} />
      )}
    </div>
  );
}

function Friend({ Friends, onToggle, onSelected, selectedFriend }) {
  return (
    <ul className="sidebar">
      {Friends.map((Friends) => (
        <FriendList
          key={Friends.id}
          Friends={Friends}
          onToggle={onToggle}
          onSelected={onSelected}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function FriendList({ Friends, onSelected, selectedFriend }) {
  const onChosen = () => {
    onSelected(Friends);
  };

  const isSelected = selectedFriend && Friends.id === selectedFriend.id;

  return (
    <li>
      <img src={Friends.image} alt={Friends.name} />
      <h3>{Friends.name}</h3>
      <p className="red">
        {Friends.balance > 0 && `You Owe ${Friends.name} ${Friends.balance}`}
      </p>
      <p className="green">
        {Friends.balance < 0 && `${Friends.name} Owes You ${Friends.balance}`}
      </p>
      <p>{Friends.balance === 0 && `You ${Friends.name} Are Even`}</p>
      <button className="button" onClick={onChosen}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function AddFriend({ onToggle }) {
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");

  function handleClick(e) {
    e.preventDefault();

    const NewFriend = {
      id: Date.now(),
      name: friendName,
      image: friendImage,
      balance: 0,
    };
    // console.log('NewFriend', NewFriend);
    onToggle(NewFriend);

    setFriendName("");
    setFriendImage("https://i.pravatar.cc/48");
  }

  return (
    <div className="sidebar">
      <form
        className="form-add-friend"
        onSubmit={(e) => {
          e.preventDefault();
          if (!friendName || !friendImage) return;
        }}
      >
        <label>Friend's Name</label>
        <input
          type="text"
          placeholder="Friend's Name"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        <label>Image URL</label>
        <input
          type="text"
          placeholder="Balance"
          value={friendImage}
          onChange={(e) => setFriendImage(e.target.value)}
        />
        <button className="button" onClick={handleClick}>
          New
        </button>
      </form>
    </div>
  );
}

// function SplitBill({ selectedFriend, onCalculate }) {
//   const [billValue, setBillValue] = useState("");
//   const [yourExpense, setYourExpense] = useState("");
//   const Expense = billValue - yourExpense;
//   const [whoIsPaying, setWhoIsPaying] = useState("");

//   // function handleSubmit(e) {
//   //   e.preventDefault();
//   // }

//   return (
//     <div className="app">
//       <form
//         className="form-split-bill"
//         onSubmit={(e) => {
//           e.preventDefault();
//           if (!billValue || !yourExpense || !whoIsPaying) {
//             alert("Fill The Form!");
//           } else {
//             return;
//           }
//         }}
//       >
//         <h2>Split Bill With {selectedFriend.name}</h2>
//         <label>Bill Value</label>
//         <input
//           type="number"
//           placeholder="Bill Value"
//           value={billValue}
//           onChange={(e) => setBillValue(Number(e.target.value))}
//         />
//         <label>Your Expense</label>
//         <input
//           type="number"
//           placeholder="Expense"
//           value={yourExpense}
//           onChange={(e) => setYourExpense(Number(e.target.value))}
//         />
//         <label>{selectedFriend.name}'s Expense</label>
//         <input type="number" disabled value={Expense > 0 ? Expense : 0} />
//         <label>Who is Paying The Bill</label>
//         <select
//           value={whoIsPaying}
//           onChange={(e) => setWhoIsPaying(e.target.value)}
//         >
//           <option value="friend">You</option>
//           <option value="user">{selectedFriend.name}</option>
//         </select>
//         <button className="button" onClick={onCalculate}>
//           SPLIT
//         </button>
//       </form>
//     </div>
//   );
// }

function SplitBill({ selectedFriend, onCalculate }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const Expense = billValue - yourExpense;
  const [whoIsPaying, setWhoIsPaying] = useState("");

  const handleSplit = () => {
    if (!billValue || !yourExpense) {
      alert("Fill The Form!");
    } else {
      onCalculate({
        whoIsPaying: whoIsPaying === "user" ? Expense : -Expense,
      });
    }
  };

  return (
    <div className="app">
      <form
        className="form-split-bill"
        onSubmit={(e) => {
          e.preventDefault();
          handleSplit();
        }}
      >
        <h2>Split Bill With {selectedFriend.name}</h2>
        <label>Bill Value</label>
        <input
          type="number"
          placeholder="Bill Value"
          value={billValue}
          onChange={(e) => setBillValue(e.target.value)}
        />
        <label>Your Expense</label>
        <input
          type="number"
          placeholder="Expense"
          value={yourExpense}
          onChange={(e) => setYourExpense(e.target.value)}
        />
        <label>{selectedFriend.name}'s Expense</label>
        <input type="number" disabled value={Expense > 0 ? Expense : 0} />
        <label>Who is Paying The Bill</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="friend">You</option>
          <option value="user">{selectedFriend.name}</option>
        </select>
        <button className="button" onClick={handleSplit}>
          SPLIT
        </button>
      </form>
    </div>
  );
}
