package com.verly.noodle.repositories;

import com.verly.noodle.models.NoodleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoodleRepository extends JpaRepository<NoodleModel, Long> {
}