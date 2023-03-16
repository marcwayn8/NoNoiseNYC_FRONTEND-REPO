import { HelpOutline } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import ComplaintModal from "../complaint form/complaintModal";
import logo from "./img.jpg";
import AppContext from "../../context/appContext";

import "./sidebar.css";

export default function Sidebar() {
  const { user } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const button = {
    backgroundColor: "transparent",
    height: "10",
    width: "10",
  };

  

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="user-profile">
          <div className="welcome-message">Welcome, {user.username}</div>
          <img  id ="profileImg" src={logo}  />
        </div>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">About Us</span>
            <Menu as="div" className="relative inline-block text-left">
              <br />
              <div>
                <Menu.Button style={button} onClick={handleOpenModal}>
                  Make a Complaint
                </Menu.Button>
              </div>
              <Transition
                show={showModal}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="flex justify-end">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={handleCloseModal}
                    >
                      X
                    </button>
                  </div>
                  <ComplaintModal />
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
        </ul>
      </div>
    </div>
  );
}
