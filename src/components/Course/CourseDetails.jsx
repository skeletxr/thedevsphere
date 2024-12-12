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
    ],
    FRONTEND: [
      "Frontend frameworks",
      "React beginner to advance",
      "External libraries",
      "CSS you need to know of, Flexbox, basic styling",
      "Frontend UI frameworks",
      "TailwindCSS",
    ],
    BACKEND: [
      "Backend communication",
      "Message queues",
      "Design Patterns in JS",
      "DB concepts",
      "Node.js Apps",
      "Real time communication, basics of WebRTC",
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
        <h1 className="text-3xl font-bold text-center text-gray-800">Web Development Course Syllabus</h1>
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