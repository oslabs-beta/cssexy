import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DOMPath from 'chrome-dompath';

import { fetchElementRules } from '../features/fetchElementRules.js';


/**
 * Renders an iframe component that loads a target URL and handles click events within the iframe.
 *
 * @param {number} props.targetPort - The target port for the URL.
 * @returns {JSX.Element} The rendered iframe component.
 */

const IframeComp = () => {
  const dispatch = useDispatch();
  const rules = useSelector(state => state.rules)
  const target = useSelector(state => state.target)
  const storeVar = {rules, target}


  const targetPort = target.targetPort;

  const className = "site-frame"

  const targetUrl = `http://localhost:${targetPort}`

  // waiting for the iframe DOM to load before we add event listeners
  // without this, the event listeners would try to be added to an unexisting iframe
  useEffect(() => {
    // getting our iframe
    const iframe = document.querySelector(`.${className}`);
    // console.log('iframeComp: iframe', iframe);

    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        // console.log('iframeComp: iframeDoc', iframeDoc);

        const handleClick = async (element) => {
          // console.log('iframeComp: element', element);

          // getting the 'selector' of the element, i.e. the same thing that one would get by inspecting the element with dev tools, then right clicking in the dom tree and selecting copy selector.
          // we get this using the DOMPath library, which is a port of the relevant piece of Chromium's Chrome Dev Tools front-end code that does the same thing. This should get us a unique, specific selector for the clicked element every time. In testing so far it has always worked. 2024-04-01_08-14-PM.
          // https://github.com/testimio/DOMPath

          const selector = DOMPath.fullQualifiedSelector(element, true);
          // with true, we get an 'optimized' selector. doesn’t seem to matter which we choose so far. they both have worked. I'm including true now so we recall its an option. if for some reason it doesn’t work, we can switch to false (i.e. only pass one param, the selector)
          // true: #landingAndSticky > div > h1
          // false: div#landingAndSticky > div > h1

          const data = {
            id: element.id,
            // innerHTML: element.innerHTML,
            nodeName: element.nodeName,
            className: element.className,
            nodeType: element.nodeType,
            textContent: element.textContent,
            // attributes: element.attributes,
            selector
          };

          try {
            fetchElementRules(data, dispatch, storeVar);

          }
          catch (error) {
            console.log('iframeComp: error', error);
          }

        };

        // This event listener needs to be added to the iframe's contentDocument because
        // we're listening for clicks inside the iframe, and those clicks won't be
        // handled by React's event delegation system. By adding this event listener,
        // we're essentially making the iframe's contentDocument a "portal" for
        // clicks to be handled by React.
        iframeDoc.addEventListener('click', (event) => {
          const element = event.target;
          const localName = element.localName;

          // Calling the handleClick function
          handleClick(element);


          // switch the focus to cssxe when the user clicks on something that isnt an input, textarea, or dropdown (select) field.
          // without this their interaction with those elements is broken/interrupted, e.g. clicking in a text field in bookswap.
          if (localName !== 'input' && localName !== 'textarea' && localName !== 'select') {

            // Set focus back to the parent document
            // This allows CSSxe to receive keyboard events again after a click has taken place inside the iframe.
            // before doing this, CSSxe would not receive keyboard events again until we clicked inside of the sidebar
            window.parent.focus();
          }

        }, false);

        return () => {
          // Cleanup function to remove event listener
          // Prevents memory leaks
          iframeDoc.removeEventListener('click', handleClick, false);
        };
      } catch (error) {
        console.error("Can't access iframe content:", error);
      }
    };

    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      // Cleanup function to remove event listener
      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, []);

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
