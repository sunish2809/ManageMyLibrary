
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AppContent.css";
//import ChangeKey from "./ChangeKey";

//const API_URL = "http://localhost:3000"; // Adjust if necessary
const API_URL = "https://managemylibrary.onrender.com"


const AppContent = () => {
    const navigate = useNavigate();
  const [studentsList, setStudentsList] = useState([]);
  const [studentData, setStudentData] = useState({
    name: "",
    seatNumber: "",
    mobileNumber: "",
    aadharNumber: "",
    paymentHistory: [{ amountPaid: ""}],
    dueDate:"",
    dueAmount: "",
  });
  const [searchName, setSearchName] = useState("");
  const [students, setStudents] = useState([]);
  const [paymentUpdate, setPaymentUpdate] = useState({
    seatNumber: "",
    amountPaid: "",
    dueAmount:"",
    dueDate:"",
  });
  const [deleteData, setDeleteData] = useState({
    name: "",
    seatNumber: "",
  });



  // Handle input changes for student data
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  // Handle payment history input changes
  const handlePaymentHistoryChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      paymentHistory: [{ ...studentData.paymentHistory[0], [name]: value }],
    });
  };


  // Handle payment update input changes
  const handlePaymentUpdateChange = (e) => {
    const { name, value } = e.target;
    setPaymentUpdate({ ...paymentUpdate, [name]: value });
  };

  // Handle delete student input changes
  const handleDeleteChange = (e) => {
    const { name, value } = e.target;
    setDeleteData({ ...deleteData, [name]: value });
  };

  // Add a new student
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/api/add`,
        studentData,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you have token stored in localStorage
            }
        }
      );
      alert(response.data.message);
      setStudentData({
        name: "",
        seatNumber: "",
        mobileNumber: "",
        aadharNumber: "",
        paymentHistory: [{ amountPaid: ""}],
        dueDate:"",
        dueAmount: "",
      });
      fetchStudentsList(); // Refresh the students list
    } catch (error) {
      const errMsg = error.response
        ? error.response.data.message
        : "Error adding student";
      alert(errMsg);
      console.error(errMsg);
    }
  };

  // Search student by name
  const searchStudentByName = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_URL}/api/getStudent/${searchName}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you have token stored in localStorage
            }
        }
      );
      setStudents(response.data);
      setSearchName("");
    } catch (error) {
      const errMsg = error.response
        ? error.response.data.message
        : "Error fetching students";
      alert(errMsg);
      console.error(errMsg);
    }
  };

  // Update student payment
  const updatePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/api/update/${paymentUpdate.seatNumber}`,
        {
          amountPaid: paymentUpdate.amountPaid,
          dueAmount:paymentUpdate.dueAmount,
          dueDate:paymentUpdate.dueDate,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you have token stored in localStorage
            }
        }
      );
      alert(response.data.message);
      setPaymentUpdate({ seatNumber: "", amountPaid: "",dueAmount:"" ,dueDate:""});
      fetchStudentsList(); // Refresh the students list
    } catch (error) {
      const errMsg = error.response
        ? error.response.data.message
        : "Error updating payment";
      alert(errMsg);
      console.error(errMsg);
    }
  };

  // Delete a student
  const deleteStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${API_URL}/api/deleteStudent/${deleteData.seatNumber}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you have token stored in localStorage
            }
        }
      );
      alert(response.data.message);
      setDeleteData({seatNumber: "" });
      fetchStudentsList(); // Refresh the students list
    } catch (error) {
      const errMsg = error.response
        ? error.response.data.message
        : "Error deleting student";
      alert(errMsg);
      console.error(errMsg);
    }
  };

  // Close student details
  const closeStudentDetails = (studentId) => {
    setStudents(students.filter((student) => student._id !== studentId));
  };

  // Fetch all students' names and seat numbers
  const fetchStudentsList = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/allStudent`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you have token stored in localStorage
        }
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

  const [changeKey, SetChangeKey] = useState(false);

  const handleChangeKey = () => {
    SetChangeKey(true);
  };
  const handleClose = () => {
    SetChangeKey(false);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <React.Fragment>
      <div>
        <header className="dashboard-header">
          <h1 className="title">Library Management System</h1>
          <div className="header-options">
            {/* <button onClick={handleChangeKey} className="changekey-button">
              Change Key
            </button> */}
            <button onClick={handleLogOut} className="logout-button">
              Logout
            </button>
          </div>
        </header>
        <div className="main-container">
          <div className="left-section">
            {/* Add Student Form */}
            <div className="left-divide-add">
              <form className="form add-student-form" onSubmit={addStudent}>
                <h2 className="form-title">Add Student</h2>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Name"
                  value={studentData.name}
                  onChange={handleStudentChange}
                  required
                />
                <input
                  type="number"
                  name="seatNumber"
                  className="input"
                  placeholder="Seat Number"
                  value={studentData.seatNumber}
                  onChange={handleStudentChange}
                  required
                />
                <input
                  type="text"
                  name="mobileNumber"
                  className="input"
                  placeholder="Mobile Number"
                  value={studentData.mobileNumber}
                  onChange={handleStudentChange}
                  required
                />
                <input
                  type="text"
                  name="aadharNumber"
                  className="input"
                  placeholder="Aadhar Number"
                  value={studentData.aadharNumber}
                  onChange={handleStudentChange}
                  required
                />
                <input
                  type="number"
                  name="amountPaid"
                  className="input"
                  placeholder="Amount Paid"
                  value={studentData.paymentHistory[0]?.amountPaid || ""}
                  onChange={handlePaymentHistoryChange}
                  required
                />
                <div className="input-duedate">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  className="input"
                  placeholder="Due Date"
                  value={studentData.dueDate}
                  onChange={handleStudentChange}
                  required
                />
                </div>
                <input
                  type="number"
                  name="dueAmount"
                  className="input"
                  placeholder="Due Amount"
                  value={studentData.dueAmount}
                  onChange={handleStudentChange}
                  required
                />
                <button className="button" type="submit">
                  Add Student
                </button>
              </form>
              {changeKey && <ChangeKey handleClose={handleClose}></ChangeKey>}
            </div>

            <div className="left-divide">
              {/* Search Student Form */}
              <form className="form search-form" onSubmit={searchStudentByName}>
                <h2 className="form-title">Search Student by Seat Number</h2>
                <input
                  type="text"
                  className="input"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Enter Seat Number"
                  required
                />
                <button className="button" type="submit">
                  Search
                </button>
              </form>

              {/* Search Results */}
              {students.length > 0 && (
                <div className="student-results">
                  <h3 className="results-title">Search Results:</h3>
                  {students.map((student) => (
                    <div key={student._id} className="student-item">
                      <div className="student-header">
                        <p className="student-info">Name: {student.name}</p>
                        <p className="student-info">
                          Seat Number: {student.seatNumber}
                        </p>
                        <p className="student-info">
                          Mobile Number: {student.mobileNumber}
                        </p>
                        <p className="student-info">
                          Aadhar Number: {student.aadharNumber}
                        </p>
                        <p className="student-info">
                          Due Amount: {student.dueAmount}
                        </p>
                      </div>
                      <div className="student-details">
                        <h4 className="payment-history-title">
                          Payment History:
                        </h4>
                        {student.paymentHistory.map((payment, index) => (
                          <p key={index} className="payment-info">
                            ₹{payment.amountPaid} (Paid on:{" "}
                            {new Date(payment.paymentDate).toLocaleDateString()}
                            )
                          </p>
                        ))}
                        {student.paymentHistory.length > 0 && (
                          <p className="expiry-info">
                            Expiry Date: {new Date(student.dueDate).toLocaleDateString("en-GB")}
                          </p>
                        )}
                      </div>
                      <button
                        className="close-button"
                        onClick={() => closeStudentDetails(student._id)}
                      >
                        &#10005;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Update Payment Form */}
              <form
                className="form update-payment-form"
                onSubmit={updatePayment}
              >
                <h2 className="form-title">Update Payment</h2>
                <input
                  type="number"
                  name="seatNumber"
                  className="input"
                  placeholder="Seat Number"
                  value={paymentUpdate.seatNumber}
                  onChange={handlePaymentUpdateChange}
                  required
                />
                <input
                  type="number"
                  name="amountPaid"
                  className="input"
                  placeholder="Amount Paid"
                  value={paymentUpdate.amountPaid}
                  onChange={handlePaymentUpdateChange}
                  required
                />
                <input
                  type="number"
                  name="dueAmount"
                  className="input"
                  placeholder="Due Amount"
                  value={paymentUpdate.dueAmount}
                  onChange={handlePaymentUpdateChange}
                  required
                />
                <div className="input-duedate">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  className="input"
                  placeholder="Due Date"
                  value={paymentUpdate.dueDate}
                  onChange={handlePaymentUpdateChange}
                  required
                />
                </div>
                <button className="button" type="submit">
                  Update Payment
                </button>
              </form>

              {/* Delete Student Form */}
              <form
                className="form delete-student-form"
                onSubmit={deleteStudent}
              >
                <h2 className="form-title">Delete Student</h2>
                <input
                  type="number"
                  name="seatNumber"
                  className="input"
                  placeholder="Seat Number"
                  value={deleteData.seatNumber}
                  onChange={handleDeleteChange}
                  required
                />
                <button className="button" type="submit">
                  Delete Student
                </button>
              </form>
            </div>
          </div>

          {/* All Students List */}

          <div className="right-section">
            <div className="students-list-container">
              <h2>All Students</h2>
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

                      const daysLeft = Math.ceil((parsedDate - new Date()) / (24 * 60 * 60 * 1000));
                      const isExpiringSoon = daysLeft !== null && daysLeft <= 3;


                    return (
                      <div
                        key={student.seatNumber}
                        className={`student-row ${
                          isExpiringSoon ? "highlight-expiry" : ""
                        }`}
                      >
                        <div className="student-name">{student.name}</div>
                        <div className="student-seatnumber">
                          {student.seatNumber}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppContent;
