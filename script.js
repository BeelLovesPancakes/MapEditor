'use strict'

const MapSection = document.querySelector('section');

function GenerateMap() {
    let x = 0;
    let z = 20;

    MapSection.textContent = '';

    while (x < (z*z)) {
    x++;

    const NewTile = document.createElement('div');
    NewTile.classList.add('tile', 'grass');

    SwitchTile(NewTile);
    NewTile.textContent = x - 1;
    MapSection.appendChild(NewTile);
        
    };
};

function SwitchTile(Tile) {
    Tile.addEventListener('click', () => {
        
        if(Tile.classList.contains('grass')) {
            Tile.classList.remove('grass');
            Tile.classList.add('road');
            RoadBuilder();
        }
        else if (Tile.classList.contains('road')) {
            Tile.classList.remove('road');
            Tile.classList.add('water');
            RoadBuilder();
        }
        else if (Tile.classList.contains('water')) {
            Tile.classList.remove('water');
            Tile.classList.add('grass');
        }
    });


}

const GeneratorBtn = document.querySelector('.generator');

GeneratorBtn.addEventListener('click', () => {
    GenerateMap();
});

function RoadBuilder() {

    for (let index = 0; index < MapSection.childNodes.length; index++) {
        
        if (MapSection.children[index].classList.contains('road')) {
            let RoadCounter = 0
            if((index - 20) > 0 && MapSection.children[index - 20].classList.contains('road')) {
                RoadCounter += 1;
            }
            if((index - 1) > -1 && MapSection.children[index - 1].classList.contains('road') && (index - 1)%20 != 19 ) { 
                RoadCounter += 8;
            }
            if((index + 1) < 400 && MapSection.children[index + 1].classList.contains('road') && (index + 1)%20 != 0) {
                RoadCounter += 2;
            }
            if((index + 20) < 399 && MapSection.children[index + 20].classList.contains('road')) {
                RoadCounter += 4;
            }

            console.log(RoadCounter)
            MapSection.children[index].style.backgroundImage = "url('Img/ROADS/road" + RoadCounter +".png')";
        } else {
            MapSection.children[index].style.backgroundImage = "";
        }
        
    }
}