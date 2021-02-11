$(function () {
  $('#search').tooltip();
  $('#search').autocomplete({
    source: function (request, response) {
      $.ajax({
        type: 'GET',
        url: `/autocomplete`,
        data: request,
        success: function (data) {
          response(
            $.map(data, function (el) {
              return {
                label: el.login,
              };
            })
          );
        },
      });
    },

    minLength: 1,

    select: function (event, ui) {
      this.value = ui.item.label;
      console.log(event);
      $(this).next('input').val(ui.item.value);
      event.preventDefault();
      // optionnal: submit the form after field has been filled up
      $('#quicksearch').submit();
    },
  });
});
