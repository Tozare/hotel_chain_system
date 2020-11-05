package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Book;
import net.javaguides.springboot.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}
