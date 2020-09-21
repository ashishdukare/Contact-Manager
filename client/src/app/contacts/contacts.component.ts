import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import { Contact } from '../contact';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms'; // required for form validation

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})

export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: string;
 
  constructor(private contactService: ContactService) { }
 
  addContact(){
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
    };

    this.contactService.addContact(newContact)
    .subscribe( (contact: Contact) => { // Here we are typecasting contact which is an object to type 'Contact'
      this.contacts.push(contact); // Pushing the new contact to our client side contacts array
      this.contactService.getContacts()
          .subscribe( (contacts: Contact[]) => // Here we are typecasting contacts which is an object to 'Contact[]' array
          this.contacts = contacts); // since it will be returning observable we need to subscribe that
        });
  }

  deleteContact(id:any){
    var contacts = this.contacts;
    this.contactService.deleteContact(id)
      .subscribe(suc =>{
          for(var i=0; i<contacts.length; i++){
            if(contacts[i]._id == id){
              contacts.splice(i,1);
            }
          }
      });
  }

  ngOnInit(){
    this.contactService.getContacts()
    .subscribe( (contacts: Contact[]) => // Here we are typecasting contacts which is an object to 'Contact[]' array
        this.contacts = contacts); // since it will be returning observable we need to subscribe that
  }
}
