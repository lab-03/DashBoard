import React from "react";
import "./QrCodeImage.css";

const QrCodeImage = imageUrl => {
  console.log({ imageUrl });
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          alt=""
          src={imageUrl.imageUrl}
          width="500px"
          height="auto"
        />
      </div>
    </div>
  );
};

export default QrCodeImage;
