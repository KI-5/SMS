// const { error } = require('console');
//express js module import
const express=require('express');
//.initialise express applicatino
const app=express();




// // DB
// const mysql=require('mysql2');
// const bodyParser=require('body-parser');
// const { error } = require('console');

// app.use(bodyParser.json());

// // // SQL connection
// const db=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'****',
//     database:'sms',
//     port:3306
// })

// // // connect to db
// db.connect(err=>{
//     if(err){
//         console.error("Didn't work", err);
//         return;
//     }
//     console.log('Done connected!');
// });



// port
const PORT=3000;
//parse json data
app.use(express.json());
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log('Runninggg !');
});

let studentsArray=[];
let studentCounter=1;

// app.get('/',(req,res)=>{
//     res.send('Testing');
// });



//GET all students
app.get('/students', (req,res)=>{
    res.json(studentsArray);
});

// app.get('/students', (req,res)=>{
//     db.query('SELECT * FROM STUDENT', (err,results)=>{
//         if(err) return res.status(500).send('Error getting student details', err);
//         res.json(results);
//     });
// });

// GET one specdific student details-route para
app.get('/students/:id', (req,res)=>{
    //id
    const id=parseInt(req.params.id);
    const arrIndex=studentsArray.find(st=> st.id===id);
    
    // if not found return error code
    if(!arrIndex)
        return res.status(404).send('Student recoord not found');
    // json object of student record
    res.json(arrIndex);
});

// DELETE each
app.delete('/students/:id', (req,res)=>{
    const id=parseInt(req.params.id);
    const arrIndex=studentsArray.findIndex(st=> st.id===id);

    // if not found
    if (arrIndex===-1){
        return res.status(404).send('Student record not found');
    }

    //remove record
    studentsArray.splice(arrIndex,1);
    res.json({message:'Student record deleted!'});
});


//DELETE ALL
app.delete('/students', (req,res)=>{
    studentsArray=[];
    studentCounter=1;
    res.json({message:'All student records deleted!'});
});


// POST
app.post('/students', (req,res)=>{
    console.log(req.body);
    // if the deconstruction isn't done you can use the dot 
    const {name,email, age, qualification,grade}=req.body;
    console.log("Issue");
    //validate input data
    if(!name||!email||!age){
        return res.status(400).send('Required!');
    }

    // counter and rest of the properties
    const newStudent={id:studentCounter++, name,email, age,qualification, grade};
    studentsArray.push(newStudent);
    res.status(201).json(newStudent); //created
});

// app.post('/students', (req,res)=>{
//     console.log(req.body);
//     const {name,email,age,qualification,grade}=req.body;

//     if(!name||!email||!age){
//         return res.status(400).json({error:'Error required fields!'});
//     }

//     const nameSections = name.trim().split(" ");
//     const fname = nameSections[0];
//     const lname = nameSections.slice(1).join(" ") || ''; 

//     const sql='INSERT INTO Student(fname,lname,email,age,qualification,grade) VALUES (?,?,?,?,?,?)';
    
    


//     // const name = `${fname} ${lname}`;
//     db.query(sql,[fname,lname,email,age,qualification,grade],(err,result)=>{
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Failed insert' });
//         }

//         res.status(201).json({id:result.insertId,name:fname+ " " +lname,email,age,qualification,grade});
//     });
// });

// PUT
app.put('/students/:id', (req,res)=>{
    const id=parseInt(req.params.id);
    //access the info of the client 
    const {name,email, age, qualification,grade}=req.body;
    const arrIndex=studentsArray.findIndex(st=> st.id===id);

    // if not foundhjbyp
    if (arrIndex===-1){
        return res.status(404).send('Student record not found');
    }

    if (name) studentsArray[arrIndex].name=name;
    // studentsArray=
    studentsArray[arrIndex]={name, email, age, qualification,grade};

    res.status(200).json(studentsArray[arrIndex]);

});


//start server and make it listen on the port
app.listen(PORT,()=>{
    console.log('Runninggg !');
});





// ---------

