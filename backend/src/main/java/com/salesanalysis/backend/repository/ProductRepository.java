package com.salesanalysis.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salesanalysis.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

}
