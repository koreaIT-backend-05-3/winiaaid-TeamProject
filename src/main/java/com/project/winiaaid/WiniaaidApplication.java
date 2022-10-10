package com.project.winiaaid;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class WiniaaidApplication {

	public static void main(String[] args) {
		SpringApplication.run(WiniaaidApplication.class, args);
	}

}