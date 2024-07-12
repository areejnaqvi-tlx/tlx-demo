import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { readItem } from '@directus/sdk';
import { directus } from '../../directus';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Apply for a card';
  layoutCss: string;
  formCss: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  async ngOnInit(): Promise<void> {
    try {
      this.layoutCss = (await directus.request(readItem('layout', 'app')))[
        'css'
      ];
      this.formCss = (await directus.request(readItem('layout', 'form')))[
        'css'
      ];

      this.applyDynamicCss(this.layoutCss);
      this.applyDynamicCss(this.formCss);
    } catch (error) {
      console.log('Unable to get CSS from Directus: ', error);
    }
  }

  applyDynamicCss(cssString) {
    const styleElement = this.renderer.createElement('style');
    this.renderer.appendChild(
      styleElement,
      this.renderer.createText(cssString)
    );
    this.renderer.appendChild(this.el.nativeElement, styleElement);
  }
}
