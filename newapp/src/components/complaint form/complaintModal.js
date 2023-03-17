import { useEffect, useState, useContext, Fragment } from "react";
import AppContext from "../../context/appContext.jsx";
import React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import ComplaintList from "./complaintList.js";

const style = {
  position: "absolute",
  display: "flex",
  padding: "20px",
  margin: "30px",
  width: "170px",
  top: "430px",
  borderColor: "black",
  transform: "translate(-50%, -50%)",
  color: "black",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 6,
};

const button = {
  backgroundColor: "black",
  height: "30",
  width: "60",
  color: "white",
  fontWeight: "40",
  marginRight: "0",
  borderColor: "gray",
};

export default function ComplaintModal() {
  const { user, complaint, setComplaints } = useContext(AppContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [setComplaintData, ComplaintData] = useState("");

  function createComplaint(event) {
    const userId = user.id;
    const target = event.target;
    const title = target.title.value;
    const severity = target.severity.value;
    const zipCode = target.zipCode.value;
    const description = target.description.value;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setComplaints({
      userId,
      title,
      description,
      zipCode,
      severity,
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
        setComplaints(data);
        setOpen(false);
      })
      .catch((error) => {
        console.error(`Error submitting complaint: ${error}`);
      });
  }

  function handleNavigate() {
    navigate(`/main`);
  }

  return (
    <>
      <Box sx={style}>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleOpen}
          >
            Create Complaint
          </Menu.Button>
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
              <div className="flex justify-end">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={handleClose}
                >
                  X
                </button>
              </div>

              <div className="bg-white p-4">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="title">Title:</label>
                 <div> <textarea
                    type="text"
                    name="title"
                    id="title"
                    value={complaint.title}
                    onChange={(event) =>
                      setComplaints({ ...complaint, title: event.target.value })
                    }
                    className="form-control"
                  /></div>

                  <label htmlFor="description">Description:</label>
                  <div><textarea
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
                  /></div>

                  <label htmlFor="zipCode">Zip code:</label>
                 <div> <textarea
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
                  /></div>
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
                      handleClose();
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
