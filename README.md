### Card matching game using CSS3 transitions and jQuery

View in Chrome

Webkit not playing, so Safari not done yet.

#NB
This is a nice way to read a directory, but works in development only.

```javascript
get images
$.ajax({
  url: 'images/',
  success: function (data) {
    $(data).find('a:contains(".jpg"),a:contains(" + .png + ")').each(function () {
      var imgName = this.text.toString();
      deck.push(imgName);
     });
   }
});
```