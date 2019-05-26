$(document).ready(() => {
  $(document).on('change', '.upload', event => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      $.post('convert', { json: event.target.result }, () => {
        $('.download').append(
          '<a href="http://localhost:3000/json.txt" download>Download CSV</a>'
        );
      });
    };
    fileReader.readAsText(event.target.files[0]);
  });
});
