import React, { useState, useEffect } from 'react';
import { useWeather } from '@/Services/WeatherAPI';


interface WeatherAlertProps {
    onAlert?: (message: string) => void;
}

interface ToastState {
    show: boolean;
    message: string;
    icon: string;
}

const WeatherAlerts: React.FC<WeatherAlertProps> = ({ onAlert }) => {
    const { weather, units } = useWeather();
    const [alerts, setAlerts] = useState<string[]>([]);
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        icon: '',
    });

    useEffect(() => {
        if (!weather) return;

        const tempC = units === 'imperial' ? (weather.main.temp - 32) * (5 / 9) : weather.main.temp;
        const windMs = units === 'imperial' ? weather.wind.speed * 0.44704 : weather.wind.speed;

        const newAlerts: string[] = [];
        const alertIcons: string[] = [];

        if (weather.weather[0]?.id >= 200 && weather.weather[0]?.id < 300) {
            newAlerts.push('Thunderstorm warning in your area!');
            alertIcons.push(weather.weather[0]?.icon || '11d');
        }

        if (weather.weather[0]?.id >= 500 && weather.weather[0]?.id < 600) {
            if (weather.weather[0]?.id === 502 || weather.weather[0]?.id === 503) {
                newAlerts.push('Heavy rain warning!');
                alertIcons.push(weather.weather[0]?.icon || '10d');
            }
        }

        {/* severe heat*/}
        if (tempC > 35) {
            newAlerts.push('Extreme heat warning! Keep cool and hydrated');
            alertIcons.push('01d');
        }

        {/*severe coldness*/}
        if (tempC < -5) {
            newAlerts.push('Extreme cold warning! keep warm');
            alertIcons.push('13d');
        }

        {/*wind*/}
        if (windMs > 20) {
            newAlerts.push('High wind warning! stay indoors');
            alertIcons.push('50d');
        }


        if (newAlerts.length > 0) {
            setAlerts(newAlerts);
            setToast({
                show: true,
                message: newAlerts[0],
                icon: `https://openweathermap.org/img/wn/${alertIcons[0] || '11d'}@2x.png`,
            });

            const timeId = window.setTimeout(() => {
                setToast(prev => ({ ...prev, show: false }));
            }, 5000);

            if (onAlert) {
                onAlert(newAlerts.join(' '));
            }

            return () => window.clearTimeout(timeId);
        }
    }, [weather, units, onAlert]);

    if (alerts.length === 0 && !toast.show) {
        return null;
    }

    return (
        <>
         {/*notification*/}
         {toast.show && (
          <div className={'toastNotification'}>
             <div className={'toastContent'}>
                 <img src={toast.icon} 
                      alt={toast.message} 
                      className={'toastIcon'}
                      />
                   <p className={'toastMessage'}>{toast.message}</p>
                 </div>
                <button className={'toastCloseBtn'}
                        onClick={() => setToast(prev => ({ ...prev, show: false}))}>
                        <i className={'fa-solid fa-xmark'}></i>
                </button>
            </div>
         )}
      </>
    );
};

export default WeatherAlerts;