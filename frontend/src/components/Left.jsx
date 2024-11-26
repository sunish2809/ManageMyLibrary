import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Left.scss";
import notificationsIcon from "../assets/notifications_24dp_E8EAED_FILL0_wght100_GRAD0_opsz20.svg";
import calender from "../assets/calendar_month_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import leftarrow from "../assets/chevron_left_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import darkplus from "../assets/add_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24 copy.svg";
import plus from "../assets/add_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import inbox from "../assets/inbox_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import logout from "../assets/logout_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import setting from "../assets/settings_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import rightarror from "../assets/chevron_right_24dp_E8EAED_FILL0_wght100_GRAD0_opsz24.svg";
import "bootstrap/dist/css/bootstrap.min.css";
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
  rel="stylesheet"
/>;

//const API_URL = "http://localhost:3000"; // Adjust if necessary
const API_URL = "https://managemylibrary.onrender.com";

const Left = () => {
  const [shrink, SetShrink] = useState(false);
  const [name, SetName] = useState("");


  const navigate = useNavigate();
  const handleShrink = () => {
    SetShrink(true);
  };
  const handleshrinkback = () => {
    SetShrink(false);
  };
  const navigateToStudentList = () => {
    navigate("/app/studentList");
  };

  const navigateToSetting = () => {
    navigate("/app/setting");
  };
  const navigateToAddStudent = () => {
    navigate("/app/addStudent");
  };

const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        const response = await axios(`${API_URL}/api/userdetail`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });
        SetName(response.data.name); // Set tasks from API response
        //setIssue(false);
      } catch (error) {
        //setError(error.message || 'Error fetching tasks'); // Set error message
      }
    };

    fetchTodayTasks();
  }, []);





  const initial = name.length > 0 ? name[0].toUpperCase() : "";

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`${API_URL}/api/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Remove the task from the state after successful deletion
      SetProjectName(projectName.filter(project => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting task:', error.message);
      //setError('Error deleting task');
    }
  };


  return (
    <div
      className="appleft"
      style={{
        width: shrink === true ? "3%" : "",
        background: shrink === true ? "transparent" : "#fcfaf8",
      }}
    >
      <div
        className="shrink-expand"
        onClick={handleshrinkback}
        style={{ display: shrink === false ? "none" : "block" }}
      >
        <img src={rightarror} alt="left Icon" />
      </div>
      <div
        className="appleft__header"
        style={{ display: shrink ? "none" : "block" }}
      >
        <div className="appleft__header--items">
          <div className="admin">
            <div className="admin-initial">
              <div className="initial">{initial}</div>
            </div>
            <div className="admin-name">{name}</div>
          </div>
          <div className="admin-items">
            <div className="bell-icons">
              <img src={notificationsIcon} alt="Notifications Icon" />
            </div>
            <div className="shrink-expand" onClick={handleShrink}>
              <img src={leftarrow} alt="left Icon" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="appleft__body"
        style={{ display: shrink ? "none" : "block" }}
      >
        <div className="appleft__body--items">
          <button className="addtask-button" onClick={navigateToAddStudent}>
            <div className="addtask-icons">
              <div className="addtask-icon-adjust">
                <img
                  src={plus}
                  alt="plus Icon"
                  style={{ marginBottom: "3px" }}
                />
              </div>
            </div>
            <div className="addtask-name">Add Student</div>
          </button>
        </div>
        <div className="appleft__body--items" onClick={navigateToStudentList}>
          <div className="icons">
            <img src={inbox} alt="inbox Icon" />
          </div>

          <div className="icon-des">Student List</div>
        </div>
      </div>
      <div
        className="appleft__footer"
        style={{ display: shrink ? "none" : "block" }}
      >
        <div className="appleft__footer--items">
          <div className="footer-row" >
            <div className="setting-icon">
              <img src={setting} alt="setting Icon" />
            </div>
            <div className="settng-text" onClick={navigateToSetting}>Setting</div>
          </div>
          <div className="footer-row">
            <div className="logout-icon">
              <img src={logout} alt="logout Icon" />
            </div>
            <div className="logout-text" onClick={handleLogOut}>
              Logout
            </div>
          </div>
          <div className="footer-row-end">
            <div className="">© 2024 Company, Inc</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
