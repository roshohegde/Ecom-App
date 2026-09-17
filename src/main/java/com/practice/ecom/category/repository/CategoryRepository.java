package com.practice.ecom.category.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.ecom.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByStatus(Category.Status status);
}
