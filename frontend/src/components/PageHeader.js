import React from "react";

// Styles
import "../styles/PageHeader.css";

// Icons
import { IoLogoGithub } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";

function PageHeader({ handleRefresh }) {
  return (
    <div className="thead-container">
      <table className="table">
        <thead>
          <tr>
            <td className="col">
              <IoLogoGithub className="github-logo" />
            </td>
            <td className="col-10">
              <h3>My GitHub Repositories</h3>
            </td>
            <td className="col">
              <button
                className="btn btn-light btn-refresh"
                onClick={handleRefresh}
              >
                <BiRefresh className="refresh-icon" />
                Refresh
              </button>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default PageHeader;
