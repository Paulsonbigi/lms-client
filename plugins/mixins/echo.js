import Pusher from "pusher-js"

Pusher.logToConsole = true;

var pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  cluster: 'mt1'
});

var channel = pusher.subscribe('book-notification-channel');
channel.bind('test_event', function(data) {
  app.messages.push(JSON.stringify(data));
});
