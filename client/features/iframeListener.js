
window.addEventListener('load', function() {
  setTimeout(function() {
    const iframe = document.getElementById('site-frame');
    if (iframe) {
      console.log('iframe in iframe listener', iframe);
      iframe.addEventListener('load', function() {
        console.log('iframeListener: eventListener added');

        try {
          var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          console.log('iframeListener: iframeDoc', iframeDoc);

          // Attach the click event listener directly inside the iframe's document
          iframeDoc.addEventListener('click', function(event) {
            console.log('iframeListener: Click inside iframe');
            event.preventDefault(); // Prevent default action of the click event
            // Add your logic here to handle the click event
          }, false);
        } catch (error) {
          console.error("iframeListener:Can't access iframe content:", error);
        }
      });
    }
  }, 3000);
});
