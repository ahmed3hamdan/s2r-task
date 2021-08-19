import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import RestaurantCard from "./RestaurantCard";

const fetchRestaurants = async () => {
  const res = await fetch("/api");
  if (!res.ok) throw Error(res.statusText);
  return res.json();
};

const HomePage = () => {
  const { isLoading, error, data } = useQuery("restaurants", () =>
    fetchRestaurants()
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.WEBAPP_GOOGLE_MAPS_KEY,
  });

  const [map, setMap] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  const onLoad = useCallback((map) => {
    map.setCenter({
      lat: 24.1399988,
      lng: 54.196945,
    });
    map.setZoom(8);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && restaurant != null) {
      map.setZoom(12);
      map.panTo(data[restaurant].position);
    }
  }, [data, map, restaurant]);

  const getMap = () => {
    if (isLoaded) {
      return (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {data.map(({ _id, position }, i) => (
            <Marker
              key={`marker-${_id}`}
              position={position}
              onClick={() => setRestaurant(i)}
            />
          ))}
        </GoogleMap>
      );
    }
    return null;
  };

  const getContent = () => {
    if (isLoading) {
      return (
        <div className="mx-auto text-center animate-pulse">
          <div className="text-5xl">⌛</div>
          <p className="mt-4">Loading Restaurants...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="mx-auto text-center">
          <div className="text-5xl">😞</div>
          <p className="mt-4">An error occured while fetching restaurants.</p>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto border flex-grow flex">
        <div className="bg-gray-200 flex-grow">{getMap()}</div>
        <div className="bg-white divide-y divide-solid flex-shrink-0 max-w-sm">
          {data.map((item, i) => (
            <RestaurantCard
              key={item._id}
              restaurant={item}
              active={restaurant === i}
              onClick={() => setRestaurant(i)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="font-mono bg-gray-50 flex flex-col fixed inset-0 min-h-screen">
      <header className="mt-12">
        <div className="text-center">
          <h1 className="font-bold text-3xl">😋 Recomended Resturants</h1>
          <p className="text-gray-600 text-lg mt-4">
            This site contains few of my faviorate restaurants in UAE 🇦🇪
          </p>
        </div>
      </header>
      <main className="flex-grow flex mt-12">{getContent()}</main>
      <footer className="bg-black text-white text-center py-2 mt-12">
        Made by{" "}
        <a
          className="underline"
          href="https://ahmedhamdan.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Ahmed Hamdan
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
