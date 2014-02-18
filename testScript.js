const tweetLimit = 140;
var textArea = $('textarea');

setInterval(function () {
  // Tell jQuery to find the first tweet on the page
  var tweet = $('.tweet').first();
  // Copy it into new memory - the new tweet doesn't exist in the DOM yet
  var newTweet = tweet.clone();
  $.ajax({
    url: $('form').attr('action'),
    type: 'get',
    dataType: 'json',
    success: function (data) {
      // Find the value of the textarea. Find the tweet content inside the tweet.
      // Set the tweet content's text to the textarea's value.
      newTweet.find('.tweet_content').text(data.tweet_content);
      newTweet.find('.avatar img').attr('src', data.tweet_avatar);
      newTweet.find('.author').text(data.tweet_author);
      // Set the tweet's time to "now" (a silly shortcut)
      newTweet.find('.time').text('now');

      //var tweets = $('.tweets');
      //tweets.prepend(newTweet);

      // Insert the new tweet before the old tweet on the page.
      tweet.before(newTweet);
    }
  });
}, 5000);

$('form').on('submit', function (e) {
  // Prevent the default submit action (going to a new page) from happening
  e.preventDefault();

  if (textArea.val().length <= tweetLimit) {
    // Tell jQuery to find the first tweet on the page
    var tweet = $('.tweet').first();
    // Copy it into new memory - the new tweet doesn't exist in the DOM yet
    var newTweet = tweet.clone();

    var $this = $(this);

    $.ajax({
      url: $this.attr('action'),
      type: $this.attr('method'),
      data: $this.serialize(),
      dataType: 'json',
      success: function (data) {
        // Find the value of the textarea. Find the tweet content inside the tweet.
        // Set the tweet content's text to the textarea's value.
        newTweet.find('.tweet_content').text(data.tweet_content);
        newTweet.find('.avatar img').attr('src', data.tweet_avatar);
        newTweet.find('.author').text(data.tweet_author);
        // Set the tweet's time to "now" (a silly shortcut)
        newTweet.find('.time').text('now');

        //var tweets = $('.tweets');
        //tweets.prepend(newTweet);

        // Insert the new tweet before the old tweet on the page.
        tweet.before(newTweet);
      }
    });


  } else {
    alert('Please keep it at ' + tweetLimit + ' characters or less!');
  }
});

textArea.on('keyup', function () {
  $('.tweet_counter').text(tweetLimit - textArea.val().length);
});

$('.tweets').on('click', '.favorite', function (e) {
  e.preventDefault();
  $(this).closest('.tweet').toggleClass('favorited');
});

$('.tweets').on('click', '.retweet', function (e) {
  e.preventDefault();
  $(this).closest('.tweet').toggleClass('retweeted');
});