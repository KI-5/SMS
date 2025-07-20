-- drop database sms;
create database sms;
use sms;
-- STUDENT TABLE
create table Student (
    stId int primary key auto_increment,
    fName varchar(100),
    lName varchar(100),
    email varchar(255),
    age int, 
    gender enum('F','M', 'Other'),  
    contactNo varchar(20)
);

-- COURSE TABLE
create table Course (
    courseId varchar(10) primary key,
    courseType enum('Bachelors','Certificate', 'Diploma','Advanced Diploma','Masters','PhD'),
    courseName varchar(100), 
    startingdate date, 
    endingdate date, 
    courseResult enum('Honours','Merit', 'Distinction','Pass','Fail')
);

-- STUDENT COURSE TABLE
create table Student_Course (
    stId int,
    courseId varchar(10), 
    primary key (stId, courseId),
    foreign key (stId) references Student(stId),
    foreign key (courseId) references Course(courseId)
);

-- MODULE TABLE
create table Module (
    moduleCode varchar(10) primary key, 
    moduleName enum('Mathematics','Computer Science', 'English Literature','Physics','Chemistry','Object-oriented programming','Cyber Security'),
    lecturer varchar(100), 
    credits int,
    courseId varchar(10), 
    foreign key (courseId) references Course(courseId)
);

-- STUDENT_MODULE TABLE
create table Student_Module (
    stId int,
    moduleCode varchar(10), 
    primary key (stId, moduleCode), 
    foreign key (stId) references Student(stId),
    foreign key (moduleCode) references Module(moduleCode)
);

-- RESULT TABLE
create table Result (
    resultId varchar(10) primary key,
    grade FLOAT,    
    date date 
);

-- 'Student_Result' tABL
create table Student_Result (
    resultId varchar(10),
    stId int,   
    primary key (resultId, stId), 
    foreign key (resultId) references Result(resultId),
    foreign key (stId) references Student(stId)
);

-- 'Module_Result' table S
create table Module_Result (
    resultId varchar(10),  
    moduleCode varchar(10),
    moduleadpp int,
    primary key (resultId, moduleCode), 
    foreign key (resultId) references Result(resultId),
    foreign key (moduleCode) references Module(moduleCode)
);
