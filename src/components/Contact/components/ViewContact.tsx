import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContact, getGroup } from "../../../services/contactService";
import { Contact, Group } from "../contact.type";

type ViewContactProps = {
  contact: Contact;
  group: Group;
};

export default function ViewContact() {
  const { id } = useParams();
  const contactId = Number(id);
  const [data, setData] = useState<ViewContactProps>({
    contact: {} as Contact,
    group: {} as Group,
  });

  useEffect(() => {
    async function fetchData() {
      const contactData = await getContact(contactId);
      const contactGroupData = await getGroup(contactData.group);
      setData({ contact: contactData, group: contactGroupData });
    }
    fetchData();
  }, []);

  const { contact, group } = data;

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
