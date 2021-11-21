import React from "react";

// Styles
import "../styles/Repo.css";

// Icons

import { IoMdCheckmarkCircle, IoLogoGithub, IoMdTrash } from "react-icons/io";
import { HiMinusCircle, HiDotsVertical } from "react-icons/hi";
import { MdSettings } from "react-icons/md";

function Repo({ name, visibility, url, html_url, deleteRepo }) {
  return (
    <tr>
      <td className="col-5">{name}</td>
      <td className="col-3 visibility">
        <span className="type-icon">
          {visibility === "public" ? (
            <IoMdCheckmarkCircle style={{ color: "#43cfa8" }} />
          ) : (
            <HiMinusCircle style={{ color: "#fa9425" }} />
          )}
        </span>
        {visibility}
      </td>
      <td className="col-2">
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </td>
      <td className="col" style={{ textAlign: "right", paddingRight: "2rem" }}>
        <div className="dropdown action-menu">
          <button
            className="action-btn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <HiDotsVertical style={{ fontSize: "1.3rem", cursor: "pointer" }} />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="manage-btn">
              <MdSettings className="manage-icon" />
              Manage Repo
            </li>
            <li className="suspend-btn">
              <IoLogoGithub className="suspend-icon" />
              Suspend in Github
            </li>
            <li className="delete-btn" onClick={() => deleteRepo(name)}>
              <IoMdTrash className="delete-icon" />
              Delete
            </li>
          </ul>
        </div>
        {/* <button type="button" onClick={() => deleteRepo(name)}>
          DELETE
        </button> */}
      </td>
    </tr>
  );
}

export default Repo;
