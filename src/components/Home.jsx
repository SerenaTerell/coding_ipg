import React from "react"

export default function Home(){

    const [cities, setCities] = React.useState(["Munich","Karlsruhe","Frankfurt"])
    const [newCity, setNewCity] = React.useState("")
    const [weatherData, setWeatherData] = React.useState([])
    const [weatherAvailable, setWeatherAvailable] = React.useState(true)

    const cityList = cities.map ((city,index) =>{
        return <div key={index} className="city">
                    <p className="city-name">{city}</p>
                    <span className="material-symbols-outlined delete-icon" onClick={() => deleteCity(index)}>delete</span>
                </div>
    })

    const weatherCards = weatherData.map(weather =>{
        return <div className="weather-card">
                <h2>{weather[0]}</h2>
                <p>{weather[1].comment}</p>
                <img src={weather[1].iconURL}/>
                <p>{weather[1].temp.c} °C</p>
                <p>{weather[1].humidity}</p>
                <p>{weather[1].precip}</p>
        </div>
    })

    React.useEffect(() => {
        setWeatherData([])
        for(let i=0; i < cities.length;i++){
            let currentCity = cities[i];
            fetch("https://weatherdbi.herokuapp.com/data/weather/" + currentCity)
                .then(res => res.json())
                .then(data => setWeatherData(prevWeatherData => [...prevWeatherData, [currentCity, data.currentConditions]]))
                .catch(function() {
                    setWeatherAvailable(false)
                    console.log("error");
                });
            }
    }, [cities])

    function addCity(){
        if(cities.length < 5){
            setCities(prevCities => [...prevCities,newCity])
            setNewCity("")
        }else{
            alert("The limit of cities is 5. Try deleting another one to add a new one.")
        }
    }

    function deleteCity(cityIndex){
        setCities(prevCities => prevCities.filter((city,index) => index !== cityIndex))
    }

    function handleChange(event) {
        setNewCity(event.target.value)
    }
    

    return(
        <div className="home-holder">
            <h2 className="welcome-message">Welcome to the weather app ipgautomotive!</h2>
            <div className="city-list">
                <div className="add-city">
                    <form>
                    <input
                        type="text"
                        placeholder="Add city"
                        name= "added-city"
                        onChange={handleChange}
                        value={newCity}
                    />
                    </form>
                    <span className="material-symbols-outlined add-icon" onClick={addCity}>add_circle</span>
                </div>
                <h3 className="list-title">Your city list:</h3>
                {cityList}
            </div>
            <div className="weather-cards">
                {weatherAvailable ? weatherCards: <h4 className="offline-message">Weather service unavailable, please try again later.</h4>}
            </div>
        </div>
    )
}