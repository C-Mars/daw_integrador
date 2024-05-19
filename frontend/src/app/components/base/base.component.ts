import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitterModule } from 'primeng/splitter';


@Component({
  selector: 'app-base',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ToastModule,ToolbarModule,SplitterModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {

}
