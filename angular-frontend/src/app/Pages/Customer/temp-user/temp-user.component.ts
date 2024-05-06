import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TempuserService } from '../../../service/tempuser.service';
import { UserIdServiceService } from '../../../service/user-id-service.service';;

@Component({
  selector: 'app-temp-user',
  templateUrl: './temp-user.component.html',
  styleUrl: './temp-user.component.scss'
})
export class TempUserComponent {
  id!: number;

  constructor(private router: Router, private tempuserService : TempuserService, private userIdService: UserIdServiceService ) {}

  getUserDetails() {
    
    this.tempuserService.getUserById(this.id).subscribe((user) => {
      if (user) {
        
        const userId = user.id;

        this.userIdService.setUserId(userId);
        
        this.router.navigate(['user/userHome', userId]);
      } else {
        
        console.log('User not found');
      }
    });
  }

}
