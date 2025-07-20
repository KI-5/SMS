-- use sms;
-- show create table student_course;
-- ALTER TABLE Student_Course MODIFY COLUMN stId INT NOT NULL;
-- ALTER TABLE Student_Course MODIFY COLUMN courseId VARCHAR(10) NOT NULL;

-- drop database sms;

-- create database sms;
use sms;
CREATE TABLE Student (
    stId int PRIMARY KEY AUTO_INCREMENT,
    fName varchar(100),
    lName varchar(100),
    email varchar(255),
    age int, 
    gender enum('F','M','Other'),  
    contactNo varchar(20)
);