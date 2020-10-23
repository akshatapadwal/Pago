import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Opportunity} from '../../interface/opportunity';
import {forEach} from '@angular/router/src/utils/collection';
import {Invoice} from '../../interface/invoice';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  private _opportunities: Array<Opportunity>;
  private _opportunity: Opportunity;
  private _opportunitiesContact: Array<Opportunity>;

  private _proposal: Array<Opportunity>;
  private _profit: Array<Opportunity>;
  private _loss: Array<Opportunity>;

  private _totalOpp: number;

  private _totalWin: number;
  private _coutlWin: number;

  private _totalWait: number;
  private _countWait: number;

  private _totalProposal: number;
  private _countProposal: number;

  constructor(private http: HttpClient) {
    this._getOpportunity();
    this._countOpportunityByStep();
  }

  get opportunity() {
    return this._opportunities;
  }

  get oneOpportunity() {
    return this._opportunity;
  }

  get contactOpportunity() {
    return {
      opp: this._opportunitiesContact,
      count: this._totalOpp
    };
  }

  get proposal() {
    return this._proposal;
  }

  get opportunityCount() {
    return {
      wait: {
        count: this._countWait,
        total: this._totalWait
      },
      proposal: {
        count: this._countProposal,
        total: this._totalProposal
      },
      win: {
        count: this._coutlWin,
        total: this._totalWin
      },

    };
  }

  get profit() {
    return this._profit;
  }

  get loss() {
    return this._loss;
  }

  _updateOpportunity(item) {
    this.http.put(environment.url + 'opportunity/' + item.id, item)
      .subscribe(() => {
        this._getOpportunity();
      });
  }

  _postOpportunity(item) {

    item.step = 'In progress';

    this.http.post(environment.url + 'opportunity', item)
      .subscribe(() => {
        this._getOpportunity();
      });
  }

  _getOpportunity() {
    this.http.get(environment.url + 'opportunity')
      .subscribe((res: Array<Opportunity>) => {

        const opportunity = [];
        const proposal = [];
        const profit = [];
        const loss = [];

        for (let item of res) {
          switch (item.step) {
            case 'In progress':
              opportunity.push(item);
              break;

            case 'proposal':
              proposal.push(item);
              break;

            case 'profit':
              profit.push(item);
              break;

            case 'loss':
              loss.push(item);
              break;
          }
        }

        this._opportunities = opportunity;
        this._proposal = proposal;
        this._profit = profit;
        this._loss = loss;

      });
  }

  _getOpportunityByContact(id) {
    this.http.get(environment.url + 'opportunity/?contactId=' + id)
      .subscribe((res: Array<Opportunity>) => {

        let total = 0;

        for (const item of res) {
          total = total + item.amount;
        }

        this._totalOpp = total;
        this._opportunitiesContact = res;
      });
  }

  _countOpportunityByStep() {
    this.http.get(environment.url + 'opportunity')
      .subscribe((res: Array<Opportunity>) => {

        let win = 0;
        let proposal = 0;
        let wait = 0;
        let countWait = 0;
        let countProposal = 0;
        let countWin = 0;

        for (const item of res) {
          switch (item.step) {

            case 'In progress':
              wait = wait + item.amount;
              countWait++;
              break;

            case 'proposal':
              proposal = proposal + item.amount;
              countProposal++;
              break;

            case 'profit':
              win = win + item.amount;
              countWin++;
              break;

          }
        }

        this._coutlWin = countWin;
        this._countProposal = countProposal;
        this._countWait = countWait;

        this._totalWin = win;
        this._totalProposal = proposal;
        this._totalWait = wait;

      });
  }

  _getOneOpportunity(id) {
    this.http.get(environment.url + 'opportunity/' + id)
      .subscribe((res: Opportunity) => {
        this._opportunity = res;
      });
  }

  _deleteOpportunity(id) {
    this.http.delete(environment.url + 'opportunity/' + id)
      .subscribe(() => {
        this._getOpportunity();
      });
  }

}
