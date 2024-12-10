import { useEffect } from "react";
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const useMap = (mapContainerRef, style, config) => {

    useEffect(() => {
        // const map은 mapboxgl.Map의 인스턴스 
        // container는 맵을 렌더링할 DOM 요소의 참조
        // style은 맵의 스타일
        // center는 맵의 초기 중심 좌표
        // zoom은 맵의 초기 줌 레벨
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: style,
            center: config.initialCenter,
            zoom: config.initialZoom,
        })

        const language = new MapboxLanguage({

            defaultLanguage : config.defaultLanguage,
        })
        map.addControl(language);

        const loadGeoJson = async () => {

            try {
                const response = await fetch();
                const geojson = await response.json();

                map.addSource('polygons', {
                    type: 'geojson',
                    data: geojson,
                })

                map.addLayer({
                    id: 'polygon-layer',
                    type: 'fill',
                    source: 'polygons',
                    paint: {
                        'fill-color': '#888888',
                        'fill-opacity' : '0.4'
                    }
                })

                map.addLayer({
                    id : 'polygon-outline-layer',
                    type: 'line',
                    source: 'polygons',
                    paint: {
                        'line-color' : '#000000',
                        'line-width' : 2,
                    }
                })
            } catch(error) {

                console.error('Error loading geojson', error);
                
            }
        }

        return () => map.remove();
    }, [mapContainerRef, style, config])
}

export default useMap;
