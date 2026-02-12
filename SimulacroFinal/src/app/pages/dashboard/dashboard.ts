import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
sidebarOpen = false;
  isMobile = window.innerWidth < 992;

  constructor() {
    this.sidebarOpen = !this.isMobile;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 992;
    this.sidebarOpen = !this.isMobile;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeOnMobile() {
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }
}
