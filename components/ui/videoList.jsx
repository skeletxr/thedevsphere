import React from 'react';
import styled from 'styled-components';
 

const VideoList = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <span>In this article</span>
        <div className="card__container">
          <p className="element">Try it</p> 
          <p className="element">Syntax</p> 
          <p className="element active">Formal definition</p> 
          <p className="element">Formal syntax</p> 
          <p className="element">Examples</p> 
          <p className="element">See also</p> 
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 250px;
    height: 290px;
    border-radius: 15px;
    background: rgb(27, 26, 26);
    color: white;
    font-weight: 600;
    font-size: 1.2em;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: -5px 5px 1px 0px #004d92;
  }

  .element {
    color: grey;
    font-size: .8em;
    padding: 6px 15px;
    border-left: 2px solid grey;
    cursor: pointer;
  }

  .active {
    background-color: #004d92;
    border-left: 2px solid #8cb4ff;
    color: azure;
  }

  .element:hover:not(.active) {
    color: #3775bb;
  }`;

export default VideoList;
