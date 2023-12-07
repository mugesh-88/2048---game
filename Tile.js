export default class Tile{
    #tileElement
    #x
    #y
    #value
    constructor(tileContainer,value = Math.random()> .5 ? 2: 4){
        this.#tileElement = document.createElement("div");
        this.#tileElement.classList.add("tile");
        tileContainer.append(this.#tileElement);
        this.value=value;
    }

    get value(){
        return this.#value;
    }

    set value(v){
        this.#value=v;
        this.#tileElement.textContent = v;
        const power = Math.log2(v);
        const backgroundLightness = 100 - power*9 ;

        this.#tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`);

        this.#tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`);
    }
    set x(value){
        this.#x=value;
        this.#tileElement.style.setProperty("--x",value+1);
    }
    set y(value){
        this.#y=value;
        this.#tileElement.style.setProperty("--y",value+1);
    }
    

    remove(){
        this.#tileElement.remove();
    }

    async waitForTransition() {
        const transitionDuration = parseFloat(window.getComputedStyle(this.#tileElement).transitionDuration) * 1000; // in milliseconds
    
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, transitionDuration);
        });
    }
    
    
    
    
    

}