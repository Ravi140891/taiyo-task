import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import CreateContact from "../component/CreateContact";
import ContactCard from "../component/ContactCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

const Contacts: React.FC = () => {
  const [showCreateContact, setShowCreateContact] = useState<boolean>(false);

  const cards: Contact[] = useSelector(
    (state: RootState) => state.contact.contacts
  );

  const handleCreateContactClick = () => {
    setShowCreateContact(true);
  };

  return (
    <div className="container w-full flex flex-col justify-center items-center mx-auto max-w-none">
      <h1 className="text-3xl font-bold text-emerald-600 bg-lime-500 w-full p-4 text-center">
        Contact Page
      </h1>
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="w-full h-full flex flex-col justify-between items-center">
          {!showCreateContact && (
            <button
              className="bg-lime-500 py-2 px-4 text-xl rounded-md m-4 text-white"
              onClick={handleCreateContactClick}
            >
              Create Contact
            </button>
          )}
          {showCreateContact && (
            <CreateContact
              show={showCreateContact}
              setShow={setShowCreateContact}
            />
          )}
          <div className="w-full h-auto flex justify-evenly items-center flex-wrap">
            {cards.map((item) => (
              <ContactCard
                key={item.id}
                id={item.id}
                first={item.firstName}
                last={item.lastName}
                status={item.status}
              />
            ))}
          </div>
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
