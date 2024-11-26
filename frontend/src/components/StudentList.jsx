import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentList.css";
//import ChangeKey from "./ChangeKey";

const API_URL = "http://localhost:3000"; // Adjust if necessary

const StudentList = () => {
  const [studentsList, setStudentsList] = useState([]);

  const fetchStudentsList = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/allStudent`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you have token stored in localStorage
        },
      });
      setStudentsList(response.data);
    } catch (error) {
      console.error("Error fetching students list:", error);
      if (error.response && error.response.status === 401) {
        alert("Invalid secret key. Please sign in again.");
        //onLogout();
      }
    }
  };
  useEffect(() => {
    fetchStudentsList();
  }, []);
  return (
    <div className="right-section">
      <div className="students-list-container">
        <h2>Students List</h2>
        <div className="students-list">
          <div className="student-row">
            <div className="column-title">Name</div>
            <div className="column-title">Seat Number</div>
          </div>
          {studentsList
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((student) => {
              const expiryDate = student.dueDate;
              const parsedDate = Date.parse(expiryDate);

              const daysLeft = Math.ceil(
                (parsedDate - new Date()) / (24 * 60 * 60 * 1000)
              );
              const isExpiringSoon = daysLeft !== null && daysLeft <= 3;

              return (
                <div
                  key={student.seatNumber}
                  className={`student-row ${
                    isExpiringSoon ? "highlight-expiry" : ""
                  }`}
                >
                  <div className="student-name">{student.name}</div>
                  <div className="student-seatnumber">{student.seatNumber}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
