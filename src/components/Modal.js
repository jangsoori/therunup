import React from "react";
import ReactDOM from "react-dom";

function Modal(props) {
  return ReactDOM.createPortal(
    <div
      //On click close modal
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
    >
      {/* e.stopPropagation makes modal close ONLY when click on bg (stops events) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active massive"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.contentText}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}

export default Modal;
