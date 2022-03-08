import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'customShorten'
})

export class CustomShortenPipe implements PipeTransform{
    transform(value: string){
        if(value.length > 200){
            return value.substring(0, 200) + '...';
        }
        return value;
    }
}