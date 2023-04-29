import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import CreateContact from '../component/CreateContact';
import ContactCard from '../component/ContactCard';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

const Contacts: React.FC = () => {
  // State to track if the create contact form should be shown
  const [showCreateContact, setShowCreateContact] = useState<boolean>(false);

  // Get the list of contacts from the Redux store
  const cards: Contact[] = useSelector(
    (state: RootState) => state.contact.contacts
  );

  // Show the create contact form when the create contact button is clicked
  const handleCreateContactClick = () => {
    setShowCreateContact(true);
  };

  return (
    <div className="container w-full flex flex-col justify-center items-center mx-auto max-w-none">
      <div className="flex w-full h-full">
        <div className="w-full h-full flex flex-col justify-between items-center">
          {/* Show the create contact button if the create contact form is not shown */}
          {!showCreateContact && (
            <button
              className="bg-lime-500 py-2 px-4 text-xl rounded-md m-4 text-white"
              onClick={handleCreateContactClick}
            >
              Create Contact
            </button>
          )}

          {/* Show the create contact form if the state is set to true */}
          {showCreateContact && (
            <CreateContact
              show={showCreateContact}
              setShow={setShowCreateContact}
            />
          )}

          {/* Show the list of contact cards */}
          <div className="w-full h-auto flex justify-evenly items-center flex-wrap">
            {cards.map(item => (
              <ContactCard
                key={item.id}
                id={item.id}
                first={item.firstName}
                last={item.lastName}
                status={item.status}
              />
            ))}
          </div>

          {/* Show a message if there are no contacts and the create contact form is not shown */}
          {!cards.length && !showCreateContact && (
            <div className="h-auto w-auto p-4 flex justify-between items-center border-black border-2 my-10">
              <p className="rounded-full bg-red-400 px-4 py-2 text-2xl text-white">
                X
              </p>
              <p className="mx-2 font-bold">
                No contact found. <br />
                Please add contact from <br />
                Create Contact Button
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
