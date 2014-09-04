/*	
    CSTruter JavaScript Validation Library version 1.0
    Author: Christoff Truter

    Date Created: 2013/10/08
    Date Modified: 2014/09/04

    e-Mail: christoff@cstruter.com
    Website: www.cstruter.com
    Copyright 2013, 2014 CSTruter	
*/

$.Validation.OnInValid.add(function (sender, args) {
    var message = '*';
    if (typeof args !== 'undefined') {
        if (typeof args.message !== 'undefined') {
            message = args.message;
        }
    }

    if (sender.length > 1) {
        sender = $(sender[sender.length - 1]);
    }

    sender.tooltip('destroy');
    sender.tooltip({ title: message, placement: 'right', trigger: 'manual' });
    sender.tooltip().removeClass('silver-tooltip');
    sender.tooltip().addClass('red-tooltip');
    sender.tooltip('show');
});

$.Validation.OnValid.add(function (sender, args) {
    sender.tooltip('hide');
});

$.Validation.OnAsyncStart.add(function (sender, args) {
    var message = '';
    if (typeof args !== 'undefined') {
        if (typeof args.message !== 'undefined') {
            message = args.message;
        }
    }

    if (sender.length > 1) {
        sender = $(sender[sender.length - 1]);
    }

    sender.tooltip('destroy');
    sender.tooltip({ title: '<img src="Images/ajax-loader-small.gif" /> ' + message, placement: 'right', trigger: 'manual', html: true });
    sender.tooltip().removeClass('red-tooltip');
    sender.tooltip().addClass('silver-tooltip');
    sender.tooltip('show');
});

$.Validation.OnAsyncEnd.add(function (sender, args) {
    sender.tooltip('hide');
});

$.Validation.OnClear.add(function (sender) {
    $.Validation.OnValid.fire(sender);
});
