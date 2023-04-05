import { useEffect, useState, useContext, Fragment } from "react";
import AppContext from "../../context/appContext.jsx";
import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import ComplaintList from "./complaintList.js";

const style = {
  position: "relative",
  display: "flex",
  padding: "70px",
  marginLeft: "120px",
  width: "170px",
  top: "220px",
 left:"70px",
  transform: "translate(-50%, -50%)",
  color: "black",
  bgcolor: "transparent",

  boxShadow: 24,
  p: 6,
};

const complaintButton =  {
position:"relative",
top:"5px",
marginLeft:"50px"

}

const button = {
  backgroundColor: "transparent",
  height: "30",
  width: "60",
  color: "black",
  fontWeight: "40",
  marginRight: "0",
  borderColor: "gray",
};

export default function ComplaintModal({Close}) {
  const { user, complaint, setComplaints } = useContext(AppContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  function createComplaint(event) {
    const userId = user.id;
    const target = event.target;
    const title = target.title.value;
    const severity = target.severity.value;
    const zipCode = target.zipCode.value;
    const description = target.description.value;
   
    setComplaints({
      userId,
      title,
      description,
      zipCode,
      severity
    });
    console.log(complaint);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4005/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(complaint),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
    
      
      })
      .catch((error) => {
        console.error(`Error submitting complaint: ${error}`);
      });
  }

  function handleNavigate() {
    navigate('/main');
  }

  return (
    <>
      <Box sx={style}>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button
            type="button"
            style={complaintButton}
            className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleOpen}
          >
            Create Complaint   
          </Menu.Button>
          <Close/>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items>
              

              <div className="bg-white p-6">
                <form onSubmit={handleSubmit}>
                  {/* <label htmlFor="title">Title:</label> */}
                 <input

                    type="text"
                    name="title"
                    id="title"
                    value={complaint.title}
                    onChange={(event) =>
                      setComplaints({ ...complaint, title: event.target.value })
                    }
                    className="form-control"
                  />
{/* 
                  <label htmlFor="description">Description:</label> */}
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={complaint.description}
                    onChange={(event) =>
                      setComplaints({
                        ...complaint,
                        description: event.target.value,
                      })
                    }
                    className="form-control"
                  />
{/* 
                  <label htmlFor="zipCode">Zip code:</label> */}
                 <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={complaint.zipCode}
                    onChange={(event) =>
                      setComplaints({
                        ...complaint,
                        zipCode: event.target.value,
                      })
                    }
                    className="form-control"
                  />
                  <label htmlFor="severity">Severity:</label>
                  <select
                    name="severity"
                    id="severity"
                    value={complaint.severity}
                    onChange={(event) =>
                      setComplaints({
                        ...complaint,
                        severity: event.target.value,
                      })
                    }
                    className="form-control"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button style={button}>
                        View Latest Complaints ∨
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring">
                        <Menu.Item>
                          {({ active }) => (
                            <div className={`${active && "bg-gray-100"}`}>
                              <ComplaintList />
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onSubmit={(e) => {
                      e.preventDefault();
                    
                      handleNavigate();
                    }}
                  >
                    View Map
                  </button>

                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleClose();
                        handleSubmit();
                        createComplaint(e);
                      }}
                    >
                      Submit Complaint
                    </button>
                  </div>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </Box>
    </>
  );
}
