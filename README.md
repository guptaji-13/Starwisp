# Starwisp
 Update the quotations_db.js file in the models folder before running the API. Enter your local MySQL host, user, password and database details in the respective fields and the save the file.

The API will run at locolhost:XXXX/
wherer XXXX is the port number displayed in console logs.

To create a new entry<br>
URL '/'<br>
input JSON with keys quotation_id, university_name, number_of_students, number_of_teachers, number_of_employees, contact_number

To read an entry
URL '/:id'
where :id is the quotation_id for the row that is to be read

To update an entry
URL '/'
input JSON with keys quotation_id, field, value
where field is the name of the column that is to be updated and value is the new data of that column.

To delete an entry
URL '/:id'
where :id is the quotation_id for the row that is to be deleted.
