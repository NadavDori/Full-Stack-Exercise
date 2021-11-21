import React from "react";
import "./styles/App.css";
import RepoList from "./components/RepoList";

function App() {
  return (
    <div>
      <div className="upperline"></div>
      <RepoList />
    </div>
  );
}

export default App;
