const uploadedJSON = document.getElementById('upload-btn');

$(document).ready(function() {
  $('#submit-btn').click(function(event) {
    // stop submit the form, we will post it manually
    event.preventDefault();

    // get form
    const form = $('#json-upload')[0];

    // create an FormData object
    const data = new FormData(form);

    // If you want to add an extra field for the FormData
    data.append('json-file', uploadedJSON.files[0]);

    $.ajax({
      type: 'POST',
      enctype: 'multipart/form-data',
      url: '/convert',
      data: data,
      processData: false,
      contentType: false,
      success: function(data) {
        console.log(data);
        $('#result').append(data);
        console.log('SUCCESS : ', data);
      },
      error: function(err) {
        $('#result').text(err.responseText);
        console.log('ERROR : ', err);
      }
    });
  });
});
