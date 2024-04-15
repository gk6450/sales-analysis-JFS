package com.salesanalysis.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.salesanalysis.backend.model.Product;
import com.salesanalysis.backend.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping("/all-products")
	public List<Product> fetchAllProducts() {
		return productService.getAllProducts();
	}

	@GetMapping("/all-products/{productId}")
	public Product fetchProductById(@PathVariable Integer productId) {
		Product product = productService.getProductById(productId);
		return new Product(product.getProductId(), product.getName(), product.getDescription(), product.getPrice(),
				product.getManufactureDate());
	}

	@PostMapping("/new-product")
	public String createProduct(@RequestBody Product product) {
		try {
			productService.createProduct(product);
		} catch (Exception e) {
			return e.getMessage();
		}
		return "Product created successfully";
	}

	@PutMapping("/update-product/{productId}")
	public String updateProduct(@PathVariable Integer productId, @RequestBody Product product) {
		try {
			productService.updateProduct(productId, product);
		} catch (Exception e) {
			return e.getMessage();
		}
		return "Product updated successfully";
	}
	
	@DeleteMapping("/delete-product/{productId}")
	public String deleteProduct(@PathVariable Integer productId) {
		try {
			productService.deleteProductById(productId);
		} catch (Exception e) {
			return e.getMessage();
		}
		return "Product deleted successfully";
	}
}
