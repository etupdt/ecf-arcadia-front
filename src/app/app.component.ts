import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ErrorModalComponent } from "./modals/error-modal/error-modal.component";
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { InfoToastComponent } from "./modals/info-toast/info-toast.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent, ErrorModalComponent, LoginModalComponent, InfoToastComponent]
})
export class AppComponent {

    title = 'ecf-arcadia-front'

}
