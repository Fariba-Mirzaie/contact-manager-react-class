import "../contact.css";
import { Link } from "react-router-dom";
import { Contact } from "../contact.type";

export default function ContactItem({ contact }: { contact: Contact }) {
  return (
    <div className="ContactItem">
      <div>
        <img width="200px" height="200px" alt="img" />
      </div>
      <div className="contact-info">
        <div>
          <span>نام و نام خانوادگی:</span>
          <span>
            {contact.name} {contact.family}
          </span>
        </div>
        <div>
          <span>شماره موبایل: </span>
          <span> {contact.mobile}</span>
        </div>
        <div>
          <span>ایمیل: </span>
          <span> {contact.email}</span>
        </div>
        <div>
          <span>شغل: </span>
          <span> {contact.job}</span>
        </div>
      </div>
      <div className="buttons">
        <Link to={`/contact/view/${contact.id}`}>
          <button className="btn">مشاهده</button>
        </Link>
        <Link to={`/contact/edit/${contact.id}`}>
          <button className="btn">ویرایش</button>
        </Link>
        <button className="btn">حذف</button>
      </div>
    </div>
  );
}
