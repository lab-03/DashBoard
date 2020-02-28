import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onButtonSubmit }) => {
  return (
    <div>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <button
            className="w-30 grow link f4 ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Generate Qr Code
          </button>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default ImageLinkForm;
