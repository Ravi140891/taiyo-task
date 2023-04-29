// Import required dependencies
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../store/contactSlice";

// Define the props of the CreateContact component
interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

// Define the shape of the contact data
interface ContactData {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

// Define the CreateContact component
const CreateContact: React.FC<Props> = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Set up state to hold contact data
  const [contactData, setContactData] = useState<ContactData>({
    id: "",
    firstName: "",
    lastName: "",
    status: "",
  });

  // Handle changes to form inputs
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Generate an ID for the new contact
    const id = parseInt(new Date().getTime().toString());
    // Dispatch the addContact action with the new contact data
    dispatch(addContact({ ...contactData, id }));
    // Clear the form input fields
    setContactData({ id: "", firstName: "", lastName: "", status: "" });
    // Close the create contact screen
    setShow(false);
  };

  // Handle clicks outside of the create contact screen
  const handleClickOutside = (event: MouseEvent): void => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  // Add event listeners for clicks outside of the create contact screen
  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  // Render the create contact form
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
