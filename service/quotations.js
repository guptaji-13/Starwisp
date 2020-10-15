const quotations = require(`../models/quotations_db`);

const createQuotation = (
  quotation_id,
  university_name,
  number_of_students,
  number_of_teachers,
  number_of_employees,
  contact_number
) => {
  return quotations.create(
    quotation_id,
    university_name,
    number_of_students,
    number_of_teachers,
    number_of_employees,
    contact_number
  );
};

const readQuotation = quotation_id => {
  return quotations.read(quotation_id);
};

const readAllQuotation = () => {
  return quotations.readAll();
};

const updateQuotation = (quotation_id, field, value) => {
  return quotations.update(quotation_id, field, value);
};

const deleteQuotation = quotation_id => {
  return quotations.deletes(quotation_id);
};

module.exports.createQuotation = createQuotation;
module.exports.readQuotation = readQuotation;
module.exports.readAllQuotation = readAllQuotation;
module.exports.updateQuotation = updateQuotation;
module.exports.deleteQuotation = deleteQuotation;
