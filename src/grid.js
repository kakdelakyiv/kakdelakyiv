import { isMobile } from './utils';

export class Grid {
    constructor(modal) {
        this.gridContainer = document.getElementById('grid-container');
        this.allTopics = [];
        this.modal = modal;

        if (isMobile()) {
            this.gridContainer.classList.add('mobile');
        } 
    }

    addCell(topic) {
        const cell = document.createElement('article');
        cell.id = topic.id;

        const img = document.createElement('img');
        img.src = topic.image.replace('.jpg', '.lowres.jpg'); // topic.image;

        const fullImage = new Image();        
        fullImage.onload = () => {
            img.src = topic.image;
        };
        fullImage.src = topic.image;

        const title = document.createElement('h1');
        title.innerHTML = topic.title;

        cell.appendChild(img); 
        cell.appendChild(title);

        cell.classList.add('grid-cell');
        this.modal.register(topic.content, topic.topicName);

        cell.addEventListener('click', () =>  {
            this.modal.show(topic.id, topic.content, topic.topicName);
        });

        this.gridContainer.appendChild(cell);
        this.allTopics.push(topic);
    }
}
