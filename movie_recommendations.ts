//bajsko

function display_menu() {
    console.log('Welcome to our Movie Recommendation System');
    console.log('1. Search for a movie');
    console.log('2. Exit');
  }

  // Function to handle user input
function handle_input(option: string) {
    let input = ""
    if (input === "1"){
        searchMovie()
    } else if (input === "2") {
        
    } else {
        console.log('Invalid option. Please try again.');
        
    }
}
