const mongoose= require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seatNumber: { type: Number, required: true, unique: true },
  mobileNumber: { type: String, required: true /*unique: true*/ },
  aadharNumber: { type: Number, required: true, /*unique: true */},
  paymentHistory: [
    {
      amountPaid: { type: Number, required: true },
      paymentDate: { type: Date, default: Date.now },
    },
  ], 
  dueDate: { type: Date, required: true },
  dueAmount:{ type: Number, required: true, /*unique: true */},
});

module.exports= mongoose.model("Student", studentSchema);
