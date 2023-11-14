package com.luv2code.app.dao.impl;

import com.luv2code.app.dao.StudentDAO;
import com.luv2code.app.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentDAOImpl implements StudentDAO {

    private EntityManager entityManager;

    @Autowired
    public StudentDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Student theStudent) {
        entityManager.persist(theStudent);
    }

    @Override
    public Student findById(Integer id) {
        return entityManager.find(Student.class, id);
    }

    @Override
    public List<Student> findAll() {
        TypedQuery<Student> query = entityManager.createQuery("FROM Student order by lastName", Student.class);
        return query.getResultList();
    }

    @Override
    public List<Student> findStudentByLastName(String theLastName) {
        TypedQuery<Student> query = entityManager.createQuery("FROM Student where lastName=:lastName", Student.class);
        query.setParameter("lastName", theLastName);
        return query.getResultList();
    }

    @Override
    @Transactional
    public void updateLastName(int studentId, String lastName) {
        Student student = findById(studentId);
        System.out.println("Updating lastname : " + lastName + " from student " + student);
        student.setLastName(lastName);
        entityManager.merge(student);
    }

    @Override
    @Transactional
    public void removeStudent(int studentId) {
        Student student = findById(studentId);
        System.out.println("Remove Student : " + student);
        entityManager.remove(student);
    }

    @Override
    @Transactional
    public int deleteAll() {
        int numRowsDeleted = entityManager.createQuery("DELETE FROM Student").executeUpdate();
        return numRowsDeleted;
    }


}
