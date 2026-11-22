package com.jsp.person_app.controller;


import com.jsp.person_app.entity.Person;
import com.jsp.person_app.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PersonController {

    @Autowired
    PersonService personService;

//    @CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
    @PostMapping("/api/save")
    public ResponseEntity<Person> savePerson(@RequestBody Person person)
    {
        Person savedPerson = personService.savePerson(person);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPerson);
    }

//    @CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
    @GetMapping("/api/findbyid")
    public ResponseEntity<Person> findPerson(@RequestParam int id)
    {
        Person findedPerson = personService.findById(id);

        return ResponseEntity.status(HttpStatus.OK).body(findedPerson);
    }

//    @CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
    @GetMapping("/api/findbyemail")
    public ResponseEntity<Person>  findPerson(@RequestParam String email)
    {
        Person findedPerson = personService.findByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(findedPerson);
    }


}
