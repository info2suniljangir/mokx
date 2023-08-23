

import React from "react"

const Statusbar = () => {
  return (
    <div className="d-flex justify-content-between px-3">
            <div>9:45</div>
            <div className="">
                <img className="me-1 ms-1" src="../network.png" alt="network"/>
                <img className="me-1 ms-1" src="../wifi.png" alt="wifi"/>
                <img className="me-1 ms-1" src="../battery.png" alt="battery"/>
            </div>
        </div>
  )
};

export default Statusbar;
