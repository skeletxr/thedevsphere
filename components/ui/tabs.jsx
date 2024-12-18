import React, { useState } from "react";
import "./tabs.css";

const Tabs = () => {
  const [mode, setMode] = useState(false);

  const handleModeToggle = () => {
    setMode(!mode);
  };

  return (
   
<div className="tab-container">
  <input type="radio" name="tab" id="tab1" className="tab tab--1" />
  <label className="tab_label" htmlFor="tab1">Profile</label>

  <input type="radio" name="tab" id="tab2" className="tab tab--2" />
  <label className="tab_label" htmlFor="tab2">Settings</label>

  <input type="radio" name="tab" id="tab3" className="tab tab--3" />
  <label className="tab_label" htmlFor="tab3">Notifications</label>

  <div className="indicator"></div>
</div>

  );
};

export default Tabs;
