package com.example.appforsale;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppforsaleApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppforsaleApplication.class, args);
	}

}
// package com.example.appforsale;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// import io.github.cdimascio.dotenv.Dotenv;

// @SpringBootApplication
// public class AppforsaleApplication {

// 	public static void main(String[] args) {

// 		// ✅ Load .env file
// 		Dotenv dotenv = Dotenv.configure()
// 				.ignoreIfMissing()
// 				.load();

// 		// ✅ Set values to Spring Environment
// 		System.setProperty("SPRING_APPLICATION_NAME", dotenv.get("SPRING_APPLICATION_NAME", "appforsale"));
// 		System.setProperty("SERVER_PORT", dotenv.get("SERVER_PORT", "8082"));

// 		System.setProperty("DB_URL", dotenv.get("DB_URL"));
// 		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
// 		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

// 		System.setProperty("MAIL_USERNAME", dotenv.get("MAIL_USERNAME"));
// 		System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD"));

// 		System.setProperty("CONTACT_EMAIL", dotenv.get("CONTACT_EMAIL"));

// 		SpringApplication.run(AppforsaleApplication.class, args);
// 	}
// }