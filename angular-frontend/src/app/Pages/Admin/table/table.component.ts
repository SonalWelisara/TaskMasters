import { Component } from '@angular/core';
import { Developers } from '../../../Dto/developers';
import { DeveloperService } from '../../../service/developer.service';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  isVisible = false;


  devs: any[] = [];


  constructor(private developerService: DeveloperService,private router : Router) {}

  ngOnInit() {
    this.getAllDevs();
  }
  
  private getAllDevs(){
    this.developerService.getAllDevs().subscribe((res)=>{
      console.log(res);
      this.devs = res ; 
    })
  }

  toDevUpdate(id:number){
    this.router.navigateByUrl(`admin/updateDev/${id}`)
  }
  
  deleteDev(id:number){
    this.developerService.deleteDev(id).subscribe((res)=>{
      console.log(res);
      this.getAllDevs();
    })
  }

  toAddDev(){
    this.router.navigateByUrl(`admin/addDev`)
  }

}
