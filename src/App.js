import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      weather: {}
    };
    this.api = {
      key: "ece6257e00e02743beca6267bf9795a2",
      base:"https://api.openweathermap.org/data/2.5/"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  handleEnter(event) {
    if (event.key == "Enter") {
      fetch(`${this.api.base}weather?q=${this.state.query}&units=metric&APPID=${this.api.key}`)
      .then(res=>res.json())
      .then(result=> {
        this.setState({weather:result, query:""})
      })
    }
  }
  handleChange(event) {
    this.setState({query:event.target.value});
  }
  render() {
    function dateBuilder(d) {
      let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
  
      return `${day}, ${date} ${month} ${year}`;
    }
    return (
      <div className={(typeof this.state.weather.main != "undefined") 
                      ?(this.state.weather.main.temp < 19)
                      ?('app')
                      :('app-warm')
                      :('app')
                    }>
        <main>
          <div className="search-box">
            <input 
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={this.handleChange}
                value={this.state.query}
                onKeyPress={this.handleEnter}
            />
          </div>
          {(typeof this.state.weather.main != "undefined") ? (
            <div>
            <div className="location-box">
              <div className="location">{this.state.weather.name}, {this.state.weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(this.state.weather.main.temp)}c</div>
              <div className="weather">{this.state.weather.weather[0].main}</div>
            </div>
            </div>
          ): ("")}
        </main>
      </div>
    );
  }
}

export default App;
