import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeContact } from '../store/contactSlice';
import EditContact from './EditContact';

interface Props {
  id: number;
  first: string;
  last: string;
  status: string;
}

const ContactCard = ({ id, first, last, status }: Props) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    // Dispatch the removeContact action with the contact id
    dispatch(removeContact(id));
  };

  const handleToggleEdit = () => {
    setIsEditing(false);
  };

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

export default ContactCard;
