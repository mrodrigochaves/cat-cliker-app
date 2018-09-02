/* ======= Model ======= */

var model = {
    currentCat: null,
    adminShow: false, //hides the admin display area.
    cats: [
        {
            clickCount: 0,
        name : 'Darth Vader',
        imgSrc: 'image/adorable-animal-animal-photography-416135.jpg',
        imgAttribution : 'https://www.pexels.com/photo/adorable-animal-animal-photography-animal-portrait-416135/'
    },
    {
        clickCount: 0,
        name : 'Yoda',
        imgSrc: 'image/animal-animal-photography-cat-57416.jpg',
        imgAttribution : 'https://www.pexels.com/photo/animals-sweet-cat-kitty-57416/'
    },
    {
        clickCount: 0,
        name : 'Mommy',
        imgSrc: 'image/animal-blur-cat-412463.jpg',
        imgAttribution : 'https://www.pexels.com/photo/animal-blur-cat-cat-face-412463/'
    },
    {
        clickCount: 0,
        name : 'Drowsy-head',
        imgSrc: 'image/animal-cat-face-close-up-416160.jpg',
        imgAttribution : 'https://www.pexels.com/photo/animal-cat-face-close-up-feline-416160/'
    },
    {
        clickCount: 0,
        name : 'HackCat',
        imgSrc: 'image/black-cat-black-keyboard-cat-1049764.jpg',
        imgAttribution : 'https://www.pexels.com/photo/black-cat-holding-persons-arm-1049764/'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {
    //init function initalizes with the begining data. Keep out of the DOM.
    init: function(){
        //set the current cat to the first one on the list
        model.currentCat = model.cats[0];
        
        //tell our views to initialize.
        catListView.init();
        catView.init();
        adminView.init();
        adminView.hide();
    },
    
    getCurrentCat: function(){
        return model.currentCat;
    },
    
    //calls the array of cats.
    getCats: function(){
        return model.cats;
    },
    
    //sets the new cat.
    setCurrentCat: function(cat){
        model.currentCat = cat;
    },
    
    //increments the counter for the currently-selected cat.
    incrementCounter: function(){
        model.currentCat.clickCount ++;
        catView.render();
    },
    //function runs when 'Admin' button is clicked.
    adminDisplay: function(){
        if (model.adminShow === false) {
            model.adminShow = true;
            adminView.show(); //displays the admin input boxes and buttons
        }
        else if (model.adminShow === true) {
            model.adminShow = false;
            adminView.hide();// hides the admin input boxes and buttons
        }
    },
    
    //hides admin display when cancel button is clicked.
    adminCancel: function(){
        adminView.hide();
    },
    
    //hides admin display and saves new cat data when save button is clicked.
    adminSave: function(){
        model.currentCat.name= adminCatName.value;
        model.currentCat.imgSrc= adminCatURL.value;
        model.currentCat.clickCount= adminCatClicks.value;
        catView.render();
        catListView.render();
        adminView.hide();
    }
};

/* ======= Views ======= */
var catView = {
    init: function(){
    this.catImage = document.getElementById("catImage"); //the cat image
    this.name = document.getElementById("catName"); //the cat's name above the image
    this.clickCount = document.getElementById("displayClicks"); //display for number of times this cat was clicked
    //on click, increment the current cat's click count
    this.catImage.addEventListener('click', function(){
        octopus.incrementCounter();
    });
    this.render();
    },
    
    render: function(){
        var currentCat = octopus.getCurrentCat(); //calls the current cat from octopus
        this.clickCount.textContent = "Number of times this cat was clicked: " + currentCat.clickCount;
        this.name.textContent = currentCat.name;
        this.catImage.src = currentCat.imgSrc;
    }
};

var catListView = {
    init: function(){
        
        //store the DOM element for easy access.
        this.catList = document.getElementById('names');
        
        //update the DOM elements with the right values.
        this.render();
    },
    
    render: function(){
        var i, cat, catElem;
        
        //call the array of cats from octopus
        var cats = octopus.getCats();
        
        this.catList.innerHTML= '';
        
//loop over each cat in our array of cats
        for (i = 0; i < cats.length; i++) {
            
            //This is the cat number that we are on
            cat = cats[i];
            
            
            //create a DOM element for each cat
            catElem = document.createElement('li'); //create li element
            catElem.textContent = cat.name; //fills the content of li with the cat's name
            
            //when the cat's name in the list is clicked, update the cat's picture
            catElem.addEventListener('click', (function(catCopy) {
                return function(){
                octopus.setCurrentCat(catCopy);
                catView.render();
                octopus.incrementCounter(); //increments cat clicker
                };
            })(cat));

            this.catList.appendChild(catElem); //append li elements to the list
        }
    }
    
};

var adminView = {
    init: function(){
        this.adminCatName = document.getElementById("adminCatName");
        this.adminCatURL = document.getElementById("adminCatURL");
        this.adminCatClicks = document.getElementById("adminCatClicks");
        var admin = document.getElementById("admin");
        
        this.adminBtn = document.getElementById("adminBtn");
        this.adminCancel = document.getElementById("adminCancel");
        this.adminSave = document.getElementById("adminSave");
        
        this.adminBtn.addEventListener('click', function(){ //shows the admin display.
            octopus.adminDisplay();
        });
        
        this.adminCancel.addEventListener('click', function(){ //hides the admin display without saving any new cat data.
            octopus.adminCancel();
        });
        
        this.adminSave.addEventListener('click', function(){ //hides the admin display and saves new cat data.
            octopus.adminSave();
        });
        
        this.render();
    },
    
    render: function(){
        var currentCat = octopus.getCurrentCat(); //calls current cat
        this.adminCatName.value = currentCat.name;
        this.adminCatURL.value = currentCat.imgSrc;
        this.adminCatClicks.value = currentCat.clickCount;
    },
    
    show: function(){
            admin.style.display = 'block'; //shows the admin div on index.html
        },
        
    hide: function(){
        admin.style.display = 'none';
    }

};

//make it go!
octopus.init();
