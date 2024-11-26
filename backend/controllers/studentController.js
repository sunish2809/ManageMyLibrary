const User = require("../models/User");
const Student = require("../models/Student");

exports.addStudents = async (req, res) => {
  let {
    name,
    seatNumber,
    mobileNumber,
    aadharNumber,
    paymentHistory,
    dueDate,
    dueAmount,
  } = req.body;

  // Validation
  if (
    !name ||
    !seatNumber ||
    !mobileNumber ||
    !aadharNumber ||
    !paymentHistory ||
    !dueDate ||
    !dueAmount
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  name = name.trim().replace(/\s+/g, " ");
  seatNumber = parseInt(seatNumber);
  mobileNumber = mobileNumber.trim().replace(/\s+/g, "");

  try {
    // Create and save the student in the database
    const newStudent = new Student({
      name,
      seatNumber,
      mobileNumber,
      aadharNumber,
      paymentHistory,
      dueDate,
      dueAmount,
    });
    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Seat number must be unique" });
    } else {
      res.status(500).json({ message: "Error adding student", error });
    }
  }
};

exports.updateStudent = async(req, res) =>{
    const { seatNumber } = req.params;
    const { amountPaid } = req.body;
    const {dueAmount} = req.body;
    const {dueDate}= req.body;

    if (amountPaid === undefined || dueAmount===undefined||dueDate===undefined) {
        return res.status(400).json({ message: "Please provide amountPaid and dueAmount" });
    }

    try {
        // Find the student by seat number
        const student = await Student.findOne({ seatNumber: parseInt(seatNumber) });

        if (!student) {
        return res.status(404).json({ message: "Student not found" });
        }

        // Update the student's payment history and due amount
        student.paymentHistory.push({ amountPaid });
        student.dueAmount = dueAmount;
        student.dueDate= dueDate;

        // Save the updated student document
        await student.save();

        res.json({ message: "Payment and due amount updated successfully", student });
    } catch (error) {
        res.status(500).json({ message: "Error updating payment and due amount", error });
    }
}

exports.getStudent = async(req, res)=>{
    const { seatNumber } = req.params;

    try {

        const students = await Student.find({
        seatNumber: parseInt(seatNumber),
        });

        if (!students.length) {
        return res
            .status(404)
            .json({ message: "No students found with that name" });
        }

        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error });
    }
}

exports.deleteStudent= async(req, res)=>{
    const { name, seatNumber } = req.params;

    if ( !seatNumber) {
    return res
        .status(400)
        .json({ message: "Please provide seatNumber" });
    }

    try {
    // Find and delete the student by name and seatNumber
    const deletedStudent = await Student.findOneAndDelete({
        seatNumber: parseInt(seatNumber),
    });

    if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent,
    });
    } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
    }

}

exports.getAllStudent = async(req, res) =>{
    try {
    const students = await Student.find({}, { name: 1, seatNumber: 1, paymentHistory: 1, dueDate:1,_id: 0 });

    if (!students.length) {
        return res.status(404).json({ message: "No students found" });
    }

    res.json(students);
    } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
    }
}
