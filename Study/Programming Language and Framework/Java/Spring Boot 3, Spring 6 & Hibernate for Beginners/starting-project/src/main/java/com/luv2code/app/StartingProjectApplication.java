package com.luv2code.app;

import com.luv2code.app.dao.StudentDAO;
import com.luv2code.app.entity.Student;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class StartingProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(StartingProjectApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(StudentDAO studentDAO) {
        return runner -> {
//            createStudent(studentDAO);
//            createMultipleStudent(studentDAO);
//            searchStudent(studentDAO, 1);
//            queryForStudent(studentDAO);
//            queryStudentByLastName(studentDAO, "Doe");
//            updateStudentLastName(studentDAO, 1, "Due");
//            removeStudent(studentDAO, 1);
//            deleteAllStudent(studentDAO);
        };
    }

    private void createMultipleStudent(StudentDAO studentDAO) {
        Student tempStudent1 = new Student("John", "Doe", "john@luv2code.com");
        Student tempStudent2 = new Student("Mary", "Public", "mary@luv2code.com");
        Student tempStudent3 = new Student("Bonita", "Applebum", "bonita@luv2code.com");

        studentDAO.save(tempStudent1);
        studentDAO.save(tempStudent2);
        studentDAO.save(tempStudent3);
    }

    private void createStudent(StudentDAO studentDAO) {
        Student tempStudent = new Student("Paul", "Doe", "paul@luv2code.com");
        studentDAO.save(tempStudent);
        System.out.println(tempStudent.getId());
    }

    private void searchStudent(StudentDAO studentDAO, Integer studentId) {
        Student theStudent = studentDAO.findById(studentId);
        System.out.println(theStudent);
    }

    private void queryForStudent(StudentDAO studentDAO) {
        List<Student> students = studentDAO.findAll();
        for (Student student : students) {
            System.out.println(student);
        }
    }

    private void queryStudentByLastName(StudentDAO studentDAO, String lastName) {
        List<Student> students = studentDAO.findStudentByLastName(lastName);
        for (Student student : students) {
            System.out.println(student);
        }
    }

    private void updateStudentLastName(StudentDAO studentDAO, int studentId, String lastName) {
        studentDAO.updateLastName(studentId, lastName);
    }

    private void removeStudent(StudentDAO studentDAO, int studentId) {
        studentDAO.removeStudent(studentId);
    }

    private void deleteAllStudent(StudentDAO studentDAO) {
        int numRowsDeleted = studentDAO.deleteAll();
        System.out.println(numRowsDeleted + " records deleted.");
    }


}
