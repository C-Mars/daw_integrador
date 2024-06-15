import { Injectable } from '@angular/core';

@Injectable()
export class FotoService {
    getData() {
        return [
            {
                itemImageSrc: '../../assets/images/carrusel/1.png',
                thumbnailImageSrc: '',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: '../../assets/images/carrusel/2.jpg',
                thumbnailImageSrc: '',
                alt: 'Description for Image 2',
                title: 'Title 2'
            },
            {
                itemImageSrc: '../../assets/images/carrusel/3.jpg',
                thumbnailImageSrc: '',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: '../../assets/images/carrusel/4.jpg',
                thumbnailImageSrc: '',
                alt: 'Description for Image 4',
                title: 'Title 4'
            },
            {
                itemImageSrc: '../../assets/images/carrusel/5.jpg',
                thumbnailImageSrc: '',
                alt: 'Description for Image 5',
                title: 'Title 5'
            },
            {
                itemImageSrc: '../../assets/images/carrusel/6.jpg',
                thumbnailImageSrc: '',
                alt: 'Description for Image 6',
                title: 'Title 6'
            },
            {
                itemImageSrc: '../../assets/images/carrusel/7.jpg',
                thumbnailImageSrc: '',
                alt: 'Description for Image 7',
                title: 'Title 7'
            },
            {
                itemImageSrc: '../../assets/images/carrusel/8.png',
                thumbnailImageSrc: '',
                alt: 'Description for Image 8',
                title: 'Title 8'
            }
        ];
    }

    getImages() {
        return Promise.resolve(this.getData());
    }
}