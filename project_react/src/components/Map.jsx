import {useRef} from 'react';
import useMap from '../hooks/useMap'
import {mapConfig} from '../config/mapConfig'

const Map = () => {
    const mapContainerRef = useRef(null);

    useMap(mapContainerRef, mapConfig.defaultStyle, mapConfig);

    // xml변환 하면 jsx 아니면 확장자를 js
    return <div ref= {mapContainerRef} style={{width: '100%', height: '100vh'}}/>

}

export default Map;