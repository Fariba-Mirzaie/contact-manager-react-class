import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addContact } from "../../../services/contactService";
import { Contact, Group } from "../contact.type";

type AddContactProps = {
  groups: Group[];
};

export default function AddContact({ groups }: AddContactProps) {
  const [newContact, setNewContact] = useState<Contact>({} as Contact);
  const navigate = useNavigate();

  function handleChangeInfo(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setNewContact({ ...newContact, [event.target.name]: event.target.value });
  }

  async function createContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newContact) {
      const response = await addContact(newContact);
      alert("ثبت با موفقیت انجام شد");
      navigate("/contacts");
    }
  }

  return (
    <>
      <h2 className="title">ایجاد مخاطب جدید</h2>
      <form onSubmit={createContact}>
        <div className="add-form">
          <input name="name" placeholder="نام" onChange={handleChangeInfo} />
          <input
            name="family"
            placeholder="نام خانوادگی"
            onChange={handleChangeInfo}
          />
          <input
            name="mobile"
            placeholder="موبایل"
            onChange={handleChangeInfo}
          />
          <input name="email" placeholder="ایمیل" onChange={handleChangeInfo} />
          <input name="image" placeholder="تصویر" onChange={handleChangeInfo} />
          <input name="job" placeholder="شغل" onChange={handleChangeInfo} />

          <select name="group" onChange={handleChangeInfo}>
            <option value="">انتخاب گروه</option>
            {groups.length > 0 &&
              groups.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          <div className="buttons">
            <button type="submit" className="btn">
              ثبت
            </button>
            <Link to="/contacts">
              <button className="btn"> انصراف</button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
