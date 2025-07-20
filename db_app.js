
// NO ARRAY
// const { error } = require('console');
//express js module import
const express=require('express');
//.initialise express applicatino
const app=express();

// port
const PORT=3000;
//parse json data
app.use(express.json());
app.use(express.static(__dirname));


app.get('/',(req,res)=>{
    res.send('Testing');
});



// START OF SEQUELIZE----------------------------------------------------------------------


// // sequelize
const Sequelize=require('sequelize');
const sequelize = new Sequelize('sms','xxx','xxx',{host:'localhost',dialect:'mysql'});


// test connection with db
sequelize.authenticate().then(()=>{
    console.log('Connection done!');
}).catch((error)=>{
    console.error("Can't connect", error);
});


// sequelize.sync({ force: true }).then(() => {
//   console.log('DB and tables created!');
//   app.listen(PORT, () => console.log(`working on port ${PORT}`));
// });



let studentsArray=[];
let coursesArray=[];
let gradesArray=[];
let modulesArray=[];

let studentCounter=1;
// let courseCounter=1;
// let gradeCounter=1;
// let moduleCounter=1;

const findById = (array, id) => array.find(item => item.id === id);

// // START OF SEQUELIZE
// //define the entities
const {DataTypes} = require('sequelize');
const { type } = require('os');

// // student
// const Student=sequelize.define('Student', {
//     stId:{
//         type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true,
//         allowNull:false
//     },
//     fname:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },
//     lname:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },
//     email:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },
//     age:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },
//     gender:{
//         type:DataTypes.STRING,
//         allowNull:true
//     },
//     contactNo:{
//         type:DataTypes.STRING,
//         allowNull:true
//     }
    
// },
//    { freezeTableName:true}
// );

// Sequelize model - Student only (adjusted to match your SQL schema)
const Student = sequelize.define('Student', {
  stId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fName: {  // note: match casing with your DB
    type: DataTypes.STRING,
    allowNull: false,
  },
  lName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('F', 'M', 'Other'),
    allowNull: true,
  },
  contactNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { freezeTableName: true });

