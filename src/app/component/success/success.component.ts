import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../directus';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent implements OnInit {
  user: string;
  validParams: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.validParams = true;
    this.user = null;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.user = params.get('user') || null;
      if (this.user === null) {
        this.validParams = false;
      } else {
        this.validParams = true;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
