export default function ({ $pusher }) {
    // Echo is available here

    $pusher.subscribe('new_book_notifications')
    .listen('new_book', (e) => {
        console.log("New book created")
    });

  }

