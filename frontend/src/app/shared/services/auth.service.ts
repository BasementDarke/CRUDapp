import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user.model';
import { ApiUrls } from '../constants/urls';
import { UserRegistrationDto } from '../models/user-registration.model';
import { UserLoginDto } from '../models/user-login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceTs {
  private readonly http = inject(HttpClient);

  public registerPost(requestBody: UserRegistrationDto): Observable<unknown> {
    return this.http.post(ApiUrls.RegisterUrl, requestBody)
  }

  public loginPost(requestBody: UserLoginDto): Observable<unknown> {
    return this.http.post(ApiUrls.LoginUrl, requestBody);
  }

  public meGet(): Observable<UserDto> {
    return this.http.get<UserDto>(ApiUrls.MeUrl)
  }
}
