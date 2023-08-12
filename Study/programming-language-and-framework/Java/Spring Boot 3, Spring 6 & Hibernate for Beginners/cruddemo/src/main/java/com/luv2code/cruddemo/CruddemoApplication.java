package com.luv2code.cruddemo;

import com.luv2code.cruddemo.dao.AppDAO;
import com.luv2code.cruddemo.entity.Instructor;
import com.luv2code.cruddemo.entity.InstructorDetail;
import com.luv2code.cruddemo.repository.RedisRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableCaching
public class CruddemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(CruddemoApplication.class, args);
    }

//    @Bean
//    public CommandLineRunner commandLineRunner(AppDAO appDAO, RedisRepository redisRepository) {
//        return runner -> {
////            createInstructor(appDAO);
////            getInstructorById(appDAO, 1);
////            deleteInstructorById(appDAO, 1);
//            Instructor theInstructor = new Instructor("Madhu", "Patel", "madhu@luv2code.com");
//            redisRepository.setData("instructor1", theInstructor);
//            String value = redisRepository.getData("instructor1");
//            System.out.println("Redis VALUE : " + value);
//        };
//    }

    @Bean
    public CommandLineRunner commandLineRunner(RedisRepository redisRepository) {
        return runner -> {
            redisRepository.getData("KEY-REDIS");
        };
    }

    private void createInstructor(AppDAO appDAO) {
//        Instructor theInstructor = new Instructor("John", "Doe", "john@luv2code.com");
//        InstructorDetail instructorDetail = new InstructorDetail(
//                "http://www.luv2code.com/youtube",
//                "Singing"
//        );
        Instructor theInstructor = new Instructor("Madhu", "Patel", "madhu@luv2code.com");
        InstructorDetail instructorDetail = new InstructorDetail(
                "http://www.luv2code.com/youtube",
                "Guitar"
        );
        theInstructor.setInstructorDetail(instructorDetail);
        System.out.println("Saving instructor : " + theInstructor);
        appDAO.save(theInstructor);
    }

    private void getInstructorById(AppDAO appDAO, int theId) {
        Instructor instructor = appDAO.findInstructorById(theId);
        System.out.println("Instructor with the corresponding id : " + instructor);
    }

    private void deleteInstructorById(AppDAO appDAO, int theId) {
        System.out.println("Deleting instructor with the corresponding id : " + theId);
        appDAO.deleteInstructorById(theId);
    }
}
