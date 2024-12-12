import React from "react";

const CourseDetails = () => {
  const syllabus = {
    FOUNDATION: [
      "Hyper Text Markup Language",
      "Cascading Styles Sheets",
      "Foundation Javascript, async nature of JS",
      "Node.js and its runtime",
      "MongoDB",
      "Databases (NoSQL/SQL)",
      "Backend",
      "Backend communication protocols",
      "Express js basic to advance",
      "Middlewares, routes",
      "Serverless Backends",
      "Authentication using external libraries",
      "Scaling Node.js",
      "npm packages",
      "HTML5 new features",
      "CSS Grid and advanced styling techniques",
      "Advanced Javascript concepts (Closures, Promises, etc.)",
      "REST API Design and Best Practices",
      "Microservices Architecture",
      "WebSockets",
      "Data normalization and denormalization",
      "CI/CD pipelines in Node.js projects",
      "Environment Variables and Configuration",
    ],
    FRONTEND: [
      "Frontend frameworks",
      "React beginner to advance",
      "External libraries",
      "CSS you need to know of, Flexbox, basic styling",
      "Frontend UI frameworks",
      "TailwindCSS",
      "Vanilla Javascript advanced techniques",
      "State management with Redux",
      "Single Page Applications (SPA)",
      "Component-based development",
      "JSX syntax and its best practices",
      "Responsive design techniques",
      "Advanced CSS techniques (CSS Variables, Animations)",
      "Server-Side Rendering (SSR)",
      "Component libraries (Material-UI, Daisy-UI)",
      "Handling asynchronous requests (Async/Await)",
      "Form validation techniques",
      "CSS-in-JS (styled-components)", 
      "Client-Side Routing (React Router)",
      "hooks in React",
      "Server-side data fetching with React"
    ],
    BACKEND: [
      "Backend communication",
      "Message queues",
      "Design Patterns in JS",
      "DB concepts",
      "Node.js Apps",
      "Real time communication, basics of WebRTC",
      "Microservices architecture in Node.js",
      "WebSocket implementation in Node.js",
      "Asynchronous task handling",
      "File uploads and management in Node.js",
      "Error handling",
      "Server monitoring",
      "Data replication and sharding in MongoDB"
    ],
    "MERN Stack Specific": [
      "MERN Stack overview",
      "Setting up a MERN Stack project from scratch",
      "Connecting React with Node.js (RESTful APIs)",
      "Integrating MongoDB with Node.js using Mongoose",
      "Building a full-stack CRUD application in MERN",
      "State management ",
      "Server-Side Rendering (SSR) with React in MERN",
      "Optimizing MongoDB queries for performance",
      "Implementing file uploads and media storage in MERN"
      
    ]
  };

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="https://d502jbuhuh9wk.cloudfront.net/courses/64eebdb8e4b0a14befedc15d/64eebdb8e4b0a14befedc15d_scaled_cover.jpg?v=6"
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Full Stack Web Development</h2>
          <p>Learn the full MERN stack and get daily live classes plus internship assistance.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="p-8 font-sans">
        <h1 className="text-3xl font-bold text-purple-300">Course Overview</h1>
        {Object.entries(syllabus).map(([section, topics]) => (
          <div key={section} className="mt-8">
            <h2 className="text-2xl font-semibold text-blue-600">{section}</h2>
            <ul className="list-disc list-inside mt-4">
              {topics.map((topic, index) => (
                <li key={index} className="text-gray-700 text-lg mt-2">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseDetails;