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
        Validation.Group('add', function (group) {
            group.CausesValidation.Add('#btnSubmit');
            group.Validator('.box1').IsChecked({ exact: 2, message: 'Tick only two of these boxes' });
            group.Validator('.box2').IsChecked({ min: 1, message: 'Tick at least one of these boxes' });
            group.Validator('.box3').IsChecked({ max: 2, message: 'Tick a maximum of two of these boxes' });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="form-group">
        <input type="checkbox" class="box1" />
        <input type="checkbox" class="box1" />
        <input type="checkbox" class="box1" />
        <br />
        <input type="checkbox" class="box2" />
        <input type="checkbox" class="box2" />
        <input type="checkbox" class="box2" />
        <br />
        <input type="checkbox" class="box3" />
        <input type="checkbox" class="box3" />
        <input type="checkbox" class="box3" />
        <br />
    </div>
    <button type="submit" id="btnSubmit" class="btn btn-default">
        Submit</button>
    </form>
</body>
</html>
