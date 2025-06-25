import { useState } from "react";

import { ClosedSideBar, OpenSideBar } from "./styles/SideBarStyles";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

export function SideBar() {
  const [sideBar, setSideBar] = useState(false);

  function handleChangeSideBar() {
    setSideBar((prevState) => !prevState);
  }
  return (
    <>
        {!sideBar ? (
          <ClosedSideBar>
            <nav>
              <button color="black" onClick={handleChangeSideBar}>
                <BsArrowRight />
              </button>
              <ul>
                <a href="/flights" title="Vôos">
                  <MdOutlineFlightTakeoff />
                </a>
                <a href="/" title="Alguma coisa">
                  <FaStar />
                </a>
              </ul>
            </nav>
          </ClosedSideBar>
        ) : (
          <OpenSideBar>
            <section>
              <nav>
                <span>
                  <button color="black" onClick={handleChangeSideBar}>
                    <BsArrowLeft />
                  </button>
                </span>

                {/* Icones principais do app */}
                <ul>
                  <a href="/flights" title="Vôos">
                    <MdOutlineFlightTakeoff />
                    <p>Vôos</p>
                  </a>
                  <a href="/bookmarks" title="Favoritos">
                    <FaStar />
                    <p>Favoritos</p>
                  </a>
                </ul>
              </nav>
            </section>
            <aside onClick={handleChangeSideBar} />
          </OpenSideBar>
        )}
    </>
  );
}
