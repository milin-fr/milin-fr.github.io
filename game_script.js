var images = [];
var eight_random_couples_of_images = [];
var all_cells = document.getElementsByClassName('game_cell_image');
var image_per_cell_dictionary = {};
var current_turn = 1;
var current_cell_pair = [];
var guessed_cells = [];
var number_of_guessed_cells = 0;
var game_won = "nope";

function clear_board() {
    images = ["./game_images/ant.png", "./game_images/bug.png", "./game_images/cat.png", "./game_images/cerf.png", "./game_images/chiken.png", "./game_images/cow.png", "./game_images/crab.png", "./game_images/dauphin.png", "./game_images/dog.png", "./game_images/donkey.png", "./game_images/elephant.png", "./game_images/frog.png", "./game_images/hedgehog.png", "./game_images/horse.png", "./game_images/octopus.png", "./game_images/pig.png", "./game_images/rabbit.png", "./game_images/sheep.png", "./game_images/turtle.png"];
    current_turn = 1;
    current_cell_pair = [];
    guessed_cells = [];
    number_of_guessed_cells = 0;
    game_won = "nope";
    get_eight_random_couples_of_images();
    get_image_per_cell_dictionary();
    display_game_won();
    for (var i = 0; i < all_cells.length; i++) {
        all_cells[i].src = "./game_images//empty_cell.png"
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
  }

function delete_images_after_eight(){
    while (images.length > 8) {
        images.pop()
    }
}


function get_eight_random_couples_of_images(){
    shuffle(images);
    delete_images_after_eight();
    var eight_couples_of_images = images.concat(images);
    for (var i = 0; i < 16; i++) {
        console.log(i + " " + eight_couples_of_images[i]);
        }
    shuffle(eight_couples_of_images);
    eight_random_couples_of_images = eight_couples_of_images;

}

function get_image_per_cell_dictionary(){
    for (var i = 0; i < all_cells.length; i++) {
        console.log(eight_random_couples_of_images[i]);
        image_per_cell_dictionary[all_cells[i].id] = eight_random_couples_of_images[i];
    }
}


var restart_game = document.querySelector("#restart_button")

restart_game.addEventListener('click',clear_board);

function check_winning_conditions() {
    if (number_of_guessed_cells == 16){
        game_won = "yes";
        display_game_won();
    }
}

function close_not_matching_cells() {
    if(current_turn > 2){
        if(!(guessed_cells.includes(current_cell_pair[0]))){
            current_cell_pair[0].src = "./game_images//empty_cell.png";
            current_cell_pair[1].src = "./game_images//empty_cell.png";
        }
    }
}

function check_for_match() {
    if(current_cell_pair[0].src == current_cell_pair[1].src){
        guessed_cells.push(current_cell_pair[0]);
        guessed_cells.push(current_cell_pair[1]);
        number_of_guessed_cells = number_of_guessed_cells + 2;
        check_winning_conditions();
    }
}

function cell_clicked() {
    if (this.src.includes("/game_images//empty_cell.png")) {

        if(current_turn%2 == 1){
            close_not_matching_cells();
            current_cell_pair[(current_turn-1)%2] = this;
            current_cell_pair[(current_turn-1)%2].src = image_per_cell_dictionary[this.id];
        }
        else{
            current_cell_pair[(current_turn-1)%2] = this;
            current_cell_pair[(current_turn-1)%2].src = image_per_cell_dictionary[this.id];
            check_for_match();
        }

        current_turn++;
    }
}


function display_game_won(){
    if(game_won == "yes") {
        document.getElementById('game_won').style.display = 'block';
        document.getElementById("number_of_turns").innerHTML = current_turn;
    }else {
        document.getElementById('game_won').style.display = 'none';
    }
}

for (var i = 0; i < all_cells.length; i++) {
    all_cells[i].addEventListener('click',cell_clicked);
}


window.onload = clear_board();
