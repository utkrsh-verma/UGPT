// listModels.js


const API_KEY = "AIzaSyARTNcL6zh43FdwIsrz16IuyHoQ8EboP0c";

fetch(`https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`)
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err));
