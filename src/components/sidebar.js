import React, { useState } from "react";
import { Close } from "./icons";
import "./memes.css";

const Sidebar = ({ showSidebar, sideData, closeSidebar }) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [popup, setPopup] = useState(false);
  const [fontSize, setFontSize] = useState(12);
  const [titleStyle, setTitleStyle] = useState({
    color: "#ffffff",
  });

  React.useEffect(() => {
    setData(sideData);
  }, [sideData]);
  const handleColor = (e, idx) => {
    setTitleStyle({
      ...titleStyle,
      color: e.target.value,
    });
  };
  const handleFontSize = (e, idx) => {
    setFontSize({
      ...fontSize,
      size: e.target.value,
    });
  };

  //   input
  const handleTitleChange = (e, title) => {
    title = e.target.value;
  };

  const editTitle = (idx) => {
    return setIndex(idx), setPopup(!popup);
  };
  return (
    <div className={`sidebar ${showSidebar ? "showSidebar" : ""}`}>
      <div className="sidebar-header">
        <div className="d-flex align-items-center">
          <span onClick={closeSidebar} title="Close">
            <Close />
          </span>
        </div>
      </div>
      <div className="p-2 sidebar-body h-100">
        {data?.map((item, idx) => (
          <div
            key={idx}
            className="d-flex align-items-center justify-content-around"
          >
            <h2
              style={{
                fontSize: `${idx === index && fontSize.size}px`,
                flex: 1,
                color: `${idx === index && titleStyle.color}`,
              }}
            >
              {item?.title}
            </h2>
            <div className="position-relative">
              <button
                onClick={() => editTitle(idx)}
                className="d-block btn myBtn text-white"
              >
                {popup && idx === index ? <Close /> : "Edit"}
              </button>
              {popup && idx === index && (
                <div className="position-absolute edit-popup">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-evenly">
                      <input
                        id="colorPicker"
                        value={idx === index ? titleStyle.color : null}
                        onChange={(e) => handleColor(e, idx)}
                        type="color"
                      />
                      <span>Color</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-evenly">
                      <input
                        id="range"
                        value={idx === index ? fontSize.size : null}
                        onChange={(e) => handleFontSize(e, idx)}
                        type="range"
                        min={13}
                        max={40}
                      />
                      <span>Font Size</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-evenly">
                      <input
                        value={item?.title ?? ""}
                        className="meme-input w-100"
                        onChange={(e) => handleTitleChange(e, item?.title)}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
