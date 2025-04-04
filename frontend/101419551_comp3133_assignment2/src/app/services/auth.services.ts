import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { LOGIN, SIGNUP } from '../graphql/user.graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(username: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: { username, password }
    });
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: { username, email, password }
    });
  }
}