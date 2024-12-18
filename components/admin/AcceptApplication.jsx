import React from "react";


const AcceptApplication = ({data,handleAccept}) => {

 console.log(data)

  return (
    <div className="flex flex-col items-center justify-center " >
      {data && Object.entries(data).map(( [id, entry], index) => (
        
        <div className="mt-10 border rounded-lg shadow-md p-4 bg-white w-[75vw] h-auto mb-4" key={index}>
        <p className="text-sm text-gray-600">ID: {id}</p>
        
        <p className="text-sm text-gray-600">Name: {entry.name}</p>
          <p className="text-sm text-gray-600">Email: {entry.email}</p>
          <p className="text-sm text-gray-600">Refer Code: {entry.referCode ? entry.referCode : null}</p>
          <p className="text-sm text-gray-600">User uid: {entry.userId ? entry.userId : null}</p>

          <div className="flex mt-4 space-x-2">
            <button
              onClick={() => handleAccept(entry, id)}
              className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
            >
              Accept
            </button>
            <button
              // onClick={onReject}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        </div>
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
