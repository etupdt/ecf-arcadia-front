import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./pages/components/header/header.component";
import { FooterComponent } from "./pages/components/footer/footer.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {
    title = 'ecf-arcadia-front'
}
