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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function Close(){

    return(
      <div className="flex justify-end" >
                <button
                id="handleCloseModal"
                  className="text-red-600 hover:text-red-800"
                  onClick={()=>{handleCloseModal()}}
                >
                  X
                </button>
              </div> 
    )
  }

  const [showButton, setShowButton] = useState(false);

  function handleShow() {
    setShowButton(!showButton);
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="user-profile">
          <div className="welcome-message">Welcome, {user.username}</div>
          <img  id ="profileImg" src={logo}  />
        </div>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Menu as="div" className="relative inline-block text-left">
              <br></br>
              <br></br>
              <div>
                <Menu.Button id="button"show={showButton} onClick={()=>{handleOpenModal();handleShow()}}>
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
                   <ComplaintModal  Close={Close} />
              </Transition>
            </Menu> 
          </li>
        </ul>
      </div>
    </div>
  );
}
