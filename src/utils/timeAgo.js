function timeAgoConverter(time) {
    const difference = new Date(Date.now() - time);
    console.log(difference.toUTCString());
}

timeAgoConverter(1755600920);


/*

Just now
a minute ago
2 min ago - 59 min ago
an hour ago
2 hrs ago - 24 hrs ago
a day ago
2 days ago - 28 days ago
a month ago
2 months ago - 11 months ago
a year ago
2 years ago - X years ago

*/