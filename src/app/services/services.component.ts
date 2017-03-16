import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: [
    './services.component.css',
    '../app.component.css'
  ]
})

// Services Conponent
//
// get service list and shot service items on service page.
export class ServicesComponent implements OnInit {
  services: Object[];
  service: Object;
  hasService: boolean;

  constructor(
    private servicesService: ServicesService,
    private toast: ToastsManager
  ) { }

  ngOnInit() {
    this.listService();
  }

  // Function: listService
  // Get service list by services service
  listService() {
    this.servicesService.listService()
      .subscribe(data => {
        this.services = data["items"];
        this.hasService = (this.services.length !== 0)
        console.log(this.services);
      });
  }

  // Function: deleteService
  // delete service by service Object
  //
  // params: Object
  deleteService(service: Object) {
    service['state'] = 1;
    var body = {
      "name": service["metadata"]["name"],
      "deleteVolume": true
    }
    this.servicesService.deleteService(body)
      .subscribe(res => {
        service['state'] = 0;
        this.toast.success(res.text(), 'SUCCESS', { toastLife: 3000 });
        this.listService();
      }, err => {
        service['state'] = 0;
        this.toast.error(err.text(), 'ERROR', { toastLife: 3000 });
        this.listService();
      });
  }

  // Get service from html template
  getService(service: Object) {
    this.service = service;
  }

}
