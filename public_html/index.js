/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBName = "STUDENTFORM";
var studenRelationName = "studentData";
var conntoken = "90932832|-31949281518959298|90948293";

function validateData() {
    var studentrollno, FullName, studentclass, DateofBirth, address, enrollmentdate;
    studentrollno = $("#studentrollno").val();
    FullName = $("#FullName").val();
    studentclass = $("#studentclass").val();
    DateofBirth = $("#DateofBirth").val();
    address = $("#address").val("");
    enrollmentdate = $("#enrollmentdate").val();
    if (studentrollno === "") {
        alert("Student Rollno Required Value");
        $("#studentrollno").focus();
        return "";
    }
    if (FullName === "") {
        alert("FullName is Required Value");
        $("#FullName").focus();
        return "";
    }
    if (studentclass === "") {
        alert("student class is Required Value");
        $("#studentclass").focus();
        return "";
    }
    if (DateofBirth === "") {
        alert("Birthdate is Required Value");
        $("#DateofBirth").focus();
        return "";
    }
    var addressVar = $("#address").val();
    if (addressVar === "") {
        alert("address is Required Value");
        $("#address").focus();
        return "";
    }
    if (enrollmentdate === "") {
        alert("enrollment date is Required Value");
        $("#enrollmentdate").focus();
        return "";
    }
    var jsonStrObj = {
        studentrollno: studentrollno,
        FullName: FullName,
        studentclass: studentclass,
        DateofBirth: DateofBirth,
        address: address,
        enrollmentdate: enrollmentdate,

    };
    return JSON.stringify(jsonStrObj);
}
function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return;
    }
    var putReqStr = createPUTRequest(conntoken, jsonStrObj, stuDBName, studenRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#studentrollno ").focus();
}
function changeData() {
    $("#change").prop("disabled".true);
    jsonchg = validateData();
    var updateRequest = createUPDATERecordRequest(conntoken, jsonchg, stuDBName, studenRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#studentrollno ").focus();
}

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
function getstudentrollnoAsJsonObj() {
    var studentrollno = $("#studentrollno").val();
    var jsonStr = {
        rollno: studentrollno
    };
    return JSON.stringify(jsonStr);
}
function saveRecNoL2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}
function fillData(jsonObj) {
    saveRecNoL2LS(jsonObj);
    var record = JSON.Parse(jsonObj.data).record;
    $("#studentrollno").val(record.studentrollno);
    $("#FullName").val(record.FullName);
    $("#studentclass").val(record.studentclass);
    $("#DateofBirth").val(record.DateofBirth);
    $("#address").val(record.address);
    $("#enrollmentdate").val(record.enrollmentdate);

}
function getstudent() {
    var studentrollnojsonobj = getstudentrollnoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(conntoken, stuDBName, studenRelationName, studentrollnojsonobj);
    jQuery.ajaxSetup({async: false});
    var resjsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    if (resjsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#studentrollno").focus();
    }
    elseif(resjsonObj.status === 200);
    $("#studentrollno").prop("disabled", true);
    fillData(resjsonObj);
    $("#change").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#studentrollno").focus();

}



