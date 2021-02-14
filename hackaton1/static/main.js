var breakType;


function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

  return {
      total,
      hours,
      minutes,
      seconds
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
      const t = getTimeRemaining(endtime);

      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total == 0) {
        var listOfTips = [
          {tip: "Do some stretches!", image: "https://relaxreleaserenew.co.uk/wp-content/uploads/2020/03/Quad-stretch-side-1080x675.jpg" },
          {tip: "Talk to your friends/family!", image: "https://thumbs.dreamstime.com/b/fat-man-calling-friend-family-pandemic-coronavirus-188185807.jpg"},
          {tip: "Drink some water and eat some fruits/veggies!", image: "https://i1.wp.com/www.eatthis.com/wp-content/uploads/2020/08/black-woman-drinking-bottled-water.jpg?fit=1200%2C879&ssl=1"},
          {tip: "Go outside for a walk!", image: 'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/05/walking.jpg?resize=640%2C360&ssl=1' }
          ];
        let randomInt = Math.floor(Math.random() * listOfTips.length);
           //Displays Tip + Image
          document.getElementById('timerdiv') .innerHTML =  "<img src=' "+listOfTips[randomInt].image+"'>" ;
          document.getElementById('quote') .innerHTML =  listOfTips[randomInt].tip ;
          listOfTips.splice(randomInt,1) //removes tip so won't display again
          clearInterval(timeinterval);
        }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}



function timer_click(id) {
  breakType = id;
  if (breakType == "start") {
    var timeInMinutes = 0.05;
    const currentTime = Date.parse(new Date());
    const deadline = new Date(currentTime + timeInMinutes*60*1000);
    initializeClock('clockdiv', deadline);
  }

  else if (breakType == "quickBreak") {
    timeInMinutes = 5;
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + timeInMinutes*60*1000);
    initializeClock('clockdiv', deadline);
  }

  else if (breakType == "longBreak") {
    timeInMinutes = 30;
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + timeInMinutes*60*1000);
    initializeClock('clockdiv', deadline);
  }
  return breakType;
}


function toggleClass(elem,className){
  if (elem.className.indexOf(className) !== -1){
    elem.className = elem.className.replace(className,'');
  }
  else{
    elem.className = elem.className.replace(/\s+/g,' ') +     ' ' + className;
  }

  return elem;
}

function toggleDisplay(elem){
  const curDisplayStyle = elem.style.display;            

  if (curDisplayStyle === 'none' || curDisplayStyle === ''){
    elem.style.display = 'block';
  }
  else{
    elem.style.display = 'none';
  }

}

function toggleMenuDisplay(e){
  const dropdown = e.currentTarget.parentNode;
  const menu = dropdown.querySelector('.menu');
  const icon = dropdown.querySelector('.fa-angle-right');

  toggleClass(menu,'hide');
  toggleClass(icon,'rotate-90');
}

function handleOptionSelected(e){
  toggleClass(e.target.parentNode, 'hide');            

  const id = e.target.id;
  const newValue = e.target.textContent + ' ';
  const titleElem = document.querySelector('.dropdown .title');
  const icon = document.querySelector('.dropdown .title .fa');


  titleElem.textContent = newValue;
  titleElem.appendChild(icon);

  //trigger custom event
  document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
    //setTimeout is used so transition is properly shown
  setTimeout(() => toggleClass(icon,'rotate-90',0));
}

function handleTitleChange(e){
  const result = document.getElementById('result');
  result.innerHTML = 'The result is: ' + e.target.textContent;
  
}




//get elements
const dropdownTitle = document.querySelector('.dropdown .title');
const dropdownOptions = document.querySelectorAll('.dropdown .option');

//bind listeners to these elements
dropdownTitle.addEventListener('click', toggleMenuDisplay);

dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));

document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);
