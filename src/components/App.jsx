// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import React, { useState } from "react";
import "./App.css";
// import PhotoUploader from './Picture.jsx';
import ImageUploader from './ConvertHEIC.jsx';


const App = ({ addOnUISdk }) => {
    const [buttonLabel, setButtonLabel] = useState("Click me");

    function handleClick() {
        setButtonLabel("Clicked");
    }

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                {/* <Button size="m" onClick={handleClick}>
                    {buttonLabel}
                </Button> */}
                <h1> vectorfi</h1>


                
                {/* <PhotoUploader></PhotoUploader> */}
                <ImageUploader></ImageUploader>




            </div>
        </Theme>
    );
};

export default App;
