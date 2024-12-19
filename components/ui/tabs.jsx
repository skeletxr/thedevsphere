
import React from "react";
import "./tabs.css";

const Tabs = ({setTabSwitch}) => {

  return (
   
<div className="tab-container">
  <input type="radio" name="tab" id="tab1" className="tab tab--1"  onClick={() => setTabSwitch(1)} />
  <label className="tab_label" htmlFor="tab1">New Applications</label>

  <input type="radio" name="tab" id="tab2" className="tab tab--2"  onClick={() => setTabSwitch(2)}/>
  <label className="tab_label" htmlFor="tab2">Payment Pending Applications</label>

  <input type="radio" name="tab" id="tab3" className="tab tab--3"   onClick={() => setTabSwitch(3)} />
  <label className="tab_label" htmlFor="tab3">Add Video </label>

  <div className="indicator"></div>
</div>

  );
};

export default Tabs;
