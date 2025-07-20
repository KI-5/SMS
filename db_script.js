let refreshTime;
//LOAD DATA
window.onload=function(){
    refreshList();
    refreshTime=setInterval(refreshList, 2000);
};

let currentRow=null;

// ADD STUDENT
function addNewStudent(data){
    // get list
    var table=document.getElementById('studentList').getElementsByTagName('tbody')[0];
    var newRecord=table.insertRow(table.length);
    
    //test id
    newRecord.dataset.id=data.id;

    // name
    fullName=newRecord.insertCell(0);
    fullName.innerHTML=data.fname+ " "+data.lname;

    //mail
    email=newRecord.insertCell(1);
    email.innerHTML=data.email;

    // age
    age=newRecord.insertCell(2);
    age.innerHTML=data.age;

    // course
    courseName=newRecord.insertCell(3);
    courseName.innerHTML=data.courseName;
    
    // grade
    grade=newRecord.insertCell(4);
    grade.innerHTML=data.grade;
   
    // module
    // mdule=newR
   
    // PROBLEM

    //delete column
    deleteCell=newRecord.insertCell(5);
    // deleteCell.innerHTML = `<a onClick="onDelete(this)"><i class="fas fa-trash-alt" style="color:white;padding:8px;background-color:red;border-radius:20px;"></i> </a>
    // <a onClick="onEdit(this)"><i class="fas fa-pencil" style="color:white;padding:8px;background-color:grey;border-radius:20px;"></i> </a>`;
    
    deleteCell.innerHTML=`<a class="dlt-btn" ><i onClick="onDelete(this)" class="fas fa-trash-alt" style="color:white;padding:8px;background-color:red;border-radius:20px;"></i> </a>
    <a class="edit-btn" ><i onClick="onEdit(this)" class="fas fa-pencil" style="color:white;padding:8px;background-color:grey;border-radius:20px;"></i> </a>`;
    
}


//DELETE RECORSDS
async function onDelete(record){
    
        const row=record.closest('tr');
        const rowIndex=row?.dataset.id;
        // const rowIndex=row.rowIndex;
        console.log(rowIndex);

        if(!rowIndex)
            {console.error('Error');return;}
            if(confirm('Are you sure?')){
                const response=await fetch(`/students/${rowIndex}`,{
                    method:'DELETE'
                });

        if(response.ok){
            console.log('Deleted');
            refreshList();
        }
        else{
            const content=await response.text();
            console.log(content);
        }
    }
}




//RESET for onload and others
function resetForm(){
    document.getElementById('fname').value='';
    document.getElementById('lname').value='';
    document.getElementById('email').value='';
    document.getElementById('age').value='';
    document.getElementById('courseName').value='';
    document.getElementById('grade').value='';
    

    // clear the modulessss
    const moduleList=document.getElementById("modules-list");
    moduleList.innerHTML=''; 
    currentRow=null;

}


//REFRESH
async function refreshList() {
    const response= await fetch('/students');
    const storedData=await response.json();

    const tableBody=document.getElementById('studentList').getElementsByTagName('tbody')[0];
    tableBody.innerHTML= "";

//     storedData.forEach(student=>{
//        addNewStudent(student);
//     });

    storedData.forEach(st=>{
        addNewStudent({
            id:st.id,
            fname:st.fname || '',
            lname:st.lname || '',
            email:st.email || '',
            age:st.age || '',
            courseName:st.courseName || '',
            grade:st.grade || '',
            gender:st.gender || '',
            contactNo:st.contactNo || '',
            modules: st.modules || []
        });
    });
}

//SUBMIT METHOD
function formSubmit(event){
    console.log('asufhdjk');
    event.preventDefault();
    if(errorValidate()){
        var formData=readData();
        if(currentRow==null){
            console.log(formData);
            addNewStudent(formData);
        }
        else{
            updateRecord(formData)
        }
        storeData();
        refreshList();
        resetForm();
    }
}


