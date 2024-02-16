import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { TiWeatherSunny } from 'react-icons/ti';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import GrainIcon from '@mui/icons-material/Grain'; // Icon for Humidity
import AirIcon from '@mui/icons-material/Air'; // Icon for Wind
import BeachAccessIcon from '@mui/icons-material/BeachAccess'; // Icon for Sunshine
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import WavesIcon from '@mui/icons-material/Waves'; // Icon for Ground Level
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import './style.css';


const WeatherComponent = ({ CountryName }) => {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = 'ea70dee1c8721ecd521aee97e1e19d7a';
    useEffect(() => {
        fetchWeatherData();
    }, [CountryName]);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CountryName}&appid=${apiKey}&units=metric`);
            if (response.status === 404) {
                console.log('Country not found');
                return;
            } else {
                const data = await response.json();
                setWeatherData(data);
                console.log('Weather data:', data);
                return;
            } 
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const chooseWeatherIcon = (weather) => {
        return <TiWeatherSunny className='weatherIcon' />; // For example, always show sunny weather icon for simplicity
    };

    if (!weatherData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px' }}>
                <Card className='card' style={{ minWidth: '500px' }}>
                    <CardContent>
                        <Grid container spacing={2} display={'flex'} justifyContent={'space-between'} alignItems="center">
                            <Grid item>
                                {chooseWeatherIcon(weatherData.weather[0].main)}
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    {`${weatherData.name}, ${weatherData.sys.country}`}
                                </Typography>
                                <Typography variant="h4" component="div">
                                    {`${weatherData.main.temp}°C`}
                                </Typography>
                                <Typography variant="body1">
                                    {weatherData.weather[0].description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} marginTop={2}>
                            <Grid item>
                                <Typography variant="body1">
                                    <WbSunnyIcon sx={{ fontSize: 30 }} /> Feels Like: {weatherData.main.feels_like || '-'}°C
                                </Typography>
                                <Typography variant="body1">
                                    <GrainIcon sx={{ fontSize: 30 }} /> Humidity: {weatherData.main.humidity || '-'}%
                                </Typography>
                                <Typography variant="body1">
                                    <AirIcon sx={{ fontSize: 30 }} /> Pressure: {weatherData.main.pressure || '-'} hPa
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">
                                    <BeachAccessIcon sx={{ fontSize: 30 }} /> Sea Level: {weatherData.main.sea_level || '-'} hPa
                                </Typography>
                                <Typography variant="body1">
                                    <WavesIcon sx={{ fontSize: 30 }} /> Top Ground Level: {weatherData.main.grnd_level || '-'} hPa
                                </Typography>
                                <Typography variant="body1">
                                    <DeviceThermostatIcon sx={{ fontSize: 30 }} /> Max Temperature: {weatherData.main.temp_max || '-'}°C
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>


        </>
    );
};

export default WeatherComponent;
