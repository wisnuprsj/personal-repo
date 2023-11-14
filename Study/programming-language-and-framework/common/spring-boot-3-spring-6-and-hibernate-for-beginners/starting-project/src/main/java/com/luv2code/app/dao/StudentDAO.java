package com.luv2code.app.dao;

import com.luv2code.app.entity.Student;

import java.util.List;

public interface StudentDAO {

    void save(Student theStudent);

    Student findById(Integer id);

    List<Student> findAll();
    List<Student> findStudentByLastName(String theLastName);
    void updateLastName(int studentId, String lastName);
    void removeStudent(int studentId);
    int deleteAll();
}
