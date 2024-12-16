import React from "react";


const AcceptApplication = ({ name, email, refercode, onAccept, onReject }) => {

 

  return (
    <div className="flex items-center justify-center " >
    <div className="mt-10 border rounded-lg shadow-md p-4 bg-white w-[75vw] h-auto mb-4">
    <p className="text-sm text-gray-600">Name: {email}</p>
      <p className="text-sm text-gray-600">Email: {email}</p>
      <p className="text-sm text-gray-600">Refer Code: {refercode}</p>
      <div className="flex mt-4 space-x-2">
        <button
          onClick={onAccept}
          className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
        >
          Accept
        </button>
        <button
          onClick={onReject}
          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
    </div>
  );
};

// Main component to render multiple entries
const EntriesList = ({ entries, handleAccept, handleReject }) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      {entries.map((entry, index) => (
        <EntryCard
          key={index}
          name={entry.name}
          email={entry.email}
          refercode={entry.refercode}
          onAccept={() => handleAccept(entry)}
          onReject={() => handleReject(entry)}
        />
      ))}
    </div>
  );
};

export default AcceptApplication;

// Example usage of EntriesList component
// You can fetch `entries` data from your backend and pass it to this component
// import EntriesList from './EntriesList';

/* Example data to use in the component:
const exampleEntries = [
  { name: "John Doe", email: "john@example.com", refercode: "12345" },
  { name: "Jane Smith", email: "jane@example.com", refercode: "67890" },
];

const handleAccept = (entry) => {
  console.log("Accepted", entry);
};

const handleReject = (entry) => {
  console.log("Rejected", entry);
};

<EntriesList
  entries={exampleEntries}
  handleAccept={handleAccept}
  handleReject={handleReject}
/>;
*/
