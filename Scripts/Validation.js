/*	
    CSTruter JavaScript Validation Library version 1.0
    Author: Christoff Truter

    Date Created: 2013/10/08

    e-Mail: christoff@cstruter.com
    Website: www.cstruter.com
    Copyright 2013 CSTruter	
*/

var Validation = {
    Dependencies: {
    },
    Dependency: function (name, predicate) {
        this.Dependencies[name] = predicate;
    },
    Group: function (name, codeblock) {
        if (typeof codeblock === 'undefined') {
            return this._Groups[name];
        }
        var group = new this._Group();
        this._Groups[name] = group;
        $(function () {
            codeblock(group);
        });
    },
    _Groups: {
    },
    _Group: function () {
        var self = this;
        var validators = {
        };

        this.Clear = function () {
            for (var id in validators) {
                for (var name in validators[id]) {
                    var sender = $(id);
                    Validation.Clear(sender);
                }
            }
        }

        this.OnBeforeValidation = function () { }

        function ValidateAsync(target) {
            this.button = $(target);
            this.validators = [];
            this.Add = function (name, sender, args, callback) {
                if (name == 'IsAsync') {
                    Validation.OnValid(sender, args);
                    this.validators.push({ callback: callback[name], sender: sender, args: args });
                    return true;
                }
                return false;
            }
            this.CheckAsync = function () {
                if (typeof this.button.data('isValid') !== 'undefined') {
                    var isValid = this.button.data('isValid');
                    this.button.removeData('isValid');
                    return isValid;
                }
                return null;
            }
            this.Validate = function () {
                var self = this;
                if (this.validators.length > 0) {
                    var callers = [];
                    for (var i = 0; i < this.validators.length; i++) {
                        var validator = this.validators[i];
                        Validation.OnAsyncStart(validator.sender, validator.args);
                        callers.push(validator.callback(validator.sender, validator.args));
                    }
                    $.when.apply(this, callers).done(function () {
                        var isValid = true;
                        for (var i = 0; i < callers.length; i++) {
                            var validator = self.validators[i];
                            var argument = (callers.length == 1) ? arguments[i] : arguments[i][0];
                            Validation.OnAsyncEnd(validator.sender, validator.args);
                            if (!argument.isValid) {
                                isValid = false;
                                validator.args.message = argument.message;
                                Validation.OnInValid(validator.sender, validator.args);
                                delete validator.args.message;
                            }
                        }
                        self.button.data('isValid', isValid);
                        self.button.click();
                    });
                    return true;
                }
                return false;
            }
        }

        this.Validate = function (e) {
            var isValid = true;
            var async = new ValidateAsync(e.target);
            var check = async.CheckAsync();
            if (check != null) {
                return check;
            }
            self.OnBeforeValidation();
            for (var id in validators) {
                for (var name in validators[id]) {
                    var sender = $(id);
                    var args = validators[id][name];
                    if ((typeof args.dependency !== 'undefined') &&
						(!Validation.Dependencies[args.dependency]())) {
                        Validation.Clear(sender);
                        continue;
                    }
                    var callback = (sender.length == 1) ? Validators : ChainValidators;
                    if (async.Add(name, sender, args, callback)) {
                        continue;
                    }
                    if (!callback[name](sender, args)) {
                        isValid = false;
                        Validation.OnInValid(sender, args);
                        break;
                    } else {
                        Validation.OnValid(sender, args);
                    }
                }
            }
            if ((isValid) && (async.Validate())) {
                return false;
            }
            return isValid;
        }

        this.CausesValidation = {
            Add: function (id) { $(id).on('click', self.Validate); },
            Remove: function (id) { $(id).off('click', self.Validate); }
        };

        this.Validator = function (id) {
            if ($(id).length == 1) {
                return new Validation.Validators(id, validators);
            } else if ($(id).length > 1) {
                return new Validation.ChainValidators(id, validators);
            }
        };
    },
    Inherit: function (name) {
        this[name] = function (id, validators) {
            this.id = id;
            this.validators = validators;
            this.Remove = function (validator) {
                if (typeof validators[id] === 'undefined') {
                    delete validators[id][validator];
                }
            }
        }
        for (var property in window[name]) {
            this[name].prototype[property] = function (property) {
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
        }
    },
    OnAsyncStart: function (sender, args) { throw 'Validation.OnAsyncStart not implemented'; },
    OnAsyncEnd: function (sender, args) { throw 'Validation.OnAsyncEnd not implemented'; },
    OnInValid: function (sender, args) { throw 'Validation.OnInValid not implemented'; },
    OnValid: function (sender, args) { throw 'Validation.OnValid not implemented'; },
    Clear: function (sender) { throw 'Validation.Clear not implemented'; }
};
