package com.cs425.web.model;

public class Instructor {
	
	private String ID;
	private String name;
	private String dept_name;
	private double salary;
	
	
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDept_name() {
		return dept_name;
	}
	public void setDept_name(String dept_name) {
		this.dept_name = dept_name;
	}
	public double getSalary() {
		return salary;
	}
	public void setSalary(double salary) {
		this.salary = salary;
	}
	
	@Override
	public String toString() {
		return "Instructor [ID=" + ID + ", name=" + name + ", dept_name=" + dept_name + ", salary=" + salary + "]";
	}


}
