package com.project.winiaaid.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;

@Getter
public class CreateObjectMapper <T> {
    private static CreateObjectMapper instance;
    private ObjectMapper mapper;

    private CreateObjectMapper() {
        mapper = new ObjectMapper();
    }

    public static CreateObjectMapper getInstance() {
        if(instance == null) {
            instance = new CreateObjectMapper();
        }
        return instance;
    }
}