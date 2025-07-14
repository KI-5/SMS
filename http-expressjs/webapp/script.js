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
    var table = document.getElementById('studentList').getElementsByTagName('tbody')[0];
    var newRecord= table.insertRow(table.length);
    
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

    // qualification
    qual=newRecord.insertCell(3);
    qual.innerHTML=data.dname;
    
    // grade
    grade=newRecord.insertCell(4);
    grade.innerHTML=data.grade;
    
    //delete column
    deleteCell = newRecord.insertCell(5);
    // deleteCell.innerHTML = `<a onClick="onDelete(this)"><i class="fas fa-trash-alt" style="color:white;padding:8px;background-color:red;border-radius:20px;"></i> </a>
    // <a onClick="onEdit(this)"><i class="fas fa-pencil" style="color:white;padding:8px;background-color:grey;border-radius:20px;"></i> </a>`;
    
    deleteCell.innerHTML = `<a class="dlt-btn"><i class="fas fa-trash-alt" style="color:white;padding:8px;background-color:red;border-radius:20px;"></i> </a>
    <a class="edit-btn""><i class="fas fa-pencil" style="color:white;padding:8px;background-color:grey;border-radius:20px;"></i> </a>`;
    
}


//DELETE RECORSDS
async function onDelete(record){
    
// const
        // const row=record.parentElement.parentElement;
        // const rowIndex=row.dataset.id;
        const row=record.closest('tr');
        const rowIndex=row?.dataset.id;
        // const rowIndex=row.rowIndex;
        console.log(rowIndex);

        if(!rowIndex){console.error('Error');return;}
        if(confirm('Are you sure?')){
        // let data=JSON.parse(localStorage.getItem('studentData')||'[]');
        // data.splice(rowIndex,1);
        // localStorage.setItem('studentData', JSON.stringify(data));
        // const tableTag=document.getElementById('studentList').getElementsByTagName('tbody');
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
    document.getElementById('dname').value='';
    document.getElementById('grade').value='';
    // document.getElementById('degreeType').value='';
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
            fname:st.name.split(" ")[0],
            lname:st.name.split(" ").slice(1).join(" "),
            email:st.email,
            age:st.age,
            dname:st.qualification,
            grade:st.grade
        });
    });
}

//SUBMIT METHOD
function formSubmit(){
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
    
    formData["fname"] = document.getElementById("fname").value;
    formData["lname"] = document.getElementById("lname").value;
    formData["email"] = document.getElementById("email").value;
    formData["age"] = document.getElementById("age").value;
    // formData["degreeType"] = document.getElementById("degreeType").value;
    formData["dname"] = document.getElementById("dname").value;
    formData["grade"] = document.getElementById("grade").value;
    console.log(formData["grade"] );

    return formData;
}

//UPDATE
async function updateRecord(formData) {
    currentRow.cells[0].innerHTML = formData.fname;
    currentRow.cells[1].innerHTML = formData.lname;
    currentRow.cells[2].innerHTML = formData.email;
    currentRow.cells[3].innerHTML = formData.age;
    // currentRow.cells[0].innerHTML = formData.degreeType;
    currentRow.cells[4].innerHTML = formData.dname;
    currentRow.cells[5].innerHTML = formData.grade;

    
    const row=record.parentElement.parentElement;
    const rowIndex=row.rowIndex;
    const response=await fetch(`/students/${rowIndex}`,{
            method:'POST'
        });

        if(response.ok){
            console.log('updated??');
            refreshList();
        }
        else{
            const content=await response.text();
            console.log(content);
        }
}

// document.getElementById('testform').addEventListener('submit',errorValidate);

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

// STORE IN LOCAL STORAGE
// function storeData(){
//     const studentData=readData();
//     console.log(studentData);
//     const storedData=JSON.parse(localStorage.getItem('studentData')||'[]');
//     storedData.push(studentData);
//     localStorage.setItem('studentData', JSON.stringify(storedData));
// }


async function storeData() {
    const studentData=readData();
    const fullName=studentData.fname +" "+studentData.lname;

    const studentRecord={ name:fullName, email:studentData.email, age:studentData.age, qualification:studentData.dname, grade:studentData.grade};

    const response=await fetch('/students', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(studentRecord)
    });

    
    const result=await response.json();
    console.log("Server response:", result);
    addNewStudent({
        id:result.id,
        fname:result.name.split(" ")[0],
        lname:result.name.split(" ").slice(1).join(" "),
        email:result.email,
        age:result.age,
        dname:result.qualification,
        grade:result.grade
    });

    console.log('Added');
}


// edit function
async function onEdit(button){
    clearInterval(refreshTime);
    // const row=button.parentElement.parentElement;
    // const rowIndex=row.dataset.id;
    // const rowIndex=row.rowIndex;
    const row=button.closest('tr');
    const rowIndex=row?.dataset.id;

    if(!rowIndex){console.error('error');return;}

    const fullName=row.cells[0].innerHTML.trim().split(" ");
    const fname=fullName[0];
    const lname=fullName.slice(1).join(" ");

    document.getElementById('editId').value = rowIndex;
    document.getElementById('editFname').value = fname;
    document.getElementById('editLname').value = lname;
    document.getElementById('editEmail').value = row.cells[1].innerText;
    document.getElementById('editAge').value = row.cells[2].innerText;
    document.getElementById('editDname').value = row.cells[3].innerText;
    document.getElementById('editGrade').value = row.cells[4].innerText;

    console.log(rowIndex);
    document.getElementById('edit').classList.remove('hide');


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
        qualification:document.getElementById('editDname').value,
        grade:document.getElementById('editGrade').value
    };
 
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

document.getElementById('studentList').addEventListener('click',function(e){
    const tgt=e.target.closest('a');
    if(!tgt) return;
    if(tgt.classList.contains('dlt-btn')) {
        onDelete(tgt);
    }else if(tgt.classList.contains('edit-btn')){
        onEdit(tgt);
    }
});