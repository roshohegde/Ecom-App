package com.practice.ecom.order.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.ecom.order.entity.CustomerOrder;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {

    @EntityGraph(attributePaths = {"items", "user"})
    Page<CustomerOrder> findByUserId(Long userId, Pageable pageable);

    @EntityGraph(attributePaths = {"items", "user"})
    Optional<CustomerOrder> findByOrderNumber(String number);

    @Override
    @EntityGraph(attributePaths = {"items", "user"})
    Optional<CustomerOrder> findById(Long id);
}
