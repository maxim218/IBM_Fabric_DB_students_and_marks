"use strict";

const shim = require('fabric-shim');
const util = require('util');

function getResult(s) {
	s = ("" + s + "").toString();
	return Buffer.from(s);
}

let Chaincode = class {
  async Init(stub) {
    return shim.success();
  }

  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);
    let method = this[ret.fcn];
    if (!method) {
	  const s1 = "Function ";
	  const s2 = ret.fcn;
	  const s3 = " not found";
	  const message_error = s1 + s2 + s3;
      throw new Error("  " + message_error + "  ");
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }

  async initLedger(stub, args) {
    let DB = {
		students: [],
		marks: [],
	};
    await stub.putState('DB', Buffer.from(JSON.stringify(DB)));
    return getResult("INIT_DATABASE_OK");
  }
  
  async addMark(stub, args) {
	  const studentId = (args[0] + "").toString();
	  const markValue = (args[1] + "").toString();
	  
	  let value = await stub.getState('DB');
	  value = value.toString();
	  let DB = JSON.parse(value);
	  
	  let studentSurname = undefined;
	  
	  let studentAlreadyExists = false;
	  for(let i = 0; i < DB.students.length; i++) {
		const student = DB.students[i];
		if(student.studentId.toString() === studentId.toString()) {
			studentAlreadyExists = true;
			studentSurname = student.studentSurname.toString();
			break;
		}
	  }
	 
	  if(studentAlreadyExists === false) {
	 	 throw new Error("STUDENT_NOT_FOUND");
	  }
	 
	  let mark = {
	  	  studentId: studentId.toString(),
		  studentSurname: studentSurname.toString(),
		  markValue: markValue.toString(),
	  }
	 
	  DB.marks.push(mark);
	 
	  await stub.putState('DB', Buffer.from(JSON.stringify(DB)));
	 
	  return getResult("ADDING_MARK_OK");
  }
  
  async hello(stub, args) {
	  return getResult("HELLO_FROM_MY_FABRIC");
  }
  
  async getAllMarks(stub, args) {
	  let value = await stub.getState('DB');
	  value = value.toString();
	  let DB = JSON.parse(value);
	  
	  let marksArr = DB.marks;
	  let marksArrString = JSON.stringify(marksArr);
	  return getResult(marksArrString);
  }

  async addStudent(stub, args) {
		const studentId = (args[0] + "").toString();
		const studentSurname = (args[1] + "").toString();
			
	    let value = await stub.getState('DB');
		value = value.toString();
		let DB = JSON.parse(value);
			
		let studentAlreadyExists = false;
		for(let i = 0; i < DB.students.length; i++) {
			const student = DB.students[i];
			if(student.studentId.toString() === studentId.toString()) {
				studentAlreadyExists = true;
				break;
			}
		}
			
		if(studentAlreadyExists === true) {
			throw new Error("STUDENT_ALREADY_EXISTS");
		}
		
		const student = {
			studentId: studentId.toString(),
			studentSurname: studentSurname.toString(),
		};
			
		DB.students.push(student);

		await stub.putState('DB', Buffer.from(JSON.stringify(DB)));
		
		return getResult("ADDING_STUDENT_OK");
  }
  
  async getAllStudents(stub, args) {
	  let value = await stub.getState('DB');
	  value = value.toString();
	  let DB = JSON.parse(value);
	  
	  let studentsArr = DB.students;
	  let studentsArrString = JSON.stringify(studentsArr);
	  return getResult(studentsArrString);
  }

};

shim.start(new Chaincode());
