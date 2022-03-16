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
        public posterPath: string, 
        public backdropPath: string, 
        public keyId ?: string){}
}