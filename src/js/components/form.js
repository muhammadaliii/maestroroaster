(function($){

	$('.button.submit-form').on('click', function() {
		$("#form-message").submit();
	});

	var validator = $( "#form-message" ).validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true
			},
			phone: {
				required: true
			},
			message: {
				required: true
			},
        },
		highlight: function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorElement: 'strong',
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
			if(element.parent('.form-group').length) {
				error.insertBefore(element);
			} 
			// else if (element.attr("name") == "start_date" || element.attr("name") == "end_date") {
			// 	error.insertBefore(element.parent().parent());
			// }
			else {
				error.insertBefore(element);
			}
		},
	});

	var validator = $( "#form-contact" ).validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true
			},
			phone: {
				required: true
			},
			subject: {
				required: true
			},
			message: {
				required: true
			},
        },
		highlight: function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorElement: 'strong',
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
			if(element.parent('.form-group').length) {
				error.insertBefore(element);
			} 
			// else if (element.attr("name") == "start_date" || element.attr("name") == "end_date") {
			// 	error.insertBefore(element.parent().parent());
			// }
			else {
				error.insertBefore(element);
			}
		},
	});

	$('#modal-product').on('hidden.bs.modal', function () {
		// $('#form-message').trigger('reset');
		// validator.resetForm();

		$(this).find('#form-message')[0].reset();
		$("#form-message").each(function(){
			$(this).validate().resetForm();
			$(this).find('.form-group').removeClass('has-error');
		});
	});

	$('#modal-product').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget)
		var productShow = button.data('product')
		var productName = button.data('name')
		var modal = $(this)
		modal.find('.modal-body #productShow').val(productShow)
		modal.find('.modal-body #productName').val(productName)
	});

})(jQuery);