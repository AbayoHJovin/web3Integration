import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./styles.css";

// Type for managing state values
type AppState = {
  account: string;
  name: string;
  displayName: string;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    account: "",
    name: "",
    displayName: "",
  });

  // Initialize Web3
  const web3 = new Web3(window.ethereum);

  // Request Ethereum account using MetaMask
  const loadAccount = async () => {
    if (window.ethereum) {
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setState((prevState) => ({ ...prevState, account: accounts[0] }));
    } else {
      alert("Please install MetaMask to interact with this DApp!");
    }
  };

  useEffect(() => {
    loadAccount();
  }, []);

  // Handle input changes for the name
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  // Display the entered name
  const displayNameHandler = () => {
    setState((prevState) => ({
      ...prevState,
      displayName: state.name,
    }));
  };

  return (
    <div className="app-container">
      <h1>Hello, Ethereum DApp!</h1>
      <p>Your Ethereum Account: {state.account || "Not connected"}</p>
      <input
        type="text"
        value={state.name}
        onChange={handleInputChange}
        placeholder="Enter your name"
      />
      <button onClick={displayNameHandler}>Display Name</button>
      {state.displayName && <h2>Hello, {state.displayName}!</h2>}
    </div>
  );
};

export default App;
