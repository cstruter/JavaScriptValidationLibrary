/*	
    CSTruter JavaScript Validation Library version 1.0
    Author: Christoff Truter

    Date Created: 2013/10/08

    e-Mail: christoff@cstruter.com
    Website: www.cstruter.com
    Copyright 2013 CSTruter	
*/

var Validators = {
	IsEmail: function(sender) {
		var pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		return pattern.test(sender.val());
	},
	IsRegEx: function(sender, args) {
		var pattern = args.pattern;
		return pattern.test(sender.val());
	},
	IsRequired: function(sender) {
		return ($.trim(sender.val()) != '');
	},
	IsNumber: function(sender) {
		return (!isNaN(sender.val()));
	},
	IsSame: function(sender, args) {
		var comparer = $(args.compare);
		return (sender.val() == comparer.val());
	},
	IsAsync: function(sender, args) {
		return $.ajax({
			url: args.url,
			data : { value: sender.val() }
		});
	}
};

var ChainValidators = {
	IsChecked : function(elements, args) {
		var checked = 0;
		elements.each(function(index, sender) {
			var element = $(sender);
			if (element.prop('checked')) {
				checked++;
			}
		});
		if (typeof args.exact !== 'undefined') {
			return (checked == args.exact);
		}
		if ((typeof args.min !== 'undefined') && (checked < args.min)) {
			return false;
		}
		if ((typeof args.max !== 'undefined') && (checked > args.max)) {
			return false;
		}
		return true;
	}
};

Validation.Inherit('Validators');
Validation.Inherit('ChainValidators');