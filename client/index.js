$(document).ready(() => {
  $(document).on('change', '#upload', event => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      $.post('convert', { json: event.target.result }, (data, stat) => {
        $('body').append(
          '<a href="http://127.0.0.1:3000/json.txt" download>Download CSV</a>'
        );
      });
    };
    fileReader.readAsText(event.target.files[0]);
  });
});
