package org.example.springbootbackend.controllers;

import org.example.springbootbackend.services.DevService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DevController {

    private final DevService devService;

    public DevController(DevService devService) {
        this.devService = devService;
    }

    @RequestMapping("/devs")
    public String getDevs(Model model){

        model.addAttribute("devs", devService.findAll());

        return "devs";

    }

}
