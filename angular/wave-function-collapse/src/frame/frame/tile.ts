class Tile {

    img: HTMLImageElement;
id: number;
    up: number[];
    right: number[];
    down: number[];
    left: number[];


    constructor(id: number, img: HTMLImageElement, up:number[], right:number[], down:number[], left:number[]) {
        this.img = img;
        this.id= id;
        this.up = up;
        this.right = right;
        this.down = down;
        this.left = left;
    }

}

export { Tile };