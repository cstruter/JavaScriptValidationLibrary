<%@ Page Language="C#" %>

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
        $.Validation.Dependency('IsFemale', function () {
            return ($('#ddlGender').val() == 2);
        });
        $.Validation.Group('dependency', function (group) {
            group.CausesValidation.Add('#btnSubmit');
            group.Validator('#ddlGender').IsRequired();
            group.Validator('#txtFirstName').IsRequired();
            group.Validator('#txtLastName').IsRequired();
            group.Validator('#txtMaidenName').IsRequired({ dependency: 'IsFemale' });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="form-group">
        <label for="ddlGender">
            Gender</label>
        <select id="ddlGender" class="form-control" style="width: 150px">
            <option value=""></option>
            <option value="1">Male</option>
            <option value="2">Female</option>
        </select>
        <label for="txtFirstName">
            First Name</label>
        <input type="text" class="form-control" style="width: 200px" id="txtFirstName" />
        <label for="txtLastName">
            Last Name</label>
        <input type="text" class="form-control" style="width: 200px" id="txtLastName" />
        <label for="txtMaidenName">
            Maiden Name</label>
        <input type="text" class="form-control" style="width: 200px" id="txtMaidenName" />
    </div>
    <button type="submit" id="btnSubmit" class="btn btn-default">
        Submit</button>
    </form>
</body>
</html>
