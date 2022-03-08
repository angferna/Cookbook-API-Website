import {Component, Input, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'update-user',
    templateUrl: './updateUser.html'
})
export class UpdateUserComponent {
    @Input() user: User;
    public formError: String;
    public formInfo: String;

    private modalRef?: BsModalRef;
    static parameters = [BsModalService, UserService];

    constructor(private modalService: BsModalService, private userService: UserService) {
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    updateUser() {
        this.userService.updateUser(this.user)
            .then(updatedUser => {
                this.formInfo = 'User successfully updated!';
                this.formError = null;
            })
            .catch(error => {
                this.formInfo = null;
                this.formError = error.toString();
            });
    }
}
