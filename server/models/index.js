// HELPER FUNC to flatten nested JSON
const flattenJSON = data => {
  const result = {};

  function traverseJSON(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      let l;

      for (let i = 0, l = cur.length; i < l; i++)
        traverseJSON(cur[i], prop + '[' + i + ']');
      if (l === 0) result[prop] = [];
    } else {
      let isEmpty = true;

      for (let p in cur) {
        isEmpty = false;
        traverseJSON(cur[p], prop ? prop + '.' + p : p);
      }
      if (isEmpty && prop) result[prop] = {};
    }
  }

  traverseJSON(data, '');
  return result;
};

// HELPER FUNC to parse out CSV fields
const parseCSVField = (flatData, start = 0, end = 6) => {
  const csvFields = Object.keys(flatData);
  return csvFields.slice(start, end).join();
};

// HELPER FUNC to parse out CSV rows
const parseCSVData = (flatData, chunk = 6) => {
  const csvData = Object.values(flatData);
  let row;
  const csvRows = [];

  for (let i = 0; i < csvData.length; i += chunk) {
    row = csvData.slice(i, i + chunk);
    csvRows.push(row.join());
  }
  return csvRows.join('\n');
};

// HELPER FUNC to combine fieldsData + rowData
const generateCSV = data => {
  const flatData = flattenJSON(data);
  const fieldsData = parseCSVField(flatData);
  const rowData = parseCSVData(flatData);
  return `${fieldsData}\n${rowData}`;
};

module.exports = {
  generateCSV
};
