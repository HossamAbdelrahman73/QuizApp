import { Component, inject } from '@angular/core';
import { SharedService } from '../../services/shared-service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProfile } from '../../interfaces/iprofile';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
private _SharedService = inject(SharedService)
private _ToastrService = inject(ToastrService)
public _MatDialogRef = inject(MatDialogRef<UpdateProfileComponent>)
role : string | undefined = ''
lastName : string | undefined = ''
ngOnInit(): void {
this.lastName = this._SharedService.lastName
this.role = this._SharedService.role
this.updateLastNameForm.patchValue ({
  last_name: this.lastName
})
}
updateLastNameForm: FormGroup = new FormGroup({
  last_name: new FormControl('',[Validators.required]),
})
updateprofile(data: FormGroup) : void {
  if(this.role === 'Instructor') {
    this._SharedService.updateInstrucorProfile(data.value).subscribe({
      next:(res)=> {
        console.log(res);
        this._ToastrService.success(res.message)
      }, error: (err)=> {
        console.log(err);
      }, complete: ()=> {
        this.onNoClick()
      }
    })
  } else if (this.role === 'Student') {
    this._SharedService.updateStudentProfile(data.value).subscribe({
      next:(res)=> {
        console.log(res);
      }, error: (err)=> {
        console.log(err);
      }, complete: ()=> {
        this.onNoClick()
      }
    })
  }
}
onNoClick(): void {
  this._MatDialogRef.close();
}
}
