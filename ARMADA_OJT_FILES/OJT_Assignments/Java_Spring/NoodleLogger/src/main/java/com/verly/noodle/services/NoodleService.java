package com.verly.noodle.services;

import com.verly.noodle.models.NoodleModel;
import com.verly.noodle.repositories.NoodleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoodleService {

	/*  
	 * DOCU: Service class handling CRUD operations for Noodle entities  
	 * @param {NoodleModel} noodle - Noodle object to create or update  
	 * @param {Long} id - ID of the noodle to find or delete  
	 * @returns {List<NoodleModel>} - List of all noodles (allNoodles)  
	 * @returns {Optional<NoodleModel>} - Noodle object wrapped in Optional (findNoodle)  
	 * @returns {NoodleModel} - Created or updated noodle object (createNoodle, updateNoodle)  
	 * @throws {IllegalArgumentException} - If noodle not found (handled in controller)  
	 *  
	 * Date: 2026-03-20 
	 * Last Updated: 2026-03-21  
	 * Author: Janverly Bacani  
	 */
	
    private final NoodleRepository noodleRepository;

    public NoodleService(NoodleRepository noodleRepository) {
        this.noodleRepository = noodleRepository;
    }

    public List<NoodleModel> allNoodles() {
        return noodleRepository.findAll();
    }

    public NoodleModel createNoodle(NoodleModel noodle) {
        return noodleRepository.save(noodle);
    }

    public Optional<NoodleModel> findNoodle(Long id) {
        return noodleRepository.findById(id);
    }

    public NoodleModel updateNoodle(NoodleModel noodle) {
        return noodleRepository.save(noodle);
    }

    public void deleteNoodle(Long id) {
        noodleRepository.deleteById(id);
    }

    public void deleteAllNoodles() {
        noodleRepository.deleteAll();
    }
}