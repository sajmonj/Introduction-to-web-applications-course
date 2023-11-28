package pl.agh.demo.service;

import pl.agh.demo.dao.Person;
import java.util.List;

public interface PersonService {
    public List<Person> getPersons();
    public List<Person> getPerson(String surname);
    public Person create(Person person);
    public Person getPerson(int id);
}
