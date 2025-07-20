-- ADD FOREIGN KEY COLUMNS TO STUDENT TABLE
-- alter table Student
-- add column qualificationId int not null,
-- add column gradeId int not null;

-- ADD FK 
-- alter table Student
-- add foreign key(qualificationId) references Qualification(qualificationId),
-- add foreign key(gradeId) references grade(gradeId);

-- ADD FOREIGN KEY COLUMNS TO QUALIFICATION TABLE
-- alter table Qualification
-- add column stId int not null,
-- add column gradeId int not null;

-- ADD FK
-- alter table qualification
-- add foreign key (stId) references student(stId),
-- add foreign key(gradeId) references grade(gradeId);

-- ADD FOREIGN KEY COLUMNS TO GRADE TABLE
-- alter table Grade
-- add column stId int not null,
-- add column qualificationId int not null;


-- ADD FK
-- alter table grade
-- add foreign key(stId) references Student(stId),
-- add foreign key(qualificationId) references Qualification(qualificationId);


-- REMOVE AND ADD FK--
-- REMOVE THE FK- qualification
-- show create table qualification;
-- alter table Qualification drop foreign key qualification_ibfk_2;

-- UPDATE THE ELEMENT
-- alter table student modify stId int not null auto_increment;-- 


-- REMOVE THE FK- grade
-- show create table grade; 
-- alter table grade drop foreign key grade_ibfk_1;

-- ADD FK 
-- alter table qualification
-- add constraint qualification_ibfk_2 foreign key(stId) references Student(stId);

-- SHOW QUALIFICATION
-- show create table qualification;

-- REMOVE THE FK - student
-- show create table student;
-- ALTER TABLE student DROP FOREIGN KEY stId;

-- drop database sms;
-- create database sms;
-- UPDATE THE ELEMENT
-- alter table student modify stId int not null auto_increment; 
-- alter table student modify qualificationId int; 

-- drop the grade fk
-- show create table grade;
-- alter table Grade drop foreign key grade_ibfk_2;