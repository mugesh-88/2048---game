const grid_size=4;
const cell_size=20;
const cell_gap=2;
const border_rad=1;

export default class Grid{
    #cells

    get cellsByColumn() {
        return this.#cells.reduce((cellGrid,cell) =>
        {
            cellGrid[cell.x]=cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y]= cell;
            return cellGrid;
        },[]);
    }

    getCells() {
        return this.#cells;
    }

    get cellsByRow() {
        return this.#cells.reduce((cellGrid,cell) =>
        {
            cellGrid[cell.y]=cellGrid[cell.y] || [];
            cellGrid[cell.y][cell.x]= cell;
            return cellGrid;
        },[]);
    }

    constructor(gridElement) {
        gridElement.style.setProperty("--grid-size", grid_size);
        gridElement.style.setProperty("--cell-size", `${cell_size}vmin`);
        gridElement.style.setProperty("--cell-gap",`${cell_gap}vmin`);
        gridElement.style.setProperty("--border-rad", `${border_rad}vmin`);
        this.#cells=createCellElements(gridElement).map((cellElement,index)=>{
            return new Cell(cellElement,index%grid_size,Math.floor(index/grid_size));
        });
        //console.log(this.#cells);
    }

    get #emptyCells(){
        //console.log(this.#cells.length);
        return this.#cells.filter(cell=>cell.tile == null);
    }

    
    randomEmptyCell(){
        if (this.#emptyCells.length === 0) {
            return null; // No empty cells available
        }
        const randomIndex= Math.floor(Math.random()*this.#emptyCells.length);
        return this.#emptyCells[randomIndex];
    }
}

class Cell{
    #x
    #y
    #cellElement
    #tile
    #mergeTile

    constructor(cellElement,x,y){
        this.#cellElement= cellElement;
        this.#x=x;
        this.#y=y;
    }

    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }

    get tile(){
        return this.#tile;
    }

    get mergeTile(){
        return this.#mergeTile;
    }

    set mergeTile(value) {
        this.#mergeTile= value;
        if(value==null) return;
        this.#mergeTile.x = this.#x;
        this.#mergeTile.y = this.#y;
    }

    set tile(value){
        this.#tile=value;
        if(value==null) return;
        this.#tile.x=this.#x;
        this.#tile.y=this.#y;
    }

    canAccept(tile){
        return (this.tile == null || 
            (this.mergeTile == null && this.tile.value === tile.value));
    }

    mergeTiles(){
        if(this.tile == null || this.mergeTile == null) return;
        this.tile.value = this.tile.value + this.mergeTile.value;
        if(this.tile.value === 2048){
            setTimeout(() => {
                alert("You win");
            }, 200);
        }
        this.mergeTile.remove();
        this.mergeTile = null;
    }

    
}

function createCellElements(gridElement){
    const cells=[];
    for(let i=0;i<grid_size*grid_size;i++){
        const cell= document.createElement("div");
        cell.classList.add("cell");
        cells.push(cell);
        gridElement.append(cell);
    }
    return cells;
}