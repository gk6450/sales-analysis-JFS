package com.salesanalysis.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.salesanalysis.backend.model.Product;
import com.salesanalysis.backend.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	public Product getProductById(Integer id) {
		return productRepository.getById(id);
	}

	public void createProduct(Product product) {
		productRepository.save(product);

	}

	public void updateProduct(Integer id, Product product) {
		if(productRepository.existsById(id)) {
			product.setProductId(id);
			productRepository.save(product);
		}
	}
	
	public void deleteProductById(Integer id) {
		productRepository.deleteById(id);
	}
}
