var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import { Topic } from './topic';
import { Grid } from './grid';
import { Modal } from './modal';
import { isMobile } from './utils';


window.onload = function () {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYm9rb3Nrb2tvcyIsImEiOiJjamc0MjJldXQ4NXBwMzBwbzd6NDBiZTh5In0.FYICg4VkTs8EhV4BBTiPMA';
    const lon = 30.521703502765035;
    const lat = 50.44810640667666;
    const boundPadding = 0.5;
    const options = {
        center: [lon, lat],
        container: 'map-container',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 11,
        minZoom: 9.4,
        keyboard: false,
        dragRotate: false,
        dragPanboolean: false,
        maxBounds: [[lon - boundPadding, lat - boundPadding], [lon + boundPadding, lat + boundPadding]],
        scrollZoom: false
    };

    if (isMobile()) {
        const videoArrow = document.getElementById('video-arrow');
        videoArrow.parentElement.removeChild(videoArrow);

        const mapContainer = document.getElementById('map-container');
        mapContainer.parentElement.removeChild(mapContainer);
    }

    const topics = [];

    topics.push(new Topic(lon + 0.03, lat + 0.0130, 'masha-reva', 'Masha Reva', 'Something'));
    topics.push(new Topic(lon + 0.04, lat + 0.0131, 'anton-romanov', 'Anton Romanov', 'An artist from Kiev'));
    topics.push(new Topic(lon + 0.05, lat + 0.0132, 'mariam-nayem', 'Mariam Nayem', 'Something'));
    topics.push(new Topic(lon + 0.06, lat + 0.0133, 'vaily-alexey', 'Vaily & Alexey', 'Something'));
    topics.push(new Topic(lon + 0.07, lat + 0.0134, 'jana-woodstock', 'Jana Woodstock', 'Something'));
    topics.push(new Topic(lon + 0.08, lat + 0.0135, 'sasha-tassio', 'Sasha Tassio', 'Something'));
    topics.push(new Topic(lon + 0.09, lat + 0.0136, 'yasia-khomenko', 'Yasia Khomenko', 'Something'));
    topics.push(new Topic(lon + 0.1, lat + 0.0137, 'vova-vorotniov', 'Vova Vorotniov', 'Something'));
    topics.push(new Topic(lon + 0.11, lat + 0.0138, 'evgenya-vidischeva', 'Evgenya Vidischeva', 'Something'));
    

    const modal = new Modal();
    let map;
    if (!isMobile()) {
        map = new mapboxgl.Map(options);
    }
    const grid = new Grid(modal);

    topics.forEach(topic => {
        if (map) {
            const element = document.createElement('div');
            element.className = 'marker';
            element.style.backgroundColor = 'black';
            const marker = new mapboxgl.Marker(element).setLngLat([topic.longitude, topic.latitude]).addTo(map);
            element.addEventListener('click', () => modal.show(topic.id, topic.content, topic.topicName));
        }

        grid.addCell(topic);
    });

    function removeFadeOut( el, speed ) {
        var seconds = speed/1000;
        el.style.transition = "opacity "+seconds+"s ease";
        el.style.opacity = 1;
    }
    
    removeFadeOut(document.getElementById('main-title'), 4000);

    const aboutUsLink = document.getElementById('about-us');

    aboutUsLink.addEventListener('click', function() {
        modal.show(null, 'html/about-us.html', null);
    });
};

var mainTitleContainer, mainTitleH1, mainTitleH4;
var lastCall = 0;

window.addEventListener('scroll', function() {
    if (!mainTitleContainer || !mainTitleH1 || !mainTitleH4) {
        mainTitleContainer = document.getElementById('main-title');
        mainTitleH1 = document.getElementById('main-title-h1');
        mainTitleH4 = document.getElementById('main-title-h4');
    }

    const now = new Date().getTime();
    const diff = now - lastCall;

    if (diff < 30) {
        return;
    }

    lastCall = now;
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        
    const mainTitleTop = Math.min(20, 0.1*scrollPos) + 'vh'; // between 0vh to 80vh
    const mainTitleSize = Math.max(8, 10 - 0.005*scrollPos) + 'vw'; // between 10vw to 6vw
    const subTitleSize = Math.max(2, 3 - 0.005*scrollPos) + 'vw'; // between 3vw to 1vw

    mainTitleH1.style.fontSize = mainTitleSize;
    mainTitleH4.style.fontSize = subTitleSize;
    mainTitleContainer.style.top = mainTitleTop;
});









