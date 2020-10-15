const express = require(`express`);
const app = express();

app.use(express.json({ extended: false }));
app.use('/quotations/', require(`./routes/routes`));
app.use('/', require(`./routes/auth`));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// {
//     "quotation_id" : 243,
//   "university_name" : "hvhbhnjb",
//   "number_of_students" : 56456,
//   "number_of_teachers" : 88,
//   "number_of_employees" : 78,
//   "contact_number" : 89
// }
