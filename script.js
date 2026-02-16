'use strict'



const MapSection = document.querySelector('.map');

function GenerateMap() {
    let x = 0;
    let z = 20;

    MapSection.textContent = '';

    while (x < (z*z)) {
        x++;

        const NewTile = document.createElement('div');
        NewTile.classList.add('tile', 'grass');

        SwitchTile(NewTile);
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


};


function RoadBuilder() {

    for (let index = 0; index < MapSection.childNodes.length; index++) {
        
        if (MapSection.children[index].classList.contains('road')) {
            let RoadCounter = 0
            if((index - 20) > -1 && MapSection.children[index - 20].classList.contains('road')) {
                RoadCounter += 1;
            }
            if((index - 1) > -1 && MapSection.children[index - 1].classList.contains('road') && (index - 1)%20 != 19 ) { 
                RoadCounter += 8;
            }
            if((index + 1) < 400 && MapSection.children[index + 1].classList.contains('road') && (index + 1)%20 != 0) {
                RoadCounter += 2;
            }
            if((index + 20) < 400 && MapSection.children[index + 20].classList.contains('road')) {
                RoadCounter += 4;
            }

            console.log(RoadCounter)
            MapSection.children[index].style.backgroundImage = "url('Img/ROADS/road" + RoadCounter +".png')";
        } else {
            MapSection.children[index].style.backgroundImage = "";
        }
        
    }
};


const Menu = document.querySelector('.menu');
const Editor = document.querySelector('.editor');
const NewMapBtn = document.querySelector('.new-map');
const LoadMapBtn = document.querySelector('.load-map');
const SaveMapBtn = document.querySelector('.save-map');
const BackMenuBtn = document.querySelector('.back-menu');
const MapNameInput = document.querySelector('.map-name');
const SaveList = document.querySelector('.save-list');


function GetSavedMaps() {
    return JSON.parse(localStorage.getItem('SavedMaps')) || {};
};

function SaveMap() {

    const name = MapNameInput.value.trim();

    if (!name) {
        alert('Enter a map name!');
        return;
    }

    const maps = GetSavedMaps();
    const MapData = [];

    for (let i = 0; i < MapSection.children.length; i++) {
        const tile = MapSection.children[i];

        if (tile.classList.contains('grass')) MapData.push('grass');
        else if (tile.classList.contains('road')) MapData.push('road');
        else if (tile.classList.contains('water')) MapData.push('water');
    }

    maps[name] = MapData;

    localStorage.setItem('SavedMaps', JSON.stringify(maps));

    alert('Map saved as "' + name + '"');

    RenderSaveList();
}

function RenderSaveList() {

    const maps = GetSavedMaps();
    SaveList.textContent = '';

    for (const name in maps) {

        const container = document.createElement('div');

        const loadBtn = document.createElement('button');
        loadBtn.textContent = 'Load: ' + name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        loadBtn.addEventListener('click', () => LoadMap(name));
        deleteBtn.addEventListener('click', () => DeleteMap(name));

        container.appendChild(loadBtn);
        container.appendChild(deleteBtn);

        SaveList.appendChild(container);
    }
}


SaveMapBtn.addEventListener('click', SaveMap);


SaveMapBtn.addEventListener('click', SaveMap);

NewMapBtn.addEventListener('click', () => {
    GenerateMap();
    ShowEditor();
});


function ShowEditor() {
    Menu.classList.add('hidden');
    Editor.classList.remove('hidden');
    console.log("EDITOR")
};

function ShowMenu() {
    Editor.classList.add('hidden');
    Menu.classList.remove('hidden');
    console.log("MENU")
};



function LoadMap(name) {

    const maps = GetSavedMaps();
    const MapData = maps[name];

    if (!MapData) return;

    MapSection.textContent = '';

    for (let i = 0; i < MapData.length; i++) {

        const NewTile = document.createElement('div');
        NewTile.classList.add('tile', MapData[i]);

        SwitchTile(NewTile);
        MapSection.appendChild(NewTile);
    }

    MapNameInput.value = name;

    RoadBuilder();
    ShowEditor();
}


function DeleteMap(name) {

    const maps = GetSavedMaps();

    delete maps[name];

    localStorage.setItem('SavedMaps', JSON.stringify(maps));

    RenderSaveList();
}

RenderSaveList();

LoadMapBtn.addEventListener('click', LoadMap);

BackMenuBtn.addEventListener('click', ShowMenu);


