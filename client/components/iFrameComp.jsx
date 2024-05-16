import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DOMPath from 'chrome-dompath';

import { fetchElementRules } from '../slices/targetSlice.js';

/**
 * Renders an iframe component that loads a target URL and handles click events within the iframe.
 *
 * @param {number} props.targetPort - The target port for the URL.
 * @returns {JSX.Element} The rendered iframe component.
 */

const IframeComp = () => {
  const dispatch = useDispatch();

  const { targetPort } = useSelector(state => state.target)

  // const [iframe, setIframe] = useState(null);
  // setting iframe as a useRef so that it can be accessed throughout the component & so that it does not cause rerenders
  const iframe = useRef(null);
  const [lastClickedElement, setLastClickedElement] = useState(null);
  // const [element, setElement] = useState(null);

  // console.log('IframeComp: targetPort', targetPort, 'called at', new Date());

  const className = "site-frame"

  const targetUrl = `http://localhost:${targetPort}`

  // waiting for the iframe DOM to load before we add event listeners

  const handleClick = (element) => {
    // console.warn('iframeComp: handleClick');
    // console.log('\n\n');
    // console.log('iframeComp: element', element);

    setLastClickedElement(element);

    // getting the 'selector' of the element, i.e. the same thing that one would get by inspecting the element with dev tools, then right clicking in the dom tree and selecting copy selector.
    // we get this using the DOMPath library, which is a port of the relevant piece of Chromium's Chrome Dev Tools front-end code that does the same thing. This should get us a unique, specific selector for the clicked element every time. In testing so far it has always worked. 2024-04-01_08-14-PM.
    // with true, we get an 'optimized' selector. doesn’t seem to matter which we choose so far. they both have worked. I'm including true now so we recall its an option. if for some reason it doesn’t work, we can switch to false (i.e. only pass one param, the selector)
    // true: #landingAndSticky > div > h1
    // false: div#landingAndSticky > div > h1
    // https://github.com/testimio/DOMPath

    const selector = DOMPath.fullQualifiedSelector(element, true);
    // console.log('iframeComp: selector', selector);

    // getting the 'selectorAlt' of the element, i.e. the same thing that one would get by inspecting the element with dev tools, then right clicking in the dom tree and selecting copy selector.
    const selectorAltObj = iframe.current.contentDocument.documentElement.querySelectorAll(DOMPath.fullQualifiedSelector(element))[0];

    const selectorAlt = `${selectorAltObj.nodeName.toLowerCase()}${selectorAltObj.id ? '#' + selectorAltObj.id : ''}${selectorAltObj.className ? '.' + selectorAltObj.className.split(' ').join('.') : ''}`;

    // console.log('iframeComp: selectorAlt', selectorAlt);

    const data = {
       // id is used by findSourceInline to string match
      id: element.id,
      innerHTML: element.innerHTML,
      nodeName: element.nodeName,
             // className is used by findSourceInline to string match

      className: element.className,
      nodeType: element.nodeType,
      textContent: element.textContent,
      // attributes: element.attributes,
      selector,
      selectorAlt
    };

    try {
      console.log('iframeComp: handleClick: data', data);
      dispatch(fetchElementRules({ data }));
    }
    catch (error) {
      console.log('iframeComp: error', error);
    }

  };

  const handleLoad = () => {
    // console.log('iframeComp: handleLoad');
    // console.warn('iframeComp: handleLoad: iframe', iframe);

    const iframeDoc = iframe.current.contentDocument || iframe.current.contentWindow.document;

    // console.warn('iframeComp: iframeDoc', iframeDoc);

    // This event listener needs to be added to the iframe's contentDocument because
    // we're listening for clicks inside the iframe, and those clicks won't be
    // handled by React's event delegation system. By adding this event listener,
    // we're essentially making the iframe's contentDocument a "portal" for
    // clicks to be handled by React.

    iframeDoc.addEventListener('click', (event) => {
      const element = event.target;
      const localName = element.localName;
      // console.log('iframeComp: element', element);

      // Calling the handleClick function
      handleClick(element);

      // switch the focus to cssexy when the user clicks on something that isnt an input, textarea, or dropdown (select) field.
      // without this their interaction with those elements is broken/interrupted, e.g. clicking in a text field in bookswap.
      if (localName !== 'input' && localName !== 'textarea' && localName !== 'select') {

        // Set focus back to the parent document
        // This allows cssexy to receive keyboard events again after a click has taken place inside the iframe.
        // before doing this, cssexy would not receive keyboard events again until we clicked inside of the sidebar
        window.parent.focus();
      }

    });

    return () => {
      // Cleanup function to remove event listener
      // Prevents memory leaks
      iframeDoc.removeEventListener('click', handleClick);
    };
  };

  useEffect(() => {
    // console.log('IframeComp: useEffect triggered at', new Date());
    // triggerEffect();
    // getting our iframe and saving it to state
    // setIframe(document.querySelector(`.${className}`));
    iframe.current = document.querySelector(`.${className}`);
    // console.log('iframeComp: useEffect: target after setIframe at', iframe, new Date());

    // without this, the event listeners would try to be added to an unexisting iframe
    if (iframe.current) {
      // console.log('IframeComp: iframe at', new Date());
      iframe.current.addEventListener('load', handleLoad);
      // Cleanup function to remove event listener
      return () => {
        iframe.current.removeEventListener('load', handleLoad);
      };
    }
  }, [iframe]);

  return (
    <iframe
      src={targetUrl}
      width="100%"
      height="100%"
      title="User Site"
      className={className}
    />
  );
};

export default IframeComp;
