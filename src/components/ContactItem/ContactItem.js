import React from "react";
import "./ContactItem.css"

const ContactItem = (props) => {
  return (
    <div className="contact-item" key={props.contact.id}>
      <img
        className="contact-item__img"
        alt={"imagen de " + props.contact.name}
        src={props.contact.imageUrl}
      />
      <div className="contact-item__info-info">
        <div className="contact-item__info">
        <p className="contact-item__name">
          {props.contact.name} {""}
        </p>
        <p className="contact-item__lastname">{props.contact.lastName}</p>
        </div>
       
        <p className="contact-item__phone">{props.contact.phone}</p>
        <button
          className="contact-item__delete-btn"
          onClick={() => props.deleteItem(props.contact)}
        >
          ELIMINAR
        </button>
      </div>
    </div>
  );
};
const ContactItemMemo = React.memo(ContactItem);

export default ContactItemMemo;
