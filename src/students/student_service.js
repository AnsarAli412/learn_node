const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;
const StudentModel = require('./student_model');


mongoose.connect('mongodb://localhost:27017/admin');
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDb');
});

app.use(bodyParser.json());


// post student
app.post('/students', async (req, res) => {
    try {
        const student = new StudentModel(req.body);
        const savedStudent = await student.save();
        let data = {
            "status": 201,
            "message": "Created",
            "data": savedStudent
        }
        res.status(201).json(data);
    } catch (error) {
        let data = {
            "status": 500,
            "message": error.message
        };
        res.status(400).json(data);
    }
});

// get students

app.get('/students', async (req, res) => {
    try {
        const students = await StudentModel.find();
        let data = {
            "status": 200,
            "message": "Ok",
            "data": students
        }
        res.status(200).json(data);
    }
    catch (error) {
        let data = {
            "status": 500,
            "message": error.message
        };
        res.status(500).json(data);
    }
})
// get single student
app.get('/students/:id', async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student do not found' });
        let data = {
            "status": 200,
            "message": "Ok",
            "data": student
        }
        res.status(200).json(data);
    }
    catch (error) {
        let data = {
            "status": 500,
            "message": error.message
        };
        res.status(500).json(data);
    }
});

// update student 

app.put('/students/:id', async(req, res) => {
  try{
    const updateStudent = StudentModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updateStudent) return res.status(404).json({ message: 'Student not found' });
    let data = {
        "status": 200,
        "message": "Ok",
        "data": updateStudent
    }
    res.json(data);
  }catch(e){
    res.status(500).json({message:e.message})
  }
});

// delete student

app.delete('/students/:id',async(req,res)=>{
    try{
        const deleteStudent = StudentModel.findByIdAndDelete(req.params.id);
    if(!deleteStudent) return res.status(404).json({message:"Student do not delete"});
    let data = {
        "status": 200,
        "message": "Deleted"
    }
    res.json(data);

    }
    catch(error){
        let data = {
            "status": 500,
            "message": error.message
        };
        res.status(500).json(data);
    }
})

app.listen(port, () => {
    console.log('server running at http://localhost:' + port + "/");
})