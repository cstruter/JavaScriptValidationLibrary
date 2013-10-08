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
    <script type="text/javascript" src="Scripts/Validation.Validators.js"></script>
    <script type="text/javascript" src="Scripts/Validation.Display.Bootstrap.js"></script>
    <script type="text/javascript">
        Validation.Group('simple', function (group) {
            group.CausesValidation.Add('#btnSubmit');
            group.Validator('#txtEmail').IsRequired();
            group.Validator('#txtEmail').IsEmail({ message: 'Incorrect Email Format' });
            group.Validator('#txtPassword').IsRequired();
            group.Validator('#txtPassword').IsRegEx({
                pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message: 'Password needs to be at least 6-16 characters long, contain at least one number and special character'
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="form-group">
        <label for="txtEmail">
            Email address</label>
        <input type="text" class="form-control" style="width: 200px" id="txtEmail" />
        <label for="txtPassword">
            Password</label>
        <input type="password" class="form-control" style="width: 200px" id="txtPassword" />
    </div>
    <button type="submit" id="btnSubmit" class="btn btn-default">
        Submit</button>
    </form>
</body>
</html>
