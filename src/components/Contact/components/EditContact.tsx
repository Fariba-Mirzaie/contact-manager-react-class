import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Contact, Group } from "../contact.type";
import { editContact, getContact } from "../../../services/contactService";
import { ContactContext } from "../../../context/contactContext";

export default function EditContact() {
  const { id } = useParams();
  const contactId = Number(id);
  const [newInfo, setNewInfo] = useState<Contact>({} as Contact);
  const navigate = useNavigate();
  const { groups } = useContext(ContactContext);

  useEffect(() => {
    async function fetchData() {
      const contactData = await getContact(contactId);
      setNewInfo(contactData);
    }

    fetchData();
  }, []);

  function handleChangeInfo(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setNewInfo({ ...newInfo, [event.target.name]: event.target.value });
  }

  async function updateContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await editContact(contactId, newInfo);
    alert("ویرایش با موفقیت انجام شد");
    navigate("/contacts");
  }

  return newInfo.id ? (
    <>
      <h2 className="title">ویرایش اطلاعات مخاطب </h2>
      <form onSubmit={updateContact}>
        <div className="add-form">
          <input
            name="name"
            placeholder="نام"
            onChange={handleChangeInfo}
            value={newInfo.name}
          />
          <input
            name="family"
            placeholder="نام خانوادگی"
            onChange={handleChangeInfo}
            value={newInfo.family}
          />
          <input
            name="mobile"
            placeholder="موبایل"
            onChange={handleChangeInfo}
            value={newInfo.mobile}
          />
          <input
            name="email"
            placeholder="ایمیل"
            onChange={handleChangeInfo}
            value={newInfo.email}
          />
          <input
            name="image"
            placeholder="تصویر"
            onChange={handleChangeInfo}
            value={newInfo.image}
          />
          <input
            name="job"
            placeholder="شغل"
            onChange={handleChangeInfo}
            value={newInfo.job}
          />

          <select
            name="group"
            onChange={handleChangeInfo}
            value={newInfo.group}
          >
            <option value="">انتخاب گروه</option>
            {groups.length > 0 &&
              groups.map((item: Group) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          <div className="buttons">
            <button type="submit" className="btn">
              ثبت تغییرات
            </button>
            <Link to="/contacts">
              <button className="btn"> انصراف</button>
            </Link>
          </div>
        </div>
      </form>
    </>
  ) : null;
}
