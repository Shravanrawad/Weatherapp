let wrapper = document.querySelector('.wrapper'),
inputpart = wrapper.querySelector('.input-part'),
infotxt = inputpart.querySelector('.info-txt'),
inputField = inputpart.querySelector('input');
back = wrapper.querySelector('header i')
const getbutton = document.querySelector('button');
let Api;
let apikey;

getbutton.addEventListener('click', function(){  
     callapi(inputField.value)
})

function callapi(city){
  apikey = `83b691027cd2f01e2952ab85102d19ec`;
  Api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  fetchdata();
}

function fetchdata(){
  infotxt.innerHTML = 'Searching weather data...'
  infotxt.classList.add('pending')
  fetch(Api)
  .then(response => response.json())
  .then(result => Weatherdetails(result))
}

function Weatherdetails(info){
  if(info.cod == '404'){
    infotxt.classList.replace('pending', 'error')
    infotxt.innerHTML = `${inputField.value} is Invalid city`;
    inputField.value = ''
  }
  else {
     
    let city = info.name
    let country = info.sys.country
    let {feels_like, humidity, temp} = info.main
    let {description,id} = info.weather[0]

    wrapper.querySelector('.temp .numb').innerHTML = Math.floor(temp);
    wrapper.querySelector('.weather').innerHTML = description;
    wrapper.querySelector('.location span').innerHTML = `${city}, ${country}`;
    wrapper.querySelector('.temp .numb-2').innerHTML = Math.floor(feels_like);
    wrapper.querySelector('.humidity span').innerHTML = `${humidity}%`;
    
    infotxt.classList.remove('pending', 'error')
    wrapper.classList.add('active')
    inputField.value = ''
  }
}

back.addEventListener('click', function(){
  wrapper.classList.remove('active')
})