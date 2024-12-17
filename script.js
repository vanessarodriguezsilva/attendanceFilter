var data = [];

// Event listener for the button click to load data
document.getElementById('filterBtn').addEventListener('click', function() {
    // Use fetch to load the JSON file
    fetch('data/attendance.json')
        .then(response => {
            // Check if the response is successful (status 200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Convert the response to JSON
            return response.json();
        })
        .then(dataJson => {
            // Display the loaded data
            //console.log(dataJson);
            
            // Call a function to display the data
            data = dataJson;
            displayAttendanceData(dataJson);
        })
        .catch(error => {
            // Handle errors if fetch fails
            console.error('There was a problem with the fetch operation:', error);
        });
});

// Function to display the data in the HTML
function displayAttendanceData(data) {

    const filterType = document.getElementById('filterType').value;
    const searchInput = document.getElementById('searchInput').value.trim();

    let filteredData = [];
    filteredData = data;

    if (filterType === 'date') {
        filteredData = filterByDate(searchInput);
    } else if (filterType === 'name') {
        filteredData = filterByName(searchInput);
    }

    displayResults(filteredData);
}


// Display filtered results
function displayResults(filteredData) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results
  
    if (filteredData.length === 0) {
      resultDiv.innerHTML = '<p>No results found.</p>';
    } else {
      resultDiv.innerHTML = filteredData;
    }
  }



// Change input field based on filter type
document.getElementById('filterType').addEventListener('change', event => {
    const filterType = event.target.value;
    const inputLabel = document.getElementById('inputLabel');
    const inputField = document.getElementById('searchInput');
  
    if (filterType === 'date') {
      inputLabel.textContent = 'Enter Date (e.g., 9/4):';
      inputField.placeholder = 'e.g. 9/4';
    } else {
      inputLabel.textContent = 'Enter Name:';
      inputField.placeholder = 'e.g. Basan,Jargalsaikhan';
    }
  });


  // Function to filter data by date
function filterByDate(date) {
    let excusedPeople = []; // People with excuses
    let absentPeople = []; // People who were absent
  
    // Iterate over each person in the data
    data.forEach(person => {
      // If the person has "e" (excuse) on the specified date, add them to excusedPeople
      if (person[date] === 'e') {
        excusedPeople.push(person.Name);
      }
      // If the person has "/" (absent) on the specified date, add them to absentPeople
      else if (person[date] === '/') {
        absentPeople.push(person.Name);
      }
    });
  
    // Display the result
    var result = '';
    result += `Date: ${date}`;
    result += `<br> Total excuses: ${excusedPeople.length}`;
    if(excusedPeople.length > 0){
      result += `<br> People with excuses: <li>${excusedPeople.join('<li> ')}`;
    }
    result += `<br> Total absences: ${absentPeople.length}`;
    if(absentPeople.length > 0){
    result += `<br> People with absences: <li>${absentPeople.join('<li> ')}`;
    }
    return result;
  }
  
  // Function to filter data by name
  function findObjectByProperty(array, property, value) {
      return array.find(item => item[property] === value);
  }
  
  function filterByName(name) {
      let result = 'The student: <br>';
      studentAttendance = findObjectByProperty(data, 'Name', name);
  
      if (studentAttendance) {
          let absences = 0;
          let excuses = 0;
          let attendanceDays = 0;
  
          // Arrays to store the dates for absences, excuses, and attendance
          let absenceDates = [];
          let excuseDates = [];
          let attendanceDates = [];
  
          // Loop through the attendance data and count absences, excuses, and attendance
          for (const date in studentAttendance) {
              if (date !== 'id' && date !== 'name') { // Ignore 'id' and 'name' properties
                  if (studentAttendance[date] === '/') {
                      absences++;
                      absenceDates.push(date); // Store absence dates
                  } else if (studentAttendance[date] === 'e') {
                      excuses++;
                      excuseDates.push(date); // Store excuse dates
                  } else if (studentAttendance[date] === '*') {
                      attendanceDays++;
                      attendanceDates.push(date); // Store attendance dates
                  }
              }
          }
  
          // Display the results
          if (absences > 0 || excuses > 0) {
              result += `${name} had ${absences} absence(s) on: <li>${absenceDates.join('<li> ')}.<br>`;
              result += `${name} had ${excuses} excuse(s) on: <li>${excuseDates.join('<li> ')}.<br>`;
          } else {
              result += `${name} attended for ${attendanceDays} day(s) on <li>${attendanceDates.join('<li> ')}.<br>`;
          }
      } else {
          result += 'Student not found.<br>';
      }
  
      // Return the result as a string for HTML display    
      return result;
  }