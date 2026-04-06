package com.verly.noodle.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "noodles") //search T^T
public class NoodleModel {

	/*  
	 * DOCU: Represents a Noodle entity with fields for name, restaurant, spice level, and notes.  
	 * @param {Long} id - Unique identifier for the noodle  
	 * @param {String} name - Name of the noodle (required, 2-100 characters)  
	 * @param {String} restaurant - Name of the restaurant (required)  
	 * @param {String} spiceLevel - Spice level of the noodle (required)  
	 * @param {String} notes - Additional notes (optional, max 255 characters)  
	 * @returns {NoodleModel} - Noodle object with getters and setters for all fields  
	 * @throws {ConstraintViolationException} - If validation constraints are violated  
	 *  
	 * Date:  2026-03-20
	 * Last Updated: 2026-03-21  
	 * Author: Janverly Bacani 
	 */
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Noodle name is required")
    @Size(min = 2, max = 100)
    private String name;

    @NotBlank(message = "Restaurant is required")
    private String restaurant;

    @NotBlank(message = "Spice level is required")
    private String spiceLevel;

    @Size(max = 255, message = "Notes must be under 255 characters")
    private String notes;

    public NoodleModel() {}

    /* Getters and Setters */
    public Long getId() { 
    	return id; 
    	}
    public void setId(Long id) { 
    	this.id = id; 
    	}

    public String getName() { 
    	return name; 
    	}
    public void setName(String name) { 
    	this.name = name; 
    	}

    public String getRestaurant() { 
    	return restaurant; 
    	}
    public void setRestaurant(String restaurant) { 
    	this.restaurant = restaurant; 
    	}

    public String getSpiceLevel() {
    	return spiceLevel; 
    	}
    public void setSpiceLevel(String spiceLevel) { 
    	this.spiceLevel = spiceLevel; 
    	}

    public String getNotes() { 
    	return notes; 
    	}
    public void setNotes(String notes) { 
    	this.notes = notes; 
    	}
}