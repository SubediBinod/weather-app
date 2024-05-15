const units ="metric"
const lang = "en"
let weather={
    apiKey: "851b22907a1c7112bc4bf68d2faacc16",
    fetchWeather: function(city){
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${this.apiKey}`
        )
        .then((response)=>response.json())
        .then((data)=>{this.dataWeather(data)
            console.log(data)
        })
    },
    dataWeather: function(data){
        var{name} = data;// object destructuring
        var{description} =data.weather[0]
        var{temp,humidity} = data.main;
        var{speed} = data.wind;
        const { main, weather } = data;
        const weatherCondition = weather[0].main.toLowerCase();
        console.log(weatherCondition)
        this.getBackgroundImage(weatherCondition);
        
        document.querySelector(".city").textContent=name;
        document.querySelector(".temp").textContent=temp +"°C";
        document.querySelector(".description").textContent=description;
        document.querySelector(".humidity").textContent="Humidity : "+humidity +" %";
        document.querySelector(".wind").textContent="Wind Speed: "+speed+" km/h";
    },
    getBackgroundImage: function (weatherCondition) {
        switch (weatherCondition) {
            case "clear":
                document.body.style.backgroundImage = "url('sunny.jpg')";
                document.getElementById("emoji-img").innerHTML= "🌞";
                break;
            case "clouds":
                document.body.style.backgroundImage = "url('cloudy.jpg')";
                document.getElementById("emoji-img").innerHTML= "⛅";
                break;
            case "rain":
                document.body.style.backgroundImage = "url('rainy1.jpg')";
                document.getElementById("emoji-img").innerHTML= "☔";
                break;
            case "snow":
                document.body.style.backgroundImage = "url('snow.jpg')";
                document.getElementById("emoji-img").innerHTML= "❄️";
                break;
            case "thunderstorm":
                document.body.style.backgroundImage = "url('thunder.jpg')";
                document.getElementById("emoji-img").innerHTML= "🌩️";
                break;
            case "drizzle":
                document.body.style.backgroundImage = "url('rainy.jpg')";
                document.getElementById("emoji-img").innerHTML= ":🌦️";
                break;
            default:
                document.body.style.backgroundImage = "url('img.jpg')"; 
        }
    },
    search: function(){
        const city = document.querySelector(".search-bar").value;
        this.fetchWeather(city);
    }    
}

document.querySelector(".search-button").addEventListener("click", function(){
    weather.search()
}
)

document.querySelector(".search-bar").addEventListener("keyup", function(e){
    if(e.key=="Enter"){
        weather.search()
    }
}
)
weather.fetchWeather("Kathmandu");