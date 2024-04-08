package org.example.springbootbackend.bootstrap;

import org.example.springbootbackend.domain.Driver;
import org.example.springbootbackend.repo.DriverRepository;
import org.springframework.boot.CommandLineRunner;

public class BootstrapData implements CommandLineRunner {

    private  final DriverRepository driverRepository;

    public BootstrapData(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        Driver eric = new Driver();
        eric.setName("eric");
        eric.setAddress("Malabe");
        eric.setAvailability("yes");

        Driver ericSaved= driverRepository.save(eric);



    }
}
