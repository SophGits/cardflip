window.onload = function() {

  var deck = [
    "bay.jpg", 
    "grape.jpg", 
    "japanese-maple.jpg", 
    "linden.jpg", 
    "maple.jpg", 
    "pear.jpg"
  ];

  function shuffle(o){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  var game = {};
  game.$deck = document.getElementById('deck');
  // scoring
  var turns = 0;
  var target;

  // start new game
  var $createDeck = document.getElementById('create-deck');
  $createDeck.addEventListener('click', createDeck);

  function createDeck() {

    // clear view, turns and score
    var turns = 0;
    updateTurns(0);
    game.$deck.innerHTML = '';
    calculateScore('reset');

    // duplicate and shuffle deck
    var dblDeck = deck.concat(deck);
    dblDeck = shuffle(dblDeck);

    dblDeck.forEach(function(val, i){

      var $container = document.createElement('div');
      $container.className = 'container';
      game.$deck.appendChild($container);

      var $card = document.createElement('div');
      $card.className = 'card';
      $container.appendChild($card);

      var $front = document.createElement('div');
      $front.className = 'front';
      $card.appendChild($front);

      var $back = document.createElement('div');
      $back.className = 'back';
      $card.appendChild($back);

      var $image = document.createElement('img');
      $image.src = '/images/leaves/' + val;
      $back.appendChild($image);

      $card.addEventListener('click', handleCardClick);

    });
    target = deck.length * 2;

    var $target = document.getElementById('target');
    $target.children[0].innerHTML = target; //[0] is p
    return target;
  };

  function updateTurns(num){
    turns += num;
    var $turns = document.getElementById('turns');
    $turns.children[0].innerHTML = turns;
    return $turns;
  }

  function calculateScore(reset){
    var $scorePara = document.getElementById('score').children[0];

    var result = parseInt((target/turns)*100);
    if(result >= 60 && result <= 99){
      show("Very good");
    } else if(result === 100){
      show("Perfect!");
    } else if(result < 30){
      show("Poor");
    } else if(reset){
       $scorePara.innerHTML = '';
    } else{
      show("Good");
    }
    function show(message){
      $scorePara.innerHTML = result + "% <span>(" + message + ")</span>";
    }
  }

  function endGame(){
    var $cards = document.getElementsByClassName('card');
    for(i=0; i < target; i++){
      var deg = i*0.2*30;
      $cards[i].style.transform = "rotateY(-"+deg+"deg)";
    }
    // don't forget these browsers:
    // div.style.webkitTransform = 'rotate('+deg+'deg)';
    // div.style.mozTransform    = 'rotate('+deg+'deg)';
    // div.style.msTransform     = 'rotate('+deg+'deg)';
    // div.style.oTransform      = 'rotate('+deg+'deg)';
  }

  // select a card
  function handleCardClick(e) {
    e.preventDefault();

    $flippedCards = document.getElementsByClassName('flipped'); //.card.flipped
    $matchedCards = document.getElementsByClassName('matched'); //.card.matched

    if($flippedCards.length >= 2) {
      // $('.card').removeClass('flipped')
      // $(this).addClass('flipped');
      // console.log('case1'); // basically never happens

    } else if($flippedCards.length === 1) {

        var flippedSrc = $flippedCards[0].children[1].children[0].src;
        var imgsrc = e.target.parentElement.children[1].children[0].src; // think this is checking the images of the flipped cards are the same

        var imagesDir = '/images/';
        imgsrc = imgsrc.slice(imgsrc.indexOf(imagesDir) + imagesDir.length);
        flippedSrc = flippedSrc.slice(flippedSrc.indexOf(imagesDir) + imagesDir.length);

        if($matchedCards.length === ((deck.length)*2) -2){
          var $cards = document.getElementsByClassName('card');

          for(var i=0;i<$cards.length;i++) {
            $cards[i].classList.remove('matched');
            $cards[i].classList.add('matched');
            $cards[i].classList.add('complete');
          };
          updateTurns(1);
          calculateScore();
          endGame();
          // console.log('case2')

        } else if(imgsrc === flippedSrc) {
          e.target.parentElement.classList.add('matched');
          $flippedCards[0].classList.add('matched');
          $flippedCards[0].classList.remove('flipped');
          updateTurns(1);
          // console.log('case3')

        } else {
            e.target.parentElement.classList.add('flipped');
            setTimeout(function() {
              var length =  $flippedCards.length;
              for(var i=0; i < length; i++) {
                $flippedCards[0].classList.remove('flipped');
              };
            }, 400);
            updateTurns(1);
            // console.log('case4')
        }

      } else {
      e.target.parentElement.classList.add('flipped');
      updateTurns(1);
      // console.log('case5')
    }
  };

  setTimeout(createDeck(), 100);
};