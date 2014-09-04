﻿<%@ Page Language="C#" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
        rel="Stylesheet" />
    <link href="Styles/Bootstrap.Custom.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="Scripts/Validation.js"></script>
    <script type="text/javascript" src="Scripts/Validation.Display.Bootstrap.js"></script>
    <script type="text/javascript">
        $.Validation.Group('add', function (group) {
            group.OnBeforeValidation.add(function () {
                $.Validation.Group('edit').Clear();
            });
            group.CausesValidation.Add('#btnAdd');
            group.Validator('#txtDescription').IsRequired();
            group.Validator('#txtNote').IsRequired();
        });
        $.Validation.Group('edit', function (group) {
            group.OnBeforeValidation.add(function () {
                $.Validation.Group('add').Clear();
            });
            group.CausesValidation.Add('#btnEdit');
            group.Validator('#txtDescription').IsRequired();
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="form-group">
        <label for="txtDescription">
            Description</label>
        <input type="text" class="form-control" style="width: 200px" id="txtDescription" />
        <label for="txtNote">
            Note</label>
        <textarea class="form-control" style="width:250px" rows="5" id="txtNote"></textarea>
    </div>
    <button type="submit" id="btnAdd" class="btn btn-primary">
        Add</button>
    <button type="submit" id="btnEdit" class="btn btn-success">
        Edit</button>
    </form>
</body>
</html>
