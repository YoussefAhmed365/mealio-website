import * as React from "react";
function SparkleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /*#__PURE__*/React.createElement("title", {
    id: titleId
  }, title) : null, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    d: "M27.3716 39.6717C28.7768 33.5557 33.5524 28.7768 39.6685 27.3749L50 25.0049L39.6685 22.6349C33.5492 21.2297 28.7736 16.4541 27.3716 10.338L24.9984 0L22.6284 10.3315C21.2232 16.4476 16.4476 21.2264 10.3315 22.6284L0 25.0016L10.3315 27.3716C16.4476 28.7768 21.2232 33.5524 22.6284 39.6685L24.9984 50L27.3684 39.6685L27.3716 39.6717Z",
    clipRule: "evenodd"
  }));
}
const ForwardRef = /*#__PURE__*/ React.forwardRef(SparkleIcon);
export default ForwardRef;