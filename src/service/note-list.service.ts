import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Note } from '../model/note.model';

@Injectable()
export class NoteListService {

    private noteListRef = this.db.list<Note>('/orderlist');

    constructor(private db: AngularFireDatabase) { }

    getNoteList() {
        console.log("List - "+JSON.stringify(this.noteListRef))
        console.log("List - "+this.noteListRef[0]);
        return this.noteListRef;
    }

    // addNote(note: Note) {
    //     return this.noteListRef.push(note);
    // }

    // updateNote(note: Note) {
    //     return this.noteListRef.update(note.key, note);
    // }

    // removeNote(note: Note) {
    //     return this.noteListRef.remove(note.key);
    // }
}