import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requeststome',
  templateUrl: './requeststome.component.html',
  styleUrls: ['./requeststome.component.css'],
  providers: [RequestService]
})
export class RequesttomeComponent implements OnInit {

  requests:[any]

  constructor(
    private requestService:RequestService,
    private router: Router,
  ) { }


  showRequeststome(){
        this.requestService.getRequeststoMe()
            .subscribe(requests => {
                if(requests.length){
                    this.requests = requests;
                }
            })
    }

    approveRequest(request){
        this.requestService.apprRequeststoMe(request)
            .subscribe(requests => {
                this.requestService.openSnackBar(`Successfully Update Request !`);
                this.showRequeststome();
            })
    }

    ngOnInit() {
        this.showRequeststome();
    }

}
