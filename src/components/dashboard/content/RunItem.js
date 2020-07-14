import React, { useState } from "react";

import "./RunItem.scss";

function RunItem(props) {
  const [itemMenuVis, setItemMenuVis] = useState(false);

  //Close menu on click outside of menu
  if (props.dbRef.current) {
    props.dbRef.current.onclick = (e) => {
      if (
        !e.target.classList.contains("run-item-menu-icon") &&
        !e.target.classList.contains("run-item-menu-content")
      )
        setItemMenuVis(false);
    };
  }

  const { avgPace, description, length, distance, name, date } = props.run;

  return (
    <div className="run-item-wrapper">
      <div className="run-item">
        <div className="run-item-header">
          <div className="run-item-header-left">
            <h3>{name}</h3>
            <p>{date}</p>
          </div>
          <div className="run-item-header-right">
            <div className={`run-item-menu`}>
              <i
                onClick={(e) => {
                  // e.stopPropagation();
                  setItemMenuVis(!itemMenuVis);
                }}
                class="fas fa-ellipsis-h run-item-menu-icon"
              ></i>
              <div
                className={`run-item-menu-content  ${
                  itemMenuVis ? "active" : ""
                }`}
              >
                <p>Edit run</p>
                <p>Delete run</p>
              </div>
            </div>
          </div>
        </div>
        <div className="run-item-img">
          <img src="https://via.placeholder.com/600x200" alt="" />
        </div>
        <div className="run-item-detail">
          <p>
            Distance: <span>{distance} km</span>
          </p>
          <p>
            Pace: <span>{avgPace} min/km</span>
          </p>
          <p>
            Time: <span>{length} min</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RunItem;
