import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../store/contactSlice";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

interface ContactData {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

const CreateContact: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [contactData, setContactData] = useState<ContactData>({
    id: "",
    firstName: "",
    lastName: "",
    status: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const id = parseInt(new Date().getTime().toString()); // generate unique id as a number
    dispatch(addContact({ ...contactData, id }));
    setContactData({ id: "", firstName: "", lastName: "", status: "" });
    setShow(false);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },);
  return (
    <div className="w-auto flex flex-col p-4" ref={wrapperRef}>
      <h3 className="font-bold text-3xl">Create Contact Screen</h3>
      <div className="my-4 mx-auto">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="border-2 border-black p-4">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="p-2 border-2 border-black m-2"
              value={contactData.firstName}
              onChange={handleInputChange}
            />
            <br />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="p-2 border-2 border-black m-2"
              value={contactData.lastName}
              onChange={handleInputChange}
            />
            <br />
            <div className="flex items-center">
              <label htmlFor="status">Status</label>
              <div className="flex flex-col mx-10">
                <div>
                  <input
                    type="radio"
                    name="status"
                    id="active"
                    value="active"
                    checked={contactData.status === "active"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="active">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="status"
                    id="inactive"
                    value="inactive"
                    checked={contactData.status === "inactive"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="inactive">Inactive</label>
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Save Contact"
            className="bg-lime-500 py-2 px-4 text-xl my-4 cursor-pointer rounded-md text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
