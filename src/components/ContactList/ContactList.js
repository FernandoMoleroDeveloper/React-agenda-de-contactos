import React from "react";
import ContactItemMemo from "../ContactItem/ContactItem";

import "./ContactList.css";
//import { useDebounce } from "use-debounce";

const ContactList = React.memo(() => {
  const API_URL = "http://localhost:4000/contact";

  const [contactList, setContactList] = React.useState([]);
  const [filter, setFilter] = React.useState("");
 // const [filterWithTime] = useDebounce(filter, 500);

/* React.useEffect(() => {

        
    
    fetch(`${API_URL}${filterWithTime}`)
        .then((response) => response.json())
        .then((data) => {
            setContactList(data);
        }) 
}, [filterWithTime]);*/
  
  const [newContact, setNewContact] = React.useState({
    name: "",
    lastName: "",
    phone: "",
    imageUrl: "",
  });

  React.useEffect(() => {
    getAllContactsFromApi();
  }, []);

  const getAllContactsFromApi = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setContactList(data));
  };

  const deleteContact = React.useCallback((contact) => {
    fetch(`${API_URL}/${contact.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => getAllContactsFromApi());
  }, []);

  const addNewContact = (event) => {
    event.preventDefault();

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newContact),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        getAllContactsFromApi();
        setNewContact({
          name: "",
          lastName: "",
          phone: "",
          imageUrl: "",
        });
      });
  };

  return (
    <div className="contact-list">
      <h2>Mi agenda ({contactList.length}) </h2>

      {contactList.map((contact) => (
        <ContactItemMemo
          key={contact.id}
          contact={contact}
          deleteItem={deleteContact}
        ></ContactItemMemo>
      ))}
      <h2>Buscar</h2>
      <input type="text"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}>
      </input>
      <h2> Añadir nuevo contacto</h2>
      <form onSubmit={(event) => addNewContact(event)}>
        <p>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newContact.name}
            onChange={(event) =>
              setNewContact({
                ...newContact,
                name: event.target.value,
              })
            }
          />
        </p>
        <p>
          <label>Apellidos</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={newContact.lastName}
            onChange={(event) =>
              setNewContact({
                ...newContact,
                lastName: event.target.value,
              })
            }
          />
        </p>
        <p>
          <label>Teléfono</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={newContact.phone}
            onChange={(event) =>
              setNewContact({
                ...newContact,
                phone: event.target.value,
              })
            }
          />
        </p>
        <p>
          <label>Url de la imagen</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            onChange={(event) =>
              setNewContact({
                ...newContact,
                imageUrl: event.target.value,
              })
            }
          />
        </p>
        <button type="submit">Añadir contacto</button>
      </form>
    </div>
  );
});

export default ContactList;
