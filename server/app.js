var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.listen(process.env.PORT || 9002, function(){ console.log("IT'S OVER 9000!!!"); });

app.get("/", function(req, res){
  console.log("You Are in L");
  res.sendFile( path.resolve ("views/index.html") );
}); // end URL app.get

app.use(express.static('public'));

app.use(bodyParser.json());

mongoose.connect('localhost:27017/test');

// var Student = require('../models/assignments');

var studentSchema = new mongoose.Schema({
  student_name: String,
  assignment_number: Number,
  score: Number,
  date_completed: Date
});

var Student = mongoose.model('Student', studentSchema);

app.post('/studentAdded', function(req,res){

  var newStudent = new Student({
    student_name: req.body.student_name,
    assignment_number: req.body.assignment_number,
    score: req.body.score,
    date_completed: req.body.date_completed
  }); // end newStudent object

  newStudent.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('Student info has been saved successfully! Woohoo!!');
      res.sendStatus(200);
    } // end else
  }); // end newStudent save
}); // end post studentAdded

app.get( '/getStudents', function(req, res){
  Student.find().then( function(data){
  res.send(data);
  }); // end student.find
}); // end app.get
