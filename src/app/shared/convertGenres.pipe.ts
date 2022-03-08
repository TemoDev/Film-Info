import { Pipe, PipeTransform } from "@angular/core";
import { MovieService } from "./movie.service";

@Pipe({
    name: 'convertGenres'
})

export class ConvertGenresPipe implements PipeTransform{
    
    constructor(private movieService: MovieService){}
    
    transform(value){
        const resultArray = [];
        
        for(let genre of value){
            resultArray.push(this.movieService.getGenre(genre));
        }
        return resultArray;
    }
}