//get values
function readData() {
    var formData = {};
    

    formData["fname"]= document.getElementById("fname").value;
    formData["lname"]= document.getElementById("lname").value;
    formData["email"] =document.getElementById("email").value;
    formData["age"] =document.getElementById("age").value;
    // formData["degreeType"] = document.getElementById("degreeType").value;
    formData["courseName"]= document.getElementById("courseName").value;
    formData["grade"] =document.getElementById("grade").value;
    formData["gender"] = document.getElementById("gender").value;
    formData["contactNo"] = document.getElementById("contactNo").value;
    console.log(formData["grade"] );


    // module details
    formData["modules"]=[];
    const moduleSelects= document.querySelectorAll(".moduleSelect");
    const moduleCredits= document.querySelectorAll(".moduleCredits");
    const moduleInstructors=document.querySelectorAll(".moduleInstructor");
    const moduleGrades=document.querySelectorAll(".moduleGrade");

    const moduleNameMap = {
        MATH101: "Mathematics",
        CS102: "Computer Science",
        ENG103: "English Literature",
        PHY105: "Physics",
        CHEM106: "Chemistry",
        OOP107: "Object-oriented programming",
        CYB108: "Cyber Security"
    };

    for (let i=0;i<moduleSelects.length;i++) {
        formData["modules"].push({
            moduleCode:moduleSelects[i].value,
            moduleName: moduleNameMap[moduleSelects[i].value] || "",
            credits:moduleCredits[i].value,
            instructor:moduleInstructors[i].value,
            grade:moduleGrades[i].value,
        });
    }
    return formData;
}

