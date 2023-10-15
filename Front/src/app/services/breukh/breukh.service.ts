import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BreukhService {

  constructor(private breukh: HttpClient) {}

  getFiliere()
  {
    return this.breukh.get("http://127.0.0.1:8000/api/filiere")
  }

  getModule(id: number) {
    return this.breukh.get(`http://127.0.0.1:8000/api/filiere/${id}/module`)
  }

  getProf(id: number) {
    return this.breukh.get(`http://127.0.0.1:8000/api/module/${id}/prof`)
  }

  addCour(data: any) {
    return this.breukh.post("http://127.0.0.1:8000/api/cour", data)
  }

  allModule(id: number) {
    return this.breukh.get(`http://127.0.0.1:8000/api/module/${id}`)
  }

  existingCours(sm: number, modId: number, profId: number) {
    return this.breukh.get(`http://127.0.0.1:8000/api/sm/${sm}/module/${modId}/prof/${profId}`)
  }
  
  profSession(sm: number, id: number) {
    return this.breukh.get(`http://127.0.0.1:8000/api/sm/${sm}/module/${id}/prof`)
  }

  getResources()
  {
    return this.breukh.get("http://127.0.0.1:8000/api/cour")
  }

  filMod(fil: number, mod: number) {
    return this.breukh.get(`http://127.0.0.1:8000/api/fil/${fil}/mod/${mod}`)
  }

  addSes(data: any)
  {
    return this.breukh.post("http://127.0.0.1:8000/api/session", data)
  }

  sessCour(id: number) {
    return this.breukh.get(`http://127.0.0.1:8000/api/cours/${id}/sessions`)
  }

  addEtudiant(data: any) {
    return this.breukh.post("http://127.0.0.1:8000/api/import", data)
  }

  courProf(id: number)
  {
    return this.breukh.get(`http://127.0.0.1:8000/api/prof/${id}/cours`)
  }

  canceled(id: number, motif: string) {
    return this.breukh.post("http://127.0.0.1:8000/api/canceledSes", {id, motif})
  }

  getNotif() {
    return this.breukh.get("http://127.0.0.1:8000/api/notif")
  }

  response(id: number, res: string) {
    return this.breukh.post("http://127.0.0.1:8000/api/responseDemande", { id, res })
  }

  getProfs()
  {
    return this.breukh.get("http://127.0.0.1:8000/api/profs")
  }

  mod()
  {
    return this.breukh.get("http://127.0.0.1:8000/api/module")
  }

  time(module: string, prof: number) {
    return this.breukh.get(`http://127.0.0.1:8000/api/mod/${module}/prof/${prof}`)
  }

  delete(session: number) {
    return this.breukh.delete(`http://127.0.0.1:8000/api/session/${session}`)
  }

  eleves(classes: any) {
    return this.breukh.post("http://127.0.0.1:8000/api/eleves", {classes})
  }

}

