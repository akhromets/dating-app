import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from '../../services/members.service';
import { Member } from '../../models/Member';
import { User } from '../../models/User';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService
      .getMember(this.user.username)
      .subscribe(member => this.member = member);
  }

  updateMember() {
    console.log(this.member);
    this.toastr.success('Profile updated successfully.');
    this.editForm.reset(this.member);
  }

}
