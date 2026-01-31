import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContact } from "../../../services/contactService";
import { Contact, Group } from "../contact.type";
import { ContactContext } from "../../../context/ContactContext";

export type ViewContactProps = {
  contact: Contact;
  group: Group;
};

export default function ViewContact() {
  const { id } = useParams();
  const [data, setData] = useState<ViewContactProps>({
    contact: {} as Contact,
    group: {} as Group,
  });
  const { contact, group } = data;
  const { groups } = useContext(ContactContext);

  useEffect(() => {
    async function fetchData() {
      const contactData = id ? await getContact(id) : {};
      const contactGroupData = groups.find((g) => g.id === contactData.group);

      if (contactData && contactGroupData)
        setData({ contact: contactData, group: contactGroupData });

      console.log("c", contactData);
      console.log("g", contactGroupData);
    }
    fetchData();
  }, []);

  return data ? (
    <div className="ContactItem">
      <div>
        <img width="200px" height="200px" alt="img" />
      </div>
      <div className="contact-info">
        <div>
          <span>نام و نام خانوادگی: </span>
          <span>
            {contact.name} {contact.family}
          </span>
        </div>
        <div>
          <span> شماره موبایل:</span>
          <span> {contact.mobile}</span>
        </div>
        <div>
          <span>آدرس ایمیل:</span>
          <span> {contact.email}</span>
        </div>
        <div>
          <span>شغل:</span>
          <span> {contact.job}</span>
        </div>
        <div>
          <span>گروه:</span>
          <span> {group.name}</span>
        </div>
      </div>
    </div>
  ) : null;
}
