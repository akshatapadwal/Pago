import {Component, OnInit} from '@angular/core';
import {OpportunityService} from '../../services/opportunity/opportunity.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../services/contact/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit {

  opportunityForm: FormGroup;

  contact: FormControl;
  title: FormControl;
  description: FormControl;
  amount: FormControl;

  form: boolean;
  formSubmitAttempt: boolean;


  constructor(private opportunityService: OpportunityService,
              private router: Router,
              private contactService: ContactService) {
  }

  ngOnInit() {
    this.form = false;
    this._buildForm();
  }

  get opportunity() {
    return this.opportunityService.opportunity;
  }

  get proposal() {
    return this.opportunityService.proposal;
  }

  get profit() {
    return this.opportunityService.profit;
  }

  get loss() {
    return this.opportunityService.loss;
  }

  get informations() {
    return this.contactService.informations;
  }

  next(item) {
    this.defineStep(item, 'proposal');
  }

  win(item) {
    this.defineStep(item, 'profit');
  }

  loose(item) {
    this.defineStep(item, 'loss');
  }

  redirect(ev) {
    this.router.navigate(['/admin/opportunity/view', ev]);
  }

  remove(ev) {
    this.opportunityService._deleteOpportunity(ev);
  }

  save() {
    this.formSubmitAttempt = true;
    if (this.opportunityForm.status === 'VALID') {
      this.opportunityService._postOpportunity(this.opportunityForm.value);
      this.formSubmitAttempt = true;
      this.opportunityForm.reset();
      this.form = false;
    }
  }

  private _buildForm() {
    this.contact = new FormControl('', [Validators.required]);
    this.title = new FormControl('', [Validators.required]);
    this.description = new FormControl('', []);
    this.amount = new FormControl('', [Validators.required]);

    this.opportunityForm = new FormGroup({
      contactId: this.contact,
      title: this.title,
      description: this.description,
      amount: this.amount
    });

  }

  private defineStep(item, state) {
    item.step = state;
    this.opportunityService._updateOpportunity(item);
  }

}
