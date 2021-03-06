﻿/*	
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

    var errorId = (sender.prop('id') || sender.prop('class')) + '_errorMessage';
    var errorMessage = $('#' + errorId);
    if (errorMessage.length == 0) {
        errorMessage = $('<span></span>');
        errorMessage.prop('id', errorId);
        errorMessage.prop('class', 'errormessage');
        if (sender.length > 1) {
            sender.last().after(errorMessage);
        } else {
            sender.after(errorMessage);
        }
    }
    errorMessage.html(message);
});

$.Validation.OnValid.add(function (sender, args) {
    var errorId = (sender.prop('id') || sender.prop('class')) + '_errorMessage';
    var errorMessage = $('#' + errorId);
    if (errorMessage.length == 1) {
        errorMessage.html('');
    }
});

$.Validation.OnAsyncStart.add(function (sender, args) {
    var message = '';
    if (typeof args !== 'undefined') {
        if (typeof args.message !== 'undefined') {
            message = args.message;
        }
    }
    var asyncId = (sender.prop('id') || sender.prop('class')) + '_asyncmessage';
    var asyncMessage = $('#' + asyncId);
    if (asyncMessage.length == 0) {
        asyncMessage = $('<span></span>');
        asyncMessage.prop('id', asyncId);
        asyncMessage.prop('class', 'asyncmessage');
        if (sender.length > 1) {
            sender.last().after(asyncMessage);
        } else {
            sender.after(asyncMessage);
        }
    }
    asyncMessage.html('<img src="Images/ajax-loader-small.gif" /> ' + message);
});

$.Validation.OnAsyncEnd.add(function (sender, args) {
    var asyncId = (sender.prop('id') || sender.prop('class')) + '_asyncmessage';
    var asyncMessage = $('#' + asyncId);
    if (asyncMessage.length == 1) {
        asyncMessage.html('');
    }
});

$.Validation.OnClear.add(function (sender) {
    $.Validation.OnValid.fire(sender);
});
