import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlString:any;
  public userName: any;

  constructor(private http:HttpClient) { 
    this.urlString='http://localhost:8082/';
  }

  public findAll():Observable<User[]>{
    return this.http.get<User[]>(`${this.urlString}`+'users');
  }

  public authenticate(email:String,password:String):Observable<object>{
    return this.http.get<object>(`${this.urlString}authenticate/${email}/${password}`)
  }

  public save(user:object):Observable<object>{
    return this.http.post(`${this.urlString}save`,user);
  }

  public delete(id:String):Observable<any>{
    return this.http.delete(`${this.urlString}delete/${id}`,{responseType:'text'});
  }

  public findById(id:String):Observable<User>{
    return this.http.get<User>(`${this.urlString}findById/${id}`)
  }

}
