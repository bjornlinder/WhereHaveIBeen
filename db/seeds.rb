# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#

apps = [
  { 'name': 'facebook', 'url': 'http://staticxx.facebook.com/connect/xd_arbiter.php?version=42' },
  { 'name': 'github', 'url': 'https://assets-cdn.github.com/assets/github-7d9c31645648105c3f4793ab36cfef6d84278587094bb6e332d81f3db8c52fa8.js' },
  { 'name': 'github2', 'url': 'https://assets-cdn.github.com/favicon.ico' },
  { 'name': 'twitter widgets', 'url': 'https://platform.twitter.com/widgets.js' },
  { 'name': 'angellist', 'url': 'https://angel.co/images/icons/follow_twitter_gray.png' },
  { 'name': 'google analytics', 'url': 'https://www.google-analytics.com/analytics.js' },
  { 'name': 'common icons', 'url':  'https://a.gfx.ms/hig/img/controls.png' },
  { 'name': 'hotmail', 'url': 'https://col128.mail.live.com/ol/clear.gif' },
  { 'name': 'fake application', 'url': 'https://www.aslsdfibjl.com' },
  { 'name': 'lcamtuf site', 'url': 'http://lcamtuf.coredump.cx/favicon.ico' },
  { 'name': 'rubyonrails.org1', 'url': 'http://guides.rubyonrails.org/images/favicon.ico' },
  { 'name': 'rubyonrails.org2', 'url': 'http://guides.rubyonrails.org/javascripts/guides.js' },
  { 'name': 'gmail', 'url': 'https://mail.google.com/mail/u/0/images/cleardot.gif' },
  { 'name': 'multiple gmail accounts', 'url': 'https://mail.google.com/mail/u/1/images/cleardot.gif' },
  { 'name': 'slack', 'url': 'https://slack.global.ssl.fastly.net/0180/img/icons/app-256.png' },
  { 'name': 'bob', 'urls': [ 'http://bob.com/images/topline-logo.jpg' ] }
]

apps.each do |app|
  App.create!(name: app[:name], url: app[:url])
end
