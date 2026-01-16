import { useEffect, useRef, useState } from "react";
import "../sidebar/sidebar.css";
export default function SidebarExam() {
  const menu1_ref = useRef<HTMLDivElement>(null);
  const menu2_ref = useRef<HTMLDivElement>(null);
  const menu3_ref = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState<number>(0);

  function handleScroll() {
    const p1 = menu1_ref.current?.getBoundingClientRect().top;
    const p2 = menu2_ref.current?.getBoundingClientRect().top;
    const p3 = menu3_ref.current?.getBoundingClientRect().top;

    if (p1 === 0) setActiveMenu(1);
    if (p2 === 0) setActiveMenu(2);
    if (p3 === 0) setActiveMenu(3);

    console.log("position", p1, ",", p2, ",", p3);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div dir="ltr">
      <div>
        {Array.from({ length: 30 }, () => (
          <p>test</p>
        ))}
      </div>
      <div className="main-section">
        <div className="fixed-menu">
          <p>
            <a href="#menu1" style={{ color: activeMenu === 1 ? "red" : "" }}>
              menu1
            </a>
          </p>
          <p>
            <a href="#menu2" style={{ color: activeMenu === 2 ? "red" : "" }}>
              menu2
            </a>
          </p>
          <p>
            <a href="#menu3" style={{ color: activeMenu === 3 ? "red" : "" }}>
              menu3
            </a>
          </p>
        </div>
        <div>
          <div id="menu1"></div>
          <p className="title" ref={menu1_ref}>
            menu1
          </p>
          {Array.from({ length: 20 }, () => (
            <p>test1</p>
          ))}
          <div id="menu2"></div>
          <p className="title" ref={menu2_ref}>
            menu2
          </p>
          {Array.from({ length: 20 }, () => (
            <p>test2</p>
          ))}
          <div id="menu3"></div>
          <p className="title" ref={menu3_ref}>
            menu3
          </p>
          {Array.from({ length: 20 }, () => (
            <p>test3</p>
          ))}
        </div>
      </div>

      {Array.from({ length: 30 }, () => (
        <p>ttttttttt</p>
      ))}
    </div>
  );
}
