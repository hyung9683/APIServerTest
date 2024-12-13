import { useEffect } from "react";
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import wellknown from 'wellknown';


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
// mapboxgl.accessToken = process.env.VITE_MAPBOX_ACCESS_TOKEN;

//https://sung-98.tistory.com/114

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

        const removeBuildingLayers = () => {

            if(map.getLayer('buildings')) {

                map.removeLayer('buildings');
            }

            if(map.getLayer('3d-buildings')) {

                map.removeLayer('3d-buildings');
            }

            if(map.getLayer('building')) {

                map.removeLayer('building');
            }

            const buildingLayers = [
                'building-number-label',
                'building-extrusion',
                'building-outline'
            ];

            buildingLayers.forEach(layer => {
                if(map.getLayer(layer)) {

                    map.removeLayer(layer);
                }
            });
        }

        if (map.loaded()) {

            removeBuildingLayers();
        } else {

            map.on('load', () => {
                removeBuildingLayers();
                loadGeoJson();
            });
        }

        const language = new MapboxLanguage({

            defaultLanguage : config.defaultLanguage,
        })
        map.addControl(language);

        const loadGeoJson = async () => {

            try {
                // const API_URL = import.meta.env.MODE === 'production' ? 'https://node-annhyung-dot-winged-woods-442503-f1.du.r.appspot.com' : 'http://localhost:8080';
                const API_URL = import.meta.env.VITE_API_URL
                
                const response = await fetch(`${VITE_API_URL}/bldg/bldg_map`);

                console.log('현재 주소:',response);
                
               
                

                if (!response.ok) {

                    console.log(response);
                    
                    throw new Error('Error Loading Polygon Data')

                } 
                

                const result = await response.json();

                console.log('서버 응답:', result.data);

                if(!Array.isArray(result.data)) {
                    console.error('데이터 배열이 아닙니다.', result);

                    return;
                }


                const geojson = {
                    type : 'FeatureCollection',
                    features : result.data.map(item => ({
                        type: 'Feature',
                        geometry : wellknown.parse(item.geom),
                        properties : {
                            bldg_id : item.bldg_id,
                            bldg_sn : item.bldg_sn,
                            rds_sn : item.rds_sn,
                            sig_cd : item.sig_cd,
                            emd_cd : item.emd_cd,
                            lotno_addr : item.lotno_addr,
                            road_nm_addr : item.road_nm_addr,
                            bldg_nm : item.bldg_nm,
                            gro_flo_co : item.gro_flo_co,
                            und_flo_co : item.und_flo_co,
                            bdtyp_cd : item.bdtyp_cd,
                            crt_dt : item.crt_dt,
                            mdfcn_dt : item.mdfcn_dt,
                            recent_poi_dtl_crt_dt : item.recent_poi_dtl_crt_dt,
                        }
                    }))
                };

                map.addSource('polygons', {
                    type: 'geojson',
                    data : geojson,
                });

                map.addLayer({
                    id: 'polygon-layer',
                    type: 'fill',
                    source: 'polygons',
                    paint: {
                        'fill-color': '#888888',
                        'fill-opacity': 0.4
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



