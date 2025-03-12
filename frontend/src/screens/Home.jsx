import React, { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import "../styles/Home.css";
import axios from "../config/axios";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");

  function handleProjectNameChange(e) {
    setProjectName(e.target.value);
  }

  function createProject(e) {
    e.preventDefault();

    if (!projectName.trim()) {
      setError("Project Name is required");
      return;
    }

    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("Creating Project: ", projectName);
    
    setProjectName("");
    setError("");
    setIsModalOpen(false);
  }

  return (
    <main className="home-container">
      <div className="projects-header">
        <h1>Your Projects</h1>
      </div>

      <div className="projects">
        <button className="project" onClick={() => setIsModalOpen(true)}>
          <p>New Project</p>

          <i className="ri-link"></i>
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            {error && <div className="modal-error">{error}</div>}

            <form onSubmit={createProject}>
              <div className="form-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={handleProjectNameChange}
                  placeholder="Enter project name"
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="create-btn">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