// Sync only Student table:
sequelize.sync({ force: true }).then(() => {
  console.log('DB and Student table created!');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Simple POST route to create Student only
app.post('/students', async (req, res) => {
  try {
    const { fName, lName, email, age, gender, contactNo } = req.body;
    const ageInt = parseInt(age);

    const student = await Student.create({ fName, lName, email, age: ageInt, gender, contactNo });
    res.status(201).json(student);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Server error creating student' });
  }
});



// // course
const Course=sequelize.define('Course', {
  
    courseId:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    courseType:{
        type:DataTypes.STRING,
        allowNull:true
    },
    courseName:{
        type:DataTypes.STRING,
        allowNull:true
    },
    startingDate:{
        type:DataTypes.DATE,
        allowNull:true
    },
    endingDate:{
        type:DataTypes.DATE,
        allowNull:true
    },
    courseResult:{
        type:DataTypes.STRING,
        allowNull:true
    }
},
    { freezeTableName:true}
);


//grade
const Result=sequelize.define('Result', {
    resultId:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false},
    grade:{
        type: DataTypes.FLOAT,
        allowNull: true
    },
    date:{type:DataTypes.DATE,
            allowNull:true}
},
    { freezeTableName:true}
);



// module
const Module=sequelize.define('Module', {
    moduleCode:{
        type:DataTypes.STRING,primaryKey:true,
        allowNull:false},
    moduleName:{
        type: DataTypes.STRING,
        allowNull: true
    },
    instructor:{type:DataTypes.STRING,
            allowNull:true},
    credits:{type:DataTypes.INTEGER,
            allowNull:true},
    courseId:{type:DataTypes.STRING,
        allowNull:false}
},
    { freezeTableName:true}
);



// student module
const Student_Module=sequelize.define('Student_Module',{
    stId:{type:DataTypes.INTEGER,primaryKey:true,
            allowNull:false},
    moduleCode:{type:DataTypes.STRING,primaryKey:true,
            allowNull:false}
},
    {freezeTableName:true}
);


// student course
const Student_Course=sequelize.define('Student_Course',{
    stId:{type:DataTypes.INTEGER, primaryKey:true,
    allowNull:false},
    courseId:{type:DataTypes.STRING,
        allowNull:false}
},
    { freezeTableName:true}
);


// student result
const Student_Result=sequelize.define('Student_Result',{
    resultId:{type:DataTypes.STRING,primaryKey:true,
            allowNull:false},
    stId:{type:DataTypes.INTEGER,
            allowNull:false}
},
    { freezeTableName:true}
);


// module result
const Module_Result=sequelize.define('Module_Result',{
    resultId:{type:DataTypes.STRING,primaryKey:true,
            allowNull:false},
    moduleCode:{type:DataTypes.STRING,primaryKey:true,
            allowNull:false}
},
    { freezeTableName:true}
);



// ASSOCIATIONSS--------------------------
// student wuth course 
Student.belongsToMany(Course,{through:Student_Course,foreignKey:'stId'});
Course.belongsToMany(Student,{through:Student_Course,foreignKey:'courseId'});
// student module
Student.belongsToMany(Module,{through:Student_Module,foreignKey:'stId'});
Module.belongsToMany(Student,{through:Student_Module,foreignKey:'moduleCode'});
// result with student module
Result.belongsToMany(Student,{through:Student_Result,foreignKey:'resultId'});
Result.belongsToMany(Module,{through:Module_Result,foreignKey:'resultId'});
// student with the rest
Student.hasMany(Student_Result,{foreignKey:'stId'});
Module.hasMany(Module_Result, { foreignKey: 'moduleCode'});
Module_Result.belongsTo(Module, { foreignKey: 'moduleCode'});



// // synchronizes all the defined models to the db
// sequelize.sync({force:true}).then(()=>{
//     console.log('DB nad tables created!');
// })

// END OF SEQUELIZE



//GET all students
// app.get('/students', (req,res)=>{
//     res.json(studentsArray);
// });

// GET METHOD----------------------------------------------
app.get('/students',async(req,res)=>{
    try {
        const students=await Student.findAll({
            attributes:['stId','fname','lname','email','age'],
            include: [
                {
                    model:Course,
                    through:{attributes:[]}
                },
                {
                    model:Module,
                    through:{attributes:[]}
                }
            ]
        });
        res.json(students);
    } catch(error){
        res.status(500).json({error:'Server error'});
    }
});




// app.post('/students', async (req, res) => {
//   try {
//     const {
//       fname,
//       lname,
//       email,
//       age,
//       gender,
//       contactNo,
//       courseType,
//       courseName,
//       startingDate,
//       endingDate,
//       courseResult,
//       modules
//     } = req.body;

//     const ageInt = parseInt(age) || 0;

//     // 1. Create student
//     const student = await Student.create({ fname, lname, email, age: ageInt, gender, contactNo });

//     // 2. Find or create course (use fallback courseId)
//     let course = null;
//     if (courseName && courseName.trim() !== "") {
//       course = await Course.findOne({ where: { courseName } });
//     }
//     if (!course) {
//       const newCourseId = `C-${Date.now()}`;
//       course = await Course.create({
//         courseId: newCourseId,
//         courseType: courseType || 'General',
//         courseName: courseName || 'Unknown',
//         startingDate: startingDate && startingDate !== '' ? new Date(startingDate) : new Date(),
//         endingDate: endingDate && endingDate !== '' ? new Date(endingDate) : new Date(),
//         courseResult: courseResult || 'Pending'
//       });
//     }

//     // 3. Link student and course
//     await Student_Course.create({
//       stId: student.stId,
//       courseId: course.courseId
//     });

//     const moduleNameMap = {
//         MATH101: "Mathematics",
//         CS102: "Computer Science",
//         ENG103: "English Literature",
//         PHY105: "Physics",
//         CHEM106: "Chemistry",
//         OOP107: "Object-oriented programming",
//         CYB108: "Cyber Security"
//     };

//     // 4. Modules safe handling
//     const modulesArr = Array.isArray(modules) ? modules : [];

//     for (let mod of modulesArr) {
//     const moduleCode = mod.moduleCode || mod.module || `MOD-${Date.now()}`;
//     const moduleName = mod.moduleName || moduleNameMap[moduleCode] || "";
//     const instructor = mod.instructor || '';
//     const credits = mod.credits ? parseInt(mod.credits) : 0;
//     const grade = mod.grade ? parseFloat(mod.grade) : null;  // use mod.grade here

//     let module = await Module.findByPk(moduleCode);
//     if (!module) {
//         module = await Module.create({
//             moduleCode,
//             moduleName,
//             instructor,
//             credits,
//             courseId: course.courseId
//         });
//     }

//     await Student_Module.create({
//         stId: student.stId,
//         moduleCode: module.moduleCode
//     });

//     const resultId = `RES-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
//     await Result.create({
//         resultId,
//         grade,  // <-- pass grade correctly here
//         date: new Date()
//     });

//     await Student_Result.create({ resultId, stId: student.stId });
//     await Module_Result.create({ resultId, moduleCode: module.moduleCode });
// }



//     res.status(201).json({ message: 'Student added with course and modules', student });
//   } catch (error) {
//     console.error('Error creating student:', error);
//     res.status(500).json({ error: 'Server error creating student data' });
//   }
// });



// --------------------------------------------------------------------------







// ---------


