// NB To overcome CORS, run a server with python -m SimpleHTTPServer
$(document).ready(function(){

  var deck = []

  // get images
  $.ajax({
    url: 'images/',
    success: function (data) {
      $(data).find('a:contains(".jpg"),a:contains(" + .png + ")').each(function () {
        var imgName = this.text.toString();
        deck.push(imgName);
       });
     }
  });

  // shuffle function
  function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  // scoring
  var turns = 0;
  var target;

  // start new game
  $('#create-deck').click(function(){
    //clear deck
    $('#deck').html("");
    //clear turns
    turns = 0;
    updateTurns(0);
    // duplicate and shuffle deck
    var dblDeck = deck.concat(deck);
    // shuffle deck
    dblDeck = shuffle(dblDeck);
    // create deck
    $(dblDeck).each(function(){
      $('#deck').append('<div class="container"><div class="card"><div class="front"></div><div class="back"><img src="images/'+this+'"/></div></div></div>')
    });
    target = deck.length * 2;
    $('#target p').html(target);
    return target;
  });

  function updateTurns(num){
    turns+=num;
    return $('#turns p').html(turns);
  }

  function calculateScore(){
    var result = parseInt((target/turns)*100);
    if(result >= 60 && result <= 99){
      show("Very good");
    } else if(result === 100){
      show("Perfect!");
    } else if(result < 30){
      show("Poor");
    } else{
      show("Good");
    }
    function show(message){
      $('#score p').prepend(result + "%");
      $('#score p span').append(" (" +message+")");
    }
  }

  function endGame(){
    // for(i=0; i < target; i++){
    //   var deg = i*0.2*30;
    //   $('.card')[i].style.transform = "rotateY(-"+deg+"deg)";
    // }
    //don't forget these browsers:
    // div.style.webkitTransform = 'rotate('+deg+'deg)';
    // div.style.mozTransform    = 'rotate('+deg+'deg)';
    // div.style.msTransform     = 'rotate('+deg+'deg)';
    // div.style.oTransform      = 'rotate('+deg+'deg)';
  }

  // select a card
  $('section').on("click", ".card", function(e){

    e.preventDefault();

    if($('.flipped').length >= 2) {

      $('.card').removeClass('flipped')
      $(this).addClass('flipped');
      console.log('case1'); // basically never happens

    } else if($('.flipped').length === 1) {

        var flippedCard = $('.flipped')[0]["innerHTML"];
        var img = $(this, 'div img')[0]["innerHTML"];

        if($('.matched').length === ((deck.length)*2) -2){
          $('.card').removeClass('matched').addClass('matched').addClass('complete');
          updateTurns(1);
          calculateScore();
          endGame();
          // console.log('case2')

        } else if(img === flippedCard) {
          $(this).addClass('matched');
          $('.flipped').removeClass('flipped').addClass('matched');
          updateTurns(1);
          // console.log('case3')

        } else {
          $(this).addClass('flipped')
            setTimeout("($('.flipped').removeClass('flipped'));", 400);
            updateTurns(1);
            // console.log('case4')
        }

      } else {
      $(this).addClass('flipped');
      updateTurns(1);
      // console.log('case5')
    }
  });

});

$(document).ready(function(){
  setTimeout("$('#create-deck').click();", 100);
})