package pl.agh.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.agh.demo.dao.Person;
import pl.agh.demo.repository.PersonsRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class PersonServiceImpl implements PersonService{
    public final PersonsRepository personsRepository;

    @Autowired
    public PersonServiceImpl(PersonsRepository personsRepository) {
        this.personsRepository = personsRepository;
    }

    public List<Person> getPersons() {
        return (List<Person>) personsRepository.findAll();
    }

    public List<Person> getPerson(String surname) {
        List<Person> persons = (List<Person>) personsRepository.findAll();
        List<Person> persons1 = new ArrayList<>();
        for (Person person: persons) {
            if (Objects.equals(person.getSurname(), surname)) {
                persons1.add(person);
            }
        }
        return persons1;
    }

    public Person create(Person person) {
        return personsRepository.save(person);
    }

    public Person getPerson(int id) {
        return personsRepository.findById((long) id).orElse(null);
    }
}
