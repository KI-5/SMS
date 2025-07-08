//LOAD DATA
window.onload=function(){
    refreshList();
};

let currentRow=null;

// ADD STUDENT
function addNewStudent(data){
    // get list
    var table = document.getElementById('studentList').getElementsByTagName('tbody')[0];
    var newRecord= table.insertRow(table.length);
    
    // name
    fullName=newRecord.insertCell(0);
    fullName.innerHTML=data.fname+ " "+data.lname;

    //mail
    mail=newRecord.insertCell(1);
    mail.innerHTML=data.email;

    // age
    age=newRecord.insertCell(2);
    age.innerHTML=data.age;

    // qualification
    qual=newRecord.insertCell(3);
    qual.innerHTML=data.dname;

    // // start
    // sdate=newRecord.insertCell(3);
    // sdate.innerHTML=data.startDate;
    // // end
    // edate=newRecord.insertCell(4);
    // edate.innerHTML=data.endDate;
    
    //delete column
 
    deleteCell = newRecord.insertCell(4);
    deleteCell.innerHTML = `<a onClick="onDelete(this)"><i class="fas fa-trash-alt" style="color:white;padding:8px;background-color:red;border-radius:20px;"></i> </a>`;
    
}


//DELETE RECORSDS
function onDelete(record){
    if(confirm('Are you sure?')){
        const row=record.parentElement.parentElement;
        // document.getElementById('studentList').deleteRow(row.rowIndex);
        const rowIndex=row.rowIndex-1;
        let data=JSON.parse(localStorage.getItem('studentData')||'[]');
        data.splice(rowIndex,1);
        localStorage.setItem('studentData', JSON.stringify(data));
        refreshList();
    }
}

//RESET for onload and others
function resetForm(){
    document.getElementById('fname').value='';
    document.getElementById('lname').value='';
    document.getElementById('email').value='';
    document.getElementById('age').value='';
    document.getElementById('dname').value='';
    // document.getElementById('degreeType').value='';
    // document.getElementById('startDate').value='';
    // document.getElementById('endDate').value='';
    currentRow=null;

    
}

//REFRESH METHOD! get from local storage
function refreshList(){
    const storedData=JSON.parse(localStorage.getItem('studentData')||'[]');
    const tableBody=document.getElementById('studentList').getElementsByTagName('tbody')[0];
    tableBody.innerHTML="";

    storedData.forEach(student=>{
        addNewStudent(student);
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
    // formData["startDate"] = document.getElementById("startDate").value;
    // formData["endDate"] = document.getElementById("endDate").value;
    
    return formData;
}

//UPDATE
function updateRecord(formData) {
    currentRow.cells[0].innerHTML = formData.fname;
    currentRow.cells[1].innerHTML = formData.lname;
    currentRow.cells[2].innerHTML = formData.email;
    currentRow.cells[3].innerHTML = formData.age;
    // currentRow.cells[0].innerHTML = formData.degreeType;
    currentRow.cells[4].innerHTML = formData.dname;
    // currentRow.cells[0].innerHTML = formData.startDate;
    // currentRow.cells[0].innerHTML = formData.endDate;
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
function storeData(){
    const studentData=readData();
    console.log(studentData);
    const storedData=JSON.parse(localStorage.getItem('studentData')||'[]');
    storedData.push(studentData);
    localStorage.setItem('studentData', JSON.stringify(storedData));
}

