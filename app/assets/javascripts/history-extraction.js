if (navigator.userAgent.indexOf('Chrome/') == -1 && navigator.userAgent.indexOf('Opera/') == -1) {
  alert('This application is specific to Chrome and Opera, and probably won\'t work for you.\n\n' +
    'See the original project for versions for other browsers:\n' + 'http://lcamtuf.coredump.cx/cachetime/');
}

visitedApps = [];
var finished = 0;
var start = new Date().getTime();

var endCB = function () {
  console.log('tested' + apps.length + 'urls in ' + (new Date().getTime() - start) + ' milliseconds');
  $.ajax({
    type: 'post',
    url: '/user-apps-callback',
    data: { apps: JSON.stringify(visitedApps) },
    success: function() { location.reload(); }
  });
};

function testApplicationUrls(apps) {
  for (i = 0; i < apps.length; i++) {
    test_app_url(apps[i], function(app) {
      addTestResult(app);
    });
  }
}

function addTestResult(application) {
  visitedApps.push(application);
}

function test_app_url(app, callbackAddApp) {
  var img = new Image();

  try { img.src = app[1]; } catch(e) { alert('caught an error'); console.log(e); }
  var checks = 0;

  var imageChecker = setInterval(function() {
    checkImage(img, app, function() {
      finished++;
      delete img;
      clearInterval(imageChecker);
    })
  }, 1);

  function checkImage(img, app, stopImageChecker) {
    if (img.complete) {
      stopImageChecker();
      callbackAddApp(app);
      if (finished == apps.length) {
        endCB();
      }
    } else if (checks > 10) {
      stopImageChecker();
      if (finished == apps.length) {
        endCB();
      }
    } else {
      checks ++;
    }
  }
}
