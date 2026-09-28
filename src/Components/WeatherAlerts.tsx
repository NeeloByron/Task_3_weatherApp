import React, { useState, useEffect } from 'react';
import { useWeather } from '@/Services/WeatherAPI';


interface WeatherAlertProps {
    onAlert?: (message: string) => void; // funtion for sending alert text to the parent component
}

interface ToastState {
    show: boolean;
    message: string;
    icon: string;
}

const WeatherAlerts: React.FC<WeatherAlertProps> = ({ onAlert }) => {
    const { weather, units } = useWeather(); // Read the current weather
    const [alerts, setAlerts] = useState<string[]>([]);
    // store whether the notification is visible and what it displays
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        icon: '',
    });

    useEffect(() => {
        // Clear the previous notification before checking new weather
        setToast({
            show: false,
            message: '',
            icon: '',
        })
        // Stops if weather data is not available
        if (!weather) return;
         // convert fahrenheit to celsius when imperial units are selected
        const tempC = units === 'imperial' ? (weather.main.temp - 32) * (5 / 9) : weather.main.temp;
        const windMs = units === 'imperial' ? weather.wind.speed * 0.44704 : weather.wind.speed; // convert miles per hour to metres per second

        const newAlerts: { message: string; icon: string }[] = []; // keep each message together with its icon
        const condition = weather.weather[0];

        // Check the thunderstorm condition range used by your app.
        if (condition && condition.id >= 200 && condition.id < 300) {
           newAlerts.push({
            message: 'Thunderstorm conditions reported.',
            icon: condition.icon || '11d',
          });
        }

         // Check the rain condition codes selected for your app.
        if (condition && (condition.id === 502 || condition.id === 503)) {
         newAlerts.push({
          message: 'Heavy rain conditions reported.',
          icon: condition.icon || '10d',
        });
       }


        // Add a heat alert when the temperature is above 35°C.
        if (tempC > 35) {
            newAlerts.push({
            message: 'High temperature: above 35°C.',
            icon: '01d',
          });
         }

         // Add a cold alert when the temperature is below -5°C.
    if (tempC < -5) {
      newAlerts.push({
        message: 'Low temperature: below -5°C.',
        icon: '13d',
      });
    }

    // Add a wind alert when the speed is above 20 metres per second.
    if (windMs > 20) {
      newAlerts.push({
        message: 'Strong wind: above 20 m/s.',
        icon: '50d',
      });
    }

    // Stop if none of the alert rules matched.
    const firstAlert = newAlerts[0];
    if (!firstAlert) return;

    // Display the first matching alert.
    setToast({
      show: true,
      message: firstAlert.message,
      icon: `https://openweathermap.org/img/wn/${firstAlert.icon}@2x.png`,
    });

    // Automatically hide the notification after five seconds.
    const timerId = window.setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 5000);

    // Send all matching alert messages to the parent, if provided.
    onAlert?.(newAlerts.map(alert => alert.message).join(' '));

    // Cancel the timer before rerunning this effect or removing the component.
    return () => window.clearTimeout(timerId);
  }, [weather, units, onAlert]);

  // Render nothing when the notification is hidden.
  if (!toast.show) return null;

  return (
    <div className="toastNotification" role="status">
      <div className="toastContent">
        {/* The message explains the icon, so avoid repeating it aloud. */}
        <img
          src={toast.icon}
          alt=""
          className="toastIcon"
        />

        <p className="toastMessage">{toast.message}</p>
      </div>

      {/* Let the user dismiss the notification immediately. */}
      <button
        type="button"
        className="toastCloseBtn"
        aria-label="Dismiss weather notification"
        onClick={() =>
          setToast(prev => ({ ...prev, show: false }))
        }
      >
        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default WeatherAlerts;