/*	
CSTruter JavaScript Validation Library version 1.0
Author: Christoff Truter

Date Created: 2013/10/08
Date Modified: 2014/10/22

e-Mail: christoff@cstruter.com
Website: www.cstruter.com
Copyright 2013, 2014 CSTruter	
*/

(function ($) {

    $.Validation = {
        Add: function (property, callback) {
            if (typeof callback === 'function') {
                Validators[property] = callback;
            }
            $.Validation.Validators.prototype[property] = function (property) {
                return function (args) {
                    if (typeof this.validators[this.id] === 'undefined') {
                        this.validators[this.id] = {};
                    }
                    if (typeof args === 'undefined') {
                        args = {};
                    }
                    args.name = property;
                    this.validators[this.id][property] = args;
                };
            } (property);
        },
        Group: function (name, callback) {
            if (typeof callback === 'undefined') {
                return this.Groups[name];
            }
            var group = new Group();
            this.Groups[name] = group;
            $(function () {
                callback(group);
            });
        },
        Groups: {},
        OnAsyncStart: $.Callbacks(),
        OnAsyncEnd: $.Callbacks(),
        OnInValid: $.Callbacks(),
        OnValid: $.Callbacks(),
        OnClear: $.Callbacks(),
        Validators: function (id, validators) {
            this.id = id;
            this.validators = validators;
            this.Remove = function (validator) {
                if (typeof validators[id] === 'undefined') {
                    delete validators[id][validator];
                }
            }
        }
    };

    var Validators = {
        IsEmail: function (sender) {
            var pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            return pattern.test(sender.val());
        },
        IsRegEx: function (sender, args) {
            var pattern = args.pattern;
            return pattern.test(sender.val());
        },
        IsRequired: function (sender) {
            return ($.trim(sender.val()) != '');
        },
        IsNumber: function (sender) {
            return (!isNaN(sender.val()));
        },
        IsSame: function (sender, args) {
            var comparer = $(args.compare);
            return (sender.val() == comparer.val());
        },
        IsAsync: function (sender, args) {
            return $.ajax({
                url: args.url,
                data: { value: sender.val() }
            });
        },
        IsChecked: function (elements, args) {
            var checked = 0;
            elements.each(function (index, sender) {
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

    function Async(target) {
        this.sender = $(target);
        this.validators = [];
    }
    Async.prototype = {
		Add: function (name, sender, args, callback) {
			if (name == 'IsAsync') {
				$.Validation.OnValid.fire(sender, args);
				this.validators.push({ callback: callback[name], sender: sender, args: args });
				return true;
			}
			return false;
		},
		CheckAsync: function () {
			if (typeof this.sender.data('isValid') !== 'undefined') {
				var isValid = this.sender.data('isValid');
				this.sender.removeData('isValid');
				return isValid;
			}
			return null;
		},
		Validate: function () {
			var self = this;
			if (this.validators.length > 0) {
				var callers = [];
				for (var i = 0; i < this.validators.length; i++) {
					var validator = this.validators[i];
					$.Validation.OnAsyncStart.fire(validator.sender, validator.args);
					callers.push(validator.callback(validator.sender, validator.args));
				}
				$.when.apply(this, callers).done(function () {
					var isValid = true;
					for (var i = 0; i < callers.length; i++) {
						var validator = self.validators[i];
						var argument = (callers.length == 1) ? arguments[i] : arguments[i][0];
						$.Validation.OnAsyncEnd.fire(validator.sender, validator.args);
						if (!argument.isValid) {
							isValid = false;
							validator.args.message = argument.message;
							$.Validation.OnInValid.fire(validator.sender, validator.args);
							delete validator.args.message;
						}
					}
					self.sender.data('isValid', isValid);
					self.sender.click();
				});
				return true;
			}
			return false;
		}
	};

    function Group() {
        var self = this;
		var callback = function(e) {
			return self.Validate.apply(self, [e]);
		};
        this._validators = {};
        this.OnBeforeValidation = $.Callbacks();
		this.CausesValidation = {
			Add: function (id) { $(id).on('click', callback); },
			Remove: function (id) { $(id).off('click', callback); }
		}
	}
    Group.prototype = {
		Clear: function () {
			for (var id in this._validators) {
				for (var name in this._validators[id]) {
					var sender = $(id);
					$.Validation.OnClear.fire(sender);
				}
			}
		},
		Validator: function (id) {
			return new $.Validation.Validators(id, this._validators);
		},
		Validate: function (e) {
			var isValid = true;
			var async = new Async(e.target);
			var check = async.CheckAsync();
			if (check != null) {
				return check;
			}
			this.OnBeforeValidation.fire();
			for (var id in this._validators) {
				for (var name in this._validators[id]) {
					var sender = $(id);
					var args = this._validators[id][name];
					if ((typeof args.dependency === 'function') && (!args.dependency())) {
						$.Validation.OnClear.fire(sender);
						continue;
					}
					if (async.Add(name, sender, args, Validators)) {
						continue;
					}
					if (!Validators[name](sender, args)) {
						isValid = false;
						$.Validation.OnInValid.fire(sender, args);
						break;
					} else {
						$.Validation.OnValid.fire(sender, args);
					}
				}
			}
			if ((isValid) && (async.Validate())) {
				return false;
			}
			return isValid;
		}
	};

    for (var property in Validators) {
        $.Validation.Add(property);
    }

} (jQuery));