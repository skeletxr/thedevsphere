import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Refer from './components/Refer.jsx';
import { GlobalProvider } from './context/GlobalContext.jsx';
import Course from './components/Course/Course.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <GlobalProvider>

        <Router>
          <Routes>
          
              <Route path="*" element={<App />} />
              <Route path='/Refer' element={<Refer/>} />
              <Route path='/Courses' element={<Course/>} />
 
              {/* <Route path="/User/:id" element={<User />}>
                <Route path="FriendsLobby" element={<DirectConversation/>} />
                <Route path="Friend_List" element={<FindFriends />} />
                <Route path="Create Post" element={<CreatePost />} />
                <Route path="Notification" element={<NotificationTab />} />
              <Route path="Groups" element={<GroupChatMain />} /> */}

               
              {/* <Route path="/Profile/:id" element={<Profile />} />
              <Route path="*" element={<Home/>} />  */}
        </Routes>
       
    </Router>
    </GlobalProvider>

  </React.StrictMode>,
)
