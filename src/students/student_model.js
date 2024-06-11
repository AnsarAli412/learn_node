const  mongoose  = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:String,
    password:String
});

const StudentModel = mongoose.model('StudentModel', ItemSchema);

module.exports = StudentModel;

