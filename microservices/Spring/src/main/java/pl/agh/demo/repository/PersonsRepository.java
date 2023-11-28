package pl.agh.demo.repository;

import org.springframework.data.repository.CrudRepository;
import pl.agh.demo.dao.Person;

public interface PersonsRepository extends CrudRepository<Person, Long> {
}
