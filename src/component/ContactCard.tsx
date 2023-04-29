// Import the necessary dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeContact } from '../store/contactSlice';
import EditContact from './EditContact';

// Define the expected props for the component using an interface
interface Props {
  id: number;
  first: string;
  last: string;
  status: string;
}

// Define the ContactCard component with the expected props
const ContactCard = ({ id, first, last, status }: Props) => {
  // Use the useDispatch hook from react-redux to dispatch actions
  const dispatch = useDispatch();
  // Use the useState hook to manage the editing state of the card
  const [isEditing, setIsEditing] = useState(false);

  // Define a function to set the isEditing state to true when the Edit button is clicked
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Define a function to dispatch an action to remove the contact from the Redux store when the Delete button is clicked
  const handleDeleteClick = () => {
    dispatch(removeContact(id));
  };

  // Define a function to set the isEditing state to false when the Edit form is closed
  const handleToggleEdit = () => {
    setIsEditing(false);
  };

  // If the isEditing state is true, return the EditContact component with the contact's details and a function to close the form
  if (isEditing) {
    return (
      <EditContact
        id={id}
        first={first}
        last={last}
        status={status}
        onToggleEdit={handleToggleEdit}
      />
    );
  }

  // If the isEditing state is false, return the contact card with the contact's details and Edit/Delete buttons
  return (
    <div className="flex flex-col justify-center items-center border-2 p-2 min-w-[300px] max-w-[300px] m-3 ">
      <h3 className="font-bold text-2xl ">{`${first} ${
        last.length > 5 ? `${last.slice(0, 5)}...` : last
      }`}</h3>
      <button
        className="bg-emerald-500 px-4 py-2 text-white m-4"
        onClick={handleEditClick}
      >
        Edit
      </button>
      <button
        className="px-4 py-2 bg-red-600 m-2 border-0 text-white"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
};

// Export the ContactCard component as the default export
export default ContactCard;
