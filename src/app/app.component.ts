import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { readItem, readSingleton } from '@directus/sdk';
import { directus, Theme } from '../../directus';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Apply for a card';
  theme: Theme;
  formCss: string;
  layoutCss: string;
  primaryColor: string;
  secondaryColor: string;
  cardsCss: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  async ngOnInit(): Promise<void> {
    try {
      this.theme = await directus.request<Theme>(readSingleton('theme'));
      this.layoutCss = this.theme.base_style;
      this.formCss = this.theme.form_style;
      this.primaryColor = this.theme.primary_color;
      this.secondaryColor = this.theme.secondary_color;
      this.cardsCss = this.theme.card_style;
      this.layoutCss = this.layoutCss.replace(
        /PRIMARY_COLOR_PLACEHOLDER/g,
        this.primaryColor
      );
      this.layoutCss = this.layoutCss.replace(
        /SECONDARY_COLOR_PLACEHOLDER/g,
        this.secondaryColor
      );

      this.applyDynamicCss(this.cardsCss);
      this.applyDynamicCss(this.formCss);
      this.applyDynamicCss(this.layoutCss);
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
