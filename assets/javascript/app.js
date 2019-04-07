/* Pseudocode

Input text
boton que mande el valor del input text
Arreglo que almacene el data-name de los botones
funcion que muestre los botones con el texto del arreglo
div para mostrar los botones
llamar la API de gifs
introducir el data-name de los botones en sus parametros de busqueda
número de gif mostrado ilimitado
iniciar los gifs en modo animado
agregar la funcionalidad de stop/play con un click en el gif
*/
//-------------------------------------------------------------------

// Arreglo de peliculas a mostrar en botones
var gifs = ["David Bowie", "Elvis Presley", "Pink Floyd", "Led Zeppelin", "The Doors", "Janis Joplin"];


// Función para mostrar los gifs

function displayGifs(){
    $("#gifsHere").empty();

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=kMbI4ZZJrz3VZFhrUBe8r6gLoL9VQCDY&limit=10";

    $.ajax ({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
        var gifUrl = response.data;

        for (var i = 0; i < gifUrl.length; i++) {
            var randomGif = $("<img>");
            randomGif.addClass("gifStyle");
            randomGif.attr("src", gifUrl[i].images.fixed_height_still.url);
            randomGif.attr("data-still", gifUrl[i].images.fixed_height_still.url);
            randomGif.attr("data-animate", gifUrl[i].images.fixed_height.url);
            randomGif.attr("data-state", "still");
            randomGif.attr("alt", "image??");
    
            $("#gifsHere").prepend(randomGif);
            
        }

        $(".gifStyle").on("click", function(){
            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });        

    });

}


// funcion que toma el data del arreglo y lo pone en los botones
function renderButtons(){
    $("#buttonsHere").empty();

    for (var i = 0; i < gifs.length; i++) {
        var a = $("<button>").addClass("btn btn-outline-primary");
            a.addClass("gif");
            a.attr("data-name", gifs[i]);
            a.text(gifs[i]);
            $("#buttonsHere").append(a);
   console.log(gifs);
   console.log("New button??", a);     
    }
}

// función que agrega el nuevo boton tecleado por el usuario
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    gifs.push(gif);
    renderButtons();

    console.log("gifs del clikc", gifs);
    console.log("el gif solito", gif);
    
});

$(document).on("click", ".gif", displayGifs);

renderButtons();

