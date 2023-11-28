package pl.agh.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.agh.demo.dao.Person;
import pl.agh.demo.repository.PersonsRepository;

@Configuration
public class DatabaseLoader {
    private static final Logger log = LoggerFactory.getLogger(DatabaseLoader.class);

    @Bean
    public CommandLineRunner demo(PersonsRepository repository) {
        return (args) -> {
            repository.save(new Person(1, "John", "Doe", "IT"));
            repository.save(new Person(2, "John", "Smith", "Tester"));

            log.info("Customers found with findAll(): ");
            log.info("----------------------");
            repository.findAll().forEach(customer -> {
                log.info(customer.toString());
            });
        };
    }
}
