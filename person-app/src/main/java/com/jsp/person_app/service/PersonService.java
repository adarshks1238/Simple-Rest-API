package com.jsp.person_app.service;


import com.jsp.person_app.dao.PersonRepository;
import com.jsp.person_app.entity.Person;
import com.jsp.person_app.exception.PersonNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonService {

    PersonRepository personRepository;

    public PersonService(@Autowired PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Person savePerson(Person person)
    {
        return personRepository.save(person);
    }

//find the element find by id
    public Person findById(int id)
    {
        Optional<Person> oi = personRepository.findById(id);
        if(oi.isPresent())
        {
            return oi.get();
        }
        else {
            throw new PersonNotFoundException("perosn with id not found");
        }
    }


    public Person findByEmail(String email)
    {
        Optional<Person> oe = personRepository.findByEmail(email);
        if(oe.isPresent())
        {
            return oe.get();
        }
        else {
            throw new PersonNotFoundException("perosn with email not found");
        }
    }

}
