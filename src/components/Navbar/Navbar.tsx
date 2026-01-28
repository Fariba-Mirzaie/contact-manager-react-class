import { Link, useLocation } from "react-router-dom";
import { SearchContact, Separator } from "../../components";
import "./navbar.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const location = useLocation();

  function handleScroll(e: Event) {
    let position = window.pageYOffset || document.documentElement.scrollTop;
    setIsScroll(position > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = isScroll ? "main fixed-header" : "main";
  return (
    <div className={styles}>
      <div className="navbar">
        <div></div>
        <div className="logo">
          <Link to="/contacts">
            <img
              src="/assets/images/user.png"
              alt="logo"
              style={{ width: isScroll ? 32 : 52 }}
            />
          </Link>
          <span>اپلیکیشن مدیریت مخاطبین</span>
        </div>
        <div className="search">
          {location.pathname === "/contacts" && <SearchContact />}
        </div>
      </div>
      <Separator />
    </div>
  );
}