//UPDATE
async function updateRecord(formData) {
    currentRow.cells[0].innerHTML = formData.fname;
    currentRow.cells[1].innerHTML = formData.lname;
    currentRow.cells[2].innerHTML = formData.email;
    currentRow.cells[3].innerHTML = formData.age;
    // currentRow.cells[0].innerHTML = formData.degreeType;
    currentRow.cells[4].innerHTML = formData.courseName;
    currentRow.cells[5].innerHTML = formData.grade;
 
    const rowIndex = currentRow.dataset.id;
    const response = await fetch(`/students/${rowIndex}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    
    if (response.ok) {
        console.log('Updated');
        refreshList();
    } else {
        const content = await response.text();
        console.log(content);
    }
    

}


// VALIDATION 
function errorValidate(){
    // event.preventDefault();

    // first name evaluation
    isValid=true;
    const fname=document.getElementById('fname').value;
    const lname=document.getElementById('lname').value;
    const email=document.getElementById('email').value;
    const age=document.getElementById('age').value;

    if((fname=="")|| (!/^[a-zA-Z ]+$/.test(fname))){
        isFnameValid=false;
        document.getElementById("fnameError").classList.remove('hide');
        document.getElementById('fnameError').textContent='Please enter';
        
    }else{
        isFnameValid=true;
        if(!document.getElementById('fnameError').classList.contains('hide')){
            document.getElementById("fnameError").classList.add('hide');
        }
    // document.getElementById('fnameError').textContent='';
    }
 
    
    // last name evaluation
    if((lname=="")|| (!/^[a-zA-Z ]+$/.test(lname))){
        isLnameValid=false;
        document.getElementById("lnameError").classList.remove('hide');
        document.getElementById('lnameError').textContent='Please enter';
        
    }else{
        isLnameValid=true;
        if(!document.getElementById('lnameError').classList.contains('hide')){
            document.getElementById("lnameError").classList.add('hide');
        }
    }

    // mail evaluation
    if((email=="") || (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){
        isMailValid=false;
        document.getElementById("mailError").classList.remove('hide');
        document.getElementById('mailError').textContent='Please enter';
        
    }else{
        isMailValid=true;
        if(!document.getElementById('mailError').classList.contains('hide')){
            document.getElementById("mailError").classList.add('hide');
        }
        
    }

// age evaluation
    if((age=="") || (age<18)){
        isAgeValid=false;
        document.getElementById("ageError").classList.remove('hide');
        document.getElementById('ageError').textContent='Please enter';
        
    }else{
        isAgeValid=true;
        if(!document.getElementById('ageError').classList.contains('hide')){
            document.getElementById("ageError").classList.add('hide');
        }
    
    }

    isValid= isFnameValid && isLnameValid &&isMailValid && isAgeValid;
    return isValid;

    
}


async function storeData() {
    const studentData=readData();
    const fullName=studentData.fname +" "+studentData.lname;

    const studentRecord={   fname: studentData.fname,lName: studentData.lname, email:studentData.email, age:studentData.age, courseName:studentData.courseName, grade:studentData.grade, gender:studentData.gender, contactNo:studentData.contactNo,modules:studentData.modules};

    const response=await fetch('/students', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(studentRecord)
    });

    
    const result=await response.json();
    if (result.error) {
        console.error("Server error:", result.error);
        alert("Failed to add student: " + result.error);
        return;  
    }

    console.log("Server response:", result);
    addNewStudent({
        id:result.id,
        fname:result.fname,
        lname:result.lname,
        email:result.email,
        age:result.age,
        courseName:result.courseName,
        grade:result.grade,
        gender:result.gender,
        contactNo:result.contactNo,
        modules: result.modules
    });

    console.log('Added');
}


// on edit
async function onEdit(button) {
    clearInterval(refreshTime);
    const row = button.closest('tr');
    const rowIndex = row?.dataset.id;

    if (!rowIndex) { console.error('error'); return; }

    const response = await fetch(`/students/${rowIndex}`);
    const student = await response.json();

    document.getElementById('editId').value = rowIndex;
    document.getElementById('editFname').value = student.name.split(" ")[0];
    document.getElementById('editLname').value = student.name.split(" ").slice(1).join(" ");
    document.getElementById('editEmail').value = student.email;
    document.getElementById('editAge').value = student.age;
    document.getElementById('editcourseName').value = student.courseName;
    document.getElementById('editGrade').value = student.grade;

    // Populate modules section
    const editModulesContainer = document.getElementById('editModulesContainer');
    editModulesContainer.innerHTML = '';

    (student.modules || []).forEach((module, index) => {
        const moduleDiv = document.createElement('div');
        moduleDiv.classList.add('module-row');
        moduleDiv.dataset.index = index;

        moduleDiv.innerHTML = `
            <label>Module:</label><input type="text" class="moduleSelect" value="${module.moduleCode || ''}">
            <label>Credits:</label><input type="number" class="moduleCredits" value="${module.credits}">
            <label>Instructor:</label><input type="text" class="moduleInstructor" value="${module.instructor}">
            <label>Grade:</label><input type="text" class="moduleGrade" value="${module.grade}">
            <div style="display: flex; gap: 10px; margin-top: 8px;">
                <button type="button" class="removeModuleBtn" onclick="removeModule(this)">
                    <i class="fas fa-trash-alt"></i> Remove
                </button>
            
            </div>`;

        editModulesContainer.appendChild(moduleDiv);
    });

    document.getElementById('edit').classList.remove('hide');
}

function removeModule(button) {
    const moduleDiv = button.closest('.module-row');
    moduleDiv.remove();
}

//close popup function
function closePopup(){
    document.getElementById('edit').classList.add('hide');
    refreshTime=setInterval(refreshList, 2000);

}


//edit in the popup
document.getElementById('editForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const rowIndex=document.getElementById('editId').value;
    
    
    const fullName=document.getElementById('editFname').value + " " + document.getElementById('editLname').value;
    const updatedStudent={
        name:fullName,
        email:document.getElementById('editEmail').value,
        age:document.getElementById('editAge').value,
        courseName:document.getElementById('editcourseName').value,
        grade:document.getElementById('editGrade').value,
        modules: []
    };
 
    const moduleDivs = document.querySelectorAll('#editModulesContainer .module-row');

    moduleDivs.forEach(div => {
        const moduleSelects = div.querySelector('.moduleSelect').value;
        const credits = parseInt(div.querySelector('.moduleCredits').value);
        const instructor = div.querySelector('.moduleInstructor').value;
        const grade = parseInt(div.querySelector('.moduleGrade').value);

        const selectedOption = moduleSelects[i].selectedOptions[0];
        const moduleCode = selectedOption.value;
        const moduleName = selectedOption.textContent.replace(/\s*\(.*?\)/, '').trim();

        updatedStudent.modules.push({
            moduleCode,
            moduleName, 
            credits,
            instructor,
            grade
        });
    });

    // put method
    const response=await fetch(`/students/${rowIndex}`, {
        method:'PUT',
        headers:{'Content-Type':'application/json'}, body:JSON.stringify(updatedStudent)
    });


 
    if(response.ok){
        alert('Student updated!');
        closePopup();
        refreshList();
    } else{
        alert('Update failed.');
    }
});



// click-add module
document.getElementById("addModuleBtn").addEventListener("click", function() {
    const template=document.getElementById("module-template");
    // contaniner to let the new stuff appear
    const moduleList=document.getElementById("modules-list");
    const clone = template.content.cloneNode(true);
    clone.querySelectorAll(".moduleSelect").forEach(el => el.selectedIndex = 0);
    clone.querySelectorAll(".moduleCredits, .moduleInstructor, .moduleGrade").forEach(el => el.value = "");

    moduleList.appendChild(clone);
});
