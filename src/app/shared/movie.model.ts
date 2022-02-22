import { MovieCast } from './cast.model';

export class Movie {
    constructor(
        public id: number,
        public title: string, 
        public description: string, 
        public genres: [],
        public rating: number, 
        public airDate: string, 
        public language: string, 
        public reviews: number, 
        public imagePath: string, 
        public keyId ?: string,
        public cast ?: MovieCast[]){}
}