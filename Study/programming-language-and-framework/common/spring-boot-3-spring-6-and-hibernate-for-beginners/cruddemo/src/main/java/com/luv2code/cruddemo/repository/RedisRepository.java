package com.luv2code.cruddemo.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
@Slf4j
public class RedisRepository {

    @Autowired
    @Qualifier("redis-template")
    private StringRedisTemplate redisTemplate;
    private ValueOperations<String, String> notifOps;
    @Autowired
    private ObjectMapper mapper;

    @PostConstruct
    private void init() {
        notifOps = redisTemplate.opsForValue();
    }

    public String getData(String key) {
        return notifOps.get(key);
    }

    public void setData(String key, Object data) throws Exception {
        String newData = mapper.writeValueAsString(data);
        notifOps.set(key, newData, 50, TimeUnit.SECONDS);
//        notifOps.set(key, data);
    }

}
