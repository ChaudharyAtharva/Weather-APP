const cityname=document.querySelector(".cityname");
const card=document.querySelector(".card")
const apikey="fcd493b0825769000aadd19d83ecb1f3";
const form=document.querySelector(".weatherform");

form.addEventListener("submit",async event=>{

    event.preventDefault();
    const city=cityname.value
    if(city){
        try{
                const weatherdata=await getWeatherdata(city);
                displaydata(weatherdata);
        }

        catch(error){
            console.error(error);
            errordisplay(error);
        }
    }

    else{
        errordisplay("Please enter a valid city");
        }
});




async function getWeatherdata(city) {
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response=await fetch(apiurl);
    console.log(response);
    
    if(!response.ok){
        throw new Error("Couldn't find the city");
    }

    return await response.json();
}

function displaydata(data){
    const {
        name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;

        card.textContent=""
        card.style.display="flex";

        const citydisplay=document.createElement("h1");
        const tempdisplay=document.createElement("p");
        const humiditydisplay=document.createElement("p");
        const descdisplay=document.createElement("p");
        const weatheremoji=document.createElement("p");

        citydisplay.textContent=city;
        tempdisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
        humiditydisplay.textContent=`Humidity:${humidity}%`;
        descdisplay.textContent=description;
        weatheremoji.textContent=getweatheremoji(id);

        citydisplay.classList.add("citydisplay");
        tempdisplay.classList.add("tempdisplay");
        humiditydisplay.classList.add("humiditydisplay");
        descdisplay.classList.add("descdisplay");
        weatheremoji.classList.add("weatheremoji");

        card.appendChild(citydisplay);
        card.appendChild(tempdisplay);
        card.appendChild(humiditydisplay);
        card.appendChild(descdisplay);
        card.appendChild(weatheremoji);

}

function getweatheremoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            card.style.backgroundImage="url('ThunderStorm.jpg)";
            card.style.backgroundSize="cover";
            card.style.backgroundPosition="center";

            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            card.style.backgroundImage="url('ThunderStorm.jpg')";
            card.style.backgroundSize="cover";
            card.style.backgroundPosition="center";

            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            card.style.backgroundImage="url('ThunderStorm.jpg')";
            card.style.backgroundSize="cover";
            card.style.backgroundPosition="center";

            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            card.style.backgroundImage="url('Snow.jpg')";
            card.style.backgroundSize="cover";
            card.style.backgroundPosition="center";

            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            card.style.backgroundImage="url('Fog.jpg')";
            card.style.backgroundSize="cover";
            card.style.backgroundPosition="center";

            return "🌫";
        case (weatherId === 800):
            card.style.backgroundImage="url('Clear.jpg')";
            card.style.backgroundSize="cover";
            card.style.backgroundPosition="center";

            return "🌤";
        case (weatherId >= 801 && weatherId < 810):
            card.style.backgroundImage="url('Partial Cloudy.jpg')";
            card.style.backgroundSize="cover";
            card.style.backgroundPosition="center";

            return "☁";
        default:
            return "";
    }
}

function errordisplay(msg){

    const p=document.createElement("p");
    p.textContent=msg;
    p.classList.add("errordisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(p);
    }