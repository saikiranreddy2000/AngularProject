import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  user: any;
  userRole: string | undefined;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    const user = this.userService.getUser();
  }

  userDetails() {
    return this.userService.getUser();
  }
  // function () {
  //   'use strict'
  //   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  //   tooltipTriggerList.forEach(function (tooltipTriggerEl) {
  //     new bootstrap.Tooltip(tooltipTriggerEl)
  //   })
  // }
}
