import React from 'react';
import News from './News';
import img1 from '../images/quiz.png';
import img2 from '../images/CarEmission.png';
import img3 from '../images/EmissionComparison.png';
import img4 from '../images/MapTraffic.png';
import './NewsPage.css';


function NewsPage() {

  return (
    <div className="NewsPage">
        <h1>Check Our Features</h1>
        <div className="NewsList">
                <News
                    img = {img4 }
                    title="Trace your Footprint"
                    description="In the Carbon Calculator function, 
                    you can choose to use an approximate traffic type to complete the calculation. 
                    Depending on the type of car used and the distance to the destination entered, 
                    it can help you calculate and track the carbon footprint of your travels. "
                    link='/footprint'
                />
                <News
                    img = {img2}
                    title="Get your Travel Recommendation"
                    description="
                    By entering a location and press enter, travel recommendations will be given based on the weather data of 
                    your input location, including temperature, 
                    description, humidity, wind speed.
                    In this way, you can choose the travel mode we recommend according to your own needs, or use it as a reference"
                    link='/travel'
                />
                <News
                    img = {img1}
                    title="Australian carbon emissions"
                    description="
                    By comparing the carbon emission data of different regions, people can understand which regions need to work harder to reduce carbon emissions, and can learn from the successful experience of other regions, so as to reduce their own carbon emissions more effectively."
                    link='/information/state'
                />
                <News
                    img = {img3}
                    title = "Map Traffic"
                    description="
                    This feature is used to compare between two different types of transport 
                    on which of the transport produces more carbon emissions. 
                    
                    There’s a range of different transport options 
                    available ranging from the carbon emission of a motorbike to the carbon emissions of planes."
                    link = '/information/transport'
                />
        </div>
    </div>
  );
}

export default NewsPage;
