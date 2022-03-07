import { Component } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
    selector: 'test-alert',
    templateUrl: './test-alert.html'
})
export class TestAlertComponent {
    dismissible = true;

    defaultAlerts: any[] = [
        {
            type: 'success',
            msg: `Hey you! The quarter is almost done! Stay strong!`
        },
        {
            type: 'info',
            msg: `Heads up! There are 2 more weeks left in the quarter!`
        },
        {
            type: 'warning',
            msg: `Uh Oh! Finals are coming up you better get studying!`
        },
        {
            type: 'danger',
            msg: 'Yikes! You better get those grades up before its too late!'
        }
    ];

    alerts = this.defaultAlerts;

    reset(): void {
        this.alerts = this.defaultAlerts;
    }

    onClosed(dismissedAlert: any): void {
        this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }
}
