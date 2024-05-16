import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DeveloperService } from '../../../service/developer.service';

@Component({
  selector: 'app-update-dev',
  templateUrl: './update-dev.component.html',
  styleUrl: './update-dev.component.scss'
})
export class UpdateDevComponent {

  updateDevForm!: FormGroup;
  id !: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: DeveloperService,
    private fb: FormBuilder,
    private router: Router
  ) {}
   


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.updateDevForm = this.fb.group({
      id: [null, [Validators.required]],
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      contactNo: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.getDevById();
  }

  getDevById() {
    this.service.getDevById(this.id).subscribe((res) => {
      console.log(res);
      this.updateDevForm.patchValue(res);
    });
  }

  navigateToDashboard(): void {
    if (event) {
      this.router.navigate(['/admin/table']);
    }
  }

  updateDev(id: number) {
    this.service.updateDev(this.id, this.updateDevForm.value).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.router.navigateByUrl(`admin/updateDev/${id}`);
        this.updateDevForm.patchValue(res);
        this.navigateToDashboard();
      }
    });
  }

}
