
document.addEventListener('DOMContentLoaded', function() {
    var iframe = document.getElementById('site-frame');
    if (iframe) {
        iframe.onload = function() {

            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.addEventListener('click', function(event) {
                var element = event.target;
                var attributes = element.attributes;
                var attrs = {};
                for (var i = 0; i < attributes.length; i++) {
                    attrs[attributes[i].name] = attributes[i].value;
                }

                console.log(attrs);
            }, false);
        };
    }
});
