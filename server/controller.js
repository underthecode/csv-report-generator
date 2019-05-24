module.exports = {
  // HELPER FUNC to flatten nested JSON
  flattenJSON: function(data) {
    const result = {};

    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        let l;

        for (let i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + '[' + i + ']');
        if (l === 0) result[prop] = [];
      } else {
        let isEmpty = true;

        for (let p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + '.' + p : p);
        }
        if (isEmpty && prop) result[prop] = {};
      }
    }

    recurse(data, '');
    return result;
  },

  // HELPER FUNC to parse out CSV fields
  csvFieldsParser: function(flatData, start = 0, end = 6) {
    const csvFields = Object.keys(flatData);
    return csvFields.slice(start, end).join();
  },

  // HELPER FUNC to parse out CSV rows
  csvDataParser: function(flatData, chunk = 6) {
    const csvData = Object.values(flatData);
    let row;
    const csvRows = [];

    for (let i = 0; i < csvData.length; i += chunk) {
      row = csvData.slice(i, i + chunk);
      csvRows.push(row.join());
    }
    return csvRows.join('\n');
  },

  // HELPER FUNC to combine fieldsData + rowData
  csvGenerator: function(data, callback) {
    const flatData = this.flattenJSON(data);
    const fieldsData = this.csvFieldsParser(flatData);
    const rowData = this.csvDataParser(flatData);
    callback(`${fieldsData}\n${rowData}`);
  }
};
