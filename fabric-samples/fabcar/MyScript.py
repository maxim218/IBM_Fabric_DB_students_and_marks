import os
import subprocess

print "\n\n"
print "------------------------------------------------------\n"

print "Creator: Kolotovkin Maxim"

print "\nCommands:\n"
print "Init database      :  0"
print "Add student        :  1"
print "Add mark           :  2"
print "Get all students   :  3"
print "Get all marks      :  4"
print "\n"

s = "MMMMMMMMMMMMMMMMMMMMMMMMM";

while (True):
	output = ""
	print "Input command number (0,1,2,3,4):"
	n = int(input())
	print "Command number: " + str(n)
	if (n == 0):
		print("Command type: " + "Init database");
		output = subprocess.check_output(["node", "invoke.js", "initLedger"]);
	if (n == 1):
		print("Command type: " + "Add student");
		print("Input student id:");
		studentID = raw_input();
		print("Input student surname:");
		studentSurname = raw_input();
		output = subprocess.check_output(["node", "invoke.js" , "addStudent" + "_" + str(studentID) + "_" + str(studentSurname)]);
	if (n == 2):
		print("Command type: " + "Add mark");
		print("Input student id:");
		studentID = raw_input();
		print("Input mark:");
		mark = raw_input();
		output = subprocess.check_output(["node", "invoke.js" , "addMark" + "_" + str(studentID) + "_" + str(mark)]);
	if (n == 3):
		print("Command type: " + "Get all students");
		output = subprocess.check_output(["node", "query.js" , "getAllStudents"]);
	if (n == 4):
		print("Command type: " + "Get all marks");
		output = subprocess.check_output(["node", "query.js" , "getAllMarks"]);
	output = output.decode("utf-8")
	mass = output.split(s);
	answer = mass[1];
	print "Result: " + str(answer);
	print("\n");
		

