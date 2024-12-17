# attendanceFilter Project

## Description

This is a Python-based web application that helps manage and filter attendance data in an educational institution. The application allows you to view attendance records with details like the student's name, attendance status (* for present, / for absent, and e for excused), and the corresponding dates. It offers two main filtering functionalities:

1. **Filter by student**:
   - Shows how many excused absences and regular absences a student has, along with the specific days.
   - If the student attended all the days, it will also show the days they attended.

2. **Filter by date**:
   - Displays the students who were absent or excused on a specific date.

### Project Structure


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/attendance.git
   cd attendance

2. Make sure Python 3.x is installed on your machine.

3. Install any necessary dependencies. For example, if using Flask, you can install it with:
   pip install flask

4. To run the project, use the following command to start the development server:
   python app.py

The project will run locally at localhost:8000

## Usage
1. Open the project in your web browser at localhost:8000.
2. To filter by student, select By Name, then enter the student's name and click the filter button.
3. To filter by date, select By Date, then enter the specific date and it will show the students who were absent or excused on that day.

