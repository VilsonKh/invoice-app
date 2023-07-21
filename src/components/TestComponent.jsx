import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import './TestComponent.scss';

const TestComponent = ({ setAnimate, animate }) => {
  const nodeRef = useRef(null);

  // const animClasses = {
  //   appear: "slideInLeft",
  //   appearActive: "slideInLeft",
  //   enter: "slideInLeft",
  //   enterActive: "slideInLeft",
  //   enterDone: "slideInLeft",
  //   exit: "slideOutLeft",
  //   exitActive: "slideOutLeft",
  //   exitDone: "slideOutLeft"
  // };

	return (
		<CSSTransition 
      in={animate}
      timeout={2000}
      classNames='my-node'
      nodeRef={nodeRef}
      unmountOnExit
      >
			<div ref={nodeRef} key="animate" style={{width: 1000, height: 500, background: "red", marginLeft: 100 }} className="testComponent animated">
				<p>TEXT COMPONENT</p>
				<button onClick={() => setAnimate(false)}>CLOSE</button>
			</div>
		</CSSTransition>
	);
};

export default TestComponent;
