import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editContact } from "../store/contactSlice";

// Define the Props interface that the component accepts
interface Props {
  id: number;
  first: string;
  last: string;
  status: string;
  onToggleEdit: () => void;
}

// Define the component
const EditContact = ({ id, first, last, status, onToggleEdit }: Props) => {
  // Declare state variables using the useState hook
  const [firstName, setFirstName] = useState(first);
  const [lastName, setLastName] = useState(last);
  const [contactStatus, setContactStatus] = useState(status);

  // Use the useDispatch hook to get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Define event handlers
  const handleSaveClick = () => {
    // Dispatch the editContact action with the updated contact information
    dispatch(editContact({ id, firstName, lastName, status: contactStatus }));
    // Call the onToggleEdit function to exit edit mode
    onToggleEdit();
  };

  const handleCancelClick = () => {
    // Call the onToggleEdit function to exit edit mode
    onToggleEdit();
  };

  // Render the component
  return (
    <div className="w-auto flex flex-col p-4">
      <h3 className="font-bold text-3xl">Edit Contact Screen</h3>
      <div className="my-4 mx-auto">
        <form className="flex flex-col items-center justify-center">
          <div className="border-2 border-black p-4">
            {/* Render input fields for first name and last name */}
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              className="p-2 border-2 border-black m-2"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              className="p-2 border-2 border-black m-2"
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            {/* Render radio buttons for contact status */}
            <div className="flex items-center">
              <label>Status:</label>
              <div className="flex flex-col mx-10">
                <div>
                  <input
                    type="radio"
                    name="status"
                    id="active"
                    value='active'
                    checked={contactStatus === "active"}
                    onChange={(e) => setContactStatus(e.target.value)}
                  /> Active
                </div>
                <div>
                  <input
                    type="radio"
                    name="status"
                    id="inactive"
                    value='inactive'
                    checked={contactStatus === "inactive"}
                    onChange={(e) => setContactStatus(e.target.value)}
                  /> Inactive
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="w-full flex justify-evenly items-center">
          {/* Render Save and Cancel buttons */}
          <button
            className="bg-emerald-500 px-4 py-2 text-white m-4"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-red-600 m-2 border-0 text-white"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContact;
