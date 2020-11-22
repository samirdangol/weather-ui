import React from 'react'

  export const Weather = ({data}) => {
    
    return (
        <div>
          {data.map((data) => {
            return (
              <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{data.zipCode}</h5>
                    <p class="card-text">{data.temparature} F</p>
                  </div>
              </div>
            );
          })}
        </div>
    );
  };
  
  export default Weather;