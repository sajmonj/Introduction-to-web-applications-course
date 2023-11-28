package pl.agh.demo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.agh.demo.dao.Person;
import pl.agh.demo.model.ConversionToJson;
import pl.agh.demo.service.PersonService;

import java.util.List;


@RestController
public class Hello {

    private final PersonService personService;

    @Autowired
    public Hello(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/person")
    public List<Person> getAllPersons() {
        return personService.getPersons();
    }

    @GetMapping("/person/{id}")
    public Person getPersonById(@PathVariable int id) {
        return personService.getPerson(id);
    }

    @PostMapping("/create")
    public Person createPerson(@RequestBody Person person) {
        return personService.create(person);
    }

    @GetMapping("/hello")
    public ResponseEntity<String> helloWorld (@RequestParam(name="name", defaultValue="World") String name) {
        ConversionToJson json = new ConversionToJson("Hello  " + name);
        ObjectMapper objectMapper = new ObjectMapper();
        ResponseEntity<String> responseEntity;

        try {
            responseEntity = ResponseEntity.ok()
                    .body(objectMapper.writeValueAsString(json));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return responseEntity;
    }
}
