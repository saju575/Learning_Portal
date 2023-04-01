export function truncateWords(str, numWords) {
  // Split the string into an array of words
  var wordsArray = str.split(" ");

  // Get the specified number of words from the start of the array
  var selectedWords = wordsArray.slice(0, numWords);

  // Join the selected words back into a string
  var truncatedStr = selectedWords.join(" ");

  // Add an ellipsis to the end of the truncated string
  if (wordsArray.length > numWords) {
    truncatedStr += "...";
  }

  return truncatedStr;
}

// Example usage
// Output: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed..."
