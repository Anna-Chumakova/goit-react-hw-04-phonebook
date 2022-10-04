import { useState, useEffect } from "react";
import FormAddContact from "./FormAddContact/FormAddContact";
import ContactList from "./ContactList/ContactList";
import { nanoid } from "nanoid";
import styles from "./Phonebook.module.css";
import propTypes from "prop-types";

const Phonebook = ({name, number}) => {
    const [contacts, setContacts] = useState(() => { return JSON.parse(window.localStorage.getItem("contacts")) ?? "" });
    const [filter, setFilter] = useState("");
    console.log(contacts);
    useEffect(
        () => {
            window.localStorage.setItem("contacts", JSON.stringify(contacts));
        }, [contacts]
    );
    
    const addContact = (contact) => {
    if (isDuplicate(contact)) {
        return alert(`${contact.name} - ${contact.number} is already in contacts`);
    }
    setContacts((prev) => {
        const newContact = {
            id: nanoid(),
            ...contact
        }
        return [...prev, newContact];
        
    })
  }
    const removeContact = (id) => {
        setContacts((prev) => {
        const newContacts = prev.filter((item) => item.id !== id);
            return newContacts;
            
        })
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setFilter( value
        )
    }
        
    const isDuplicate = ({name, number}) => {
        const result = contacts.find((item) => item.name === name && item.number === number);
        return result;
    }

    const getFilteredContacts = () => {
    
        if (!filter) {
            return contacts;
        }

        const normalizedFilter = filter.toLocaleLowerCase();
        const filteredContacts = contacts.filter(({name, number}) => {
            const normalizedName = name.toLocaleLowerCase();
            const normalizedNumber = number.toLocaleLowerCase();
            const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
            return result;
        })
        return filteredContacts;
    }
    const contactsFilter = getFilteredContacts();
    console.log(contactsFilter);
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Contacts</h2>
            <div className={styles.contactBlock}>
                <div>
                    <FormAddContact onSubmit={addContact} />
                </div>
                    <div>
                    <h3>Find contacts by name</h3>
                    <input type="text" name="filter" onChange={handleChange} value={filter} className={styles.filter} placeholder="Filter" />
                    <ContactList items={contactsFilter} removeContact={removeContact} />
            </div>
            </div>
      </div>
    )   
    }
Phonebook.propTypes = {
    name: propTypes.string,
    number: propTypes.number
}
export default Phonebook;