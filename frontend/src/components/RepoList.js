import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import Repo from "./Repo";
import Alert from "./Alert";
// import ActionMenu from "./ActionMenu";

// Middleware
import axios from "axios";

// Styles
import "../styles/RepoList.css";

function RepoList() {
  const [repoList, setRepoList] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
  });
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [menuLocation, setMenuLocation] = useState({});

  // const dispalyMenu = (e) => {
  //   const tempBtn = e.target.getBoundingClientRect();
  //   const v = tempBtn.left - 150;
  //   const h = tempBtn.bottom + 3;
  //   setMenuLocation({ v, h });
  //   setIsMenuOpen(true);
  // };

  // const closeMenu = () => {
  //   setIsMenuOpen(false);
  // };

  const fetchRepos = async () => {
    const res = await axios.get("http://localhost:4200/");
    setRepoList(res.data.data);
  };

  const handleRefresh = () => {
    fetchRepos();
  };

  const deleteRepo = async (name) => {
    try {
      await axios.delete(`http://localhost:4200/${name}`);
      const newRepoList = repoList.filter((repo) => repo.name !== name);
      setRepoList(newRepoList);
      showAlert(true, "Repository deleted");
    } catch (err) {
      throw new Error(`Error deleting repo: ${err}`);
    }
  };

  const showAlert = (show = false, msg = "") => {
    setAlert({ show, msg });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <>
      <PageHeader handleRefresh={handleRefresh} />
      <div className="tbody-container">
        <table className="table">
          <tbody className="table-body">
            <tr>
              <th className="col-5">Repository Name</th>
              <th className="col-3">Public\Private</th>
              <th className="col-2">Git URL</th>
              <th className="col"></th>
            </tr>
            {repoList.map((repo) => {
              const { id, name, visibility, url, html_url } = repo;
              return (
                <Repo
                  key={id}
                  id={id}
                  name={name}
                  visibility={visibility}
                  url={url}
                  html_url={html_url}
                  deleteRepo={deleteRepo}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
    </>
  );
}

export default RepoList;
