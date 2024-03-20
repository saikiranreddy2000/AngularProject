import { HttpClient} from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-staffaccess',
  templateUrl: './staffaccess.component.html',
  styleUrls: ['./staffaccess.component.scss'],
})
export class StaffaccessComponent implements OnInit {
  ApprovedUsers!: any;
  notApprovedUsers:any
  selectedOption: any;
  constructor(
    private userservice: UserService,
    private modalService: NgbModal,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.userservice.userData().subscribe((data) => {
      this.ApprovedUsers = data;
    });
    this.userservice. notapproveduser().subscribe((data)=>{
      this.notApprovedUsers=data
    })
  }
  decline(user:any,i:any){
    this.http.post<any>('http://localhost:3000/Notapprovedusers', user)
      .subscribe(
        (res) => {
          console.log("users",res);
          this.notApprovedUsers.push(res);
          this.userservice.deletefromApproverlist(user?.id).subscribe(
          () => {
              this.ApprovedUsers.splice(i, 1);
             alert("Access removed");
            },
            (err) => {
              console.log('error',err);
            }
          );
        },
        (err) => {
          console.log('error while posting the data',err);
        }
      );
  }
  approveUser(user:any,i:any){
    this.http.post<any>('http://localhost:3000/user', user)
      .subscribe(
        (res) => {
          console.log("users",res);
          this.ApprovedUsers.push(res);
          this.userservice.deletefromnotApproverlist(user?.id).subscribe(
          () => {
              this.notApprovedUsers.splice(i, 1);
             
            },
            (err) => {
              console.log('error',err);
            }
          );
        },
        (err) => {
          console.log('error while posting the data',err);
        }
      );
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
