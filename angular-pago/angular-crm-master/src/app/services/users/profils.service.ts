import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageService} from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private messageService: MessageService) {}

  getUserProfil(user) {
    this.http.get(environment.url + 'profile/?username=' + user.login)
      .subscribe((res: Array<any>) => {
        console.log(res)
        if (res.length > 0 && res[0].username === user.login) {
          if (res[0].password === user.password) {
            const message = {
              text: 'connection made',
              display: true,
              valid: true
            };
            this.messageService.sendMessage(message);
          } else {
            const message = {
              text: 'invalid password',
              display: true,
              valid: false
            };
            this.messageService.sendMessage(message);
          }
        } else {
          const message = {
            text: 'no profile matches',
            display: true,
            valid: false
          };
          this.messageService.sendMessage(message);
        }
      });
  }

}
