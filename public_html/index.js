/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = 'http://api.login2explore.com:5577';
        var jpdbIRL = '/api/irl';
        var jpdbIML = '/api/iml';
        var stuDBName = 'STUDENT-DB';
        var studenRelationName = 'studentForm';
        var conntoken = '90932832|-31949281518959298|90948293';
        $('#studentrollno').focus();
        //Function for return alter HTML code according to status of response
                function alertHandlerHTML(status, message) {
                // 1--> Success , 0--> Warning

                if (status === 1) {
                return `<div class="alert  alert-primary d-flex align-items-center alert-dismissible " role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
                <div>
                  <strong>Success!</strong> ${message}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`;
                } else {
                return `<div class="alert  alert-warning d-flex align-items-center alert-dismissible" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
          <strong>Warning!</strong> ${message}
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
                }

                }
//function for append alert message into alter div
        function alertHandler(status, message){
        var alertHTML = alertHandlerHTML(status, message);
                let alertDiv = document.createElement('div');
                alertDiv.innerHTML = alertHTML;
                $('#disposalAlertContainer').append(alertDiv);
        }
//function for saving record number into local storage
        function saveRecNoToLocalStorage(jsonObj) {
        var lvData = JSON.parse(jsonObj.data);
                localStorage.setItem("recordNo", lvData.rec_no);
        }

//function for disable all element on page except roll number input field
        function disableAllFieldExceptRollno(){
        $("#studentrollno").prop('disabled', true);
                $("#FullName").prop('disabled', true);
                $("#studentclass").prop('disabled', true);
                $("#DateofBirth").prop('disabled', true);
                $("#address").prop('disabled', true);
                $("#enrollmentdate").prop('disabled', true);
                $("#studentrollno").prop('disabled', true);
                $("#save").prop("disabled", true);
                $("#change").prop("disabled", true);
                $("#reset").prop("disabled", true);
                $("#studentrollno ").focus();
        }
//function to reset all field
        function resetForm() {
        $("#studentrollno").val("");
                $("#FullName").val("");
                $("#studentclass").val("");
                $("#DateofBirth").val("");
                $("#address").val("");
                $("#enrollmentdate").val("");
                $("#studentrollno").prop("disabled", false);
                $("#save").prop("disabled", true);
                $("#change").prop("disabled", true);
                $("#reset").prop("disabled", true);
                $("#studentrollno ").focus();
        }
        //function for fill data if student already is present in database
        function fillData(jsonObj) {
        if (jsonObject === ""){
        $("#studentrollno").val("");
                $("#FullName").val("");
                $("#studentclass").val("");
                $("#DateofBirth").val("");
                $("#address").val("");
                $("#enrollmentdate").val("");
        } else{
//student record number saved to local storage
        saveRecNoToLocalStorage(jsonObj);
                //parse json object into JSON
                var data = JSON.Parse(jsonObj.data).record;
                $("#studentrollno").val(data.studentrollno);
                $("#FullName").val(data.FullName);
                $("#studentclass").val(data.studentclass);
                $("#DateofBirth").val(data.DateofBirth);
                $("#address").val(data.address);
                $("#enrollmentdate").val(data.enrollmentdate);
        }
        }
         //function to validate enrollmentno
        function validateEnrollmentDate(){
        var inputBirthDate = $('#birthdate').val();
                var inputEnrollmentDate = $('#enrollmentdate').val();
                inputBirthDate = new Date(inputBirthDate);
                inputEnrollmentDate = new Date(inputEnrollmentDate);
                //Enrollment date should be greater than Birth Date
                return inputBirthDate.getTime() < inputEnrollmentDate.getTime();
        }
// function to check validity of user input data
        function validateData() {
        var studentrollno, FullName, studentclass, DateofBirth, address, enrollmentdate;
                studentrollno = $('#studentrollno').val();
                FullName = $('#FullName').val();
                studentclass = $('#studentclass').val();
                DateofBirth = $('#DateofBirth').val();
                address = $('#address').val();
                enrollmentdate = $('#enrollmentdate').val();
                if (studentrollno === '') {
        alertHandler(0, 'Student Rollno Required Value');
                $('#studentrollno').focus();
                return "";
        }
        if (studentrollno <= 0) {
        alertHandler(0, 'invalid roll no');
                $('#studentrollno').focus();
                return "";
        }
        if (FullName === '') {
        alertHandler(0, 'FullName is Required Value');
                $('#FullName').focus();
                return "";
        }
        if (studentclass === '') {
        alertHandler(0, 'student class is Required Value');
                $('#studentclass').focus();
                return "";
        }
        if (studentclass <= 0 && studentclass > 12) {
        alertHandler(0, 'invalid student class ');
                $('#studentclass').focus();
                return "";
        }
        if (DateofBirth === "") {
        alertHandler(0, 'Birthdate is Required Value');
                $('#DateofBirth').focus();
                return "";
        }
        var address = $('#address').val();
                if (address === '') {
        alertHandler(0, 'address is Required Value');
                $('#address').focus();
                return "";
        }
        if (!validateEnrollmentDate()) {
        alertHandler(0, 'enrollment date is Required Value');
                $('#enrollmentdate').focus();
                return "";
        }
        //if data is valid then creat a json object otherwise return empty string (which denote that data is not valid)
        var jsonStrObj = {
        rollno: studentrollno,
                Name: FullName,
                studentclass: studentclass,
                DateofBirth: DateofBirth,
                address: address,
                enrollmentdate: enrollmentdate

        };
                //convert JSON object into string
                return JSON.stringify(jsonStrObj);
        }
      // function to return strignified JSON object which contain roll number of student
        function getstudentrollnoAsJsonObj() {
        var studentrollno = $("#studentrollno").val();
                var jsonStr = {
                rollno: studentrollno
                };
                return JSON.stringify(jsonStr);
        } 
//Function to query details of existing student
        function getstudent() {
        if ($('#studentrollno').val() === ""){if roll number is not given then disable all fields
                disableAllFieldExceptRollno(); {if roll number is not valid that is less than 1
        } else if ($('#studentrollno').val() < 1)
                disableAllFieldExceptRollno();
                alertHandler(0, 'Invalid roll no');
                $('#studentrollno').focus();
        } else{ //if roll number is valid
        var studentrollnojsonobj = getstudentrollnoAsJsonObj();
                //create GET request object
                var getRequest = createGET_BY_KEYRequest(conntoken, stuDBName, studenRelationName, studentrollnojsonobj);
                jQuery.ajaxSetup({async: false});
                //make GET request
                var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIML);
                jQuery.ajaxSetup({async: true});
                //Enabled all field
                $("#studentrollno").prop('disabled', false);
                $("#FullName").prop('disabled', false);
                $("#studentclass").prop('disabled', false);
                $("#DateofBirth").prop('disabled', false);
                $("#address").prop('disabled', false);
                $("#enrollmentdate").prop('disabled', false);
                if (resJsonObj.status === 400) {// if student is not exist with same roll no then enable save and reset button
        $('#save').prop('disabled', false);
                $('#reset').prop('disabled', false);
                $('#update').prop('disabled', true);
                filldata("");
                $('#FullName').focus();
        } else if (resJsonObj.status === 200); {
        $('#studentrollno').prop("disabled", true);
                fillData(resJsonObj);
                $('#change').prop("disabled", false);
                $('#reset').prop("disabled", false);
                $('#save').prop("disabled", true);
                $('#FullName').focus();
        }
        }

        }

//Function to make PUT request to save data into database
        function saveData() {
        var jsonStrObj = validateData();
        // if form data is not valid
                if (jsonStrObj === '') {
        return '';
        }
//create PUT Request Object
        var putReqStr = createPUTRequest(conntoken, jsonStrObj, stuDBName, studenRelationName);
                jQuery.ajaxSetup({async: false});
                //Make PUT Request for saving data into database
                var resJsonObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
                jQuery.ajaxSetup({async: true});
                if (resJsonObj.status === 400){ //if data not saved
        alertHandler(0, 'Data is not saved (Message:  ' + resJsonObj.message + ")");
        }else if(resJsonObj.status === 200) { //if data is successfully saved
        alertHandler(1, 'data saved successfully');
        }
//After saving to database reset from data
        resetForm();
                $('#studentrollno').focus();
        }
        //function used to make UPDATE request
        function changeData() {
        $('#change').prop('disabled'.true);
                var jsonchg = validateData();
                //create UPDATE request object
                var updateRequest = createUPDATERecordRequest(conntoken, jsonchg, stuDBName, studenRelationName, localStorage.getItem("recno"));
                jQuery.ajaxSetup({async: false});
                
                //make UPDATE request
                var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
                jQuery.ajaxSetup({async: true});
                if (resJsonObj.status === 400){ //if data not saved
        alertHandler(0, 'Data is not UPDATE (Message:  ' + resJsonObj.message + ")");
        }else if(resJsonObj.status === 200) { //if data is successfully saved
        alertHandler(1, 'data Update successfully');
        }
              
                resetForm();
                $('#studentrollno').focus();
        }






