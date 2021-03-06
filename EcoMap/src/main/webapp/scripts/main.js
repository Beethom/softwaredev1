$(document).ready(function()
{
    // If window is resized
    $(window).resize(function()
    {
        // Prevent mobile responsive glitch
        if($(window).width() >= 768)
        {
            $("#filter").hide();
        }
    });

    // Filter - Options Pressed
    $(".options").on("click", function(event)
    {
        $(this).find("img").toggleClass("grayscale");

        // Loop through all markers on map
        for(i = 0; i <= globalMarkers.length - 1; i++)
        {
            // Set up should hide variable
            var shouldHide = false;

            // Loop through all options
            $(".options").each(function()
            {
                // If option is checked
                if($(this).find("img").hasClass("grayscale"))
                {
                    // If the option value matches the marker type
                    if($(this).attr("value") == globalMarkers[i].attr.dbType)
                    {
                        // Don't hide
                        shouldHide = true;
                    }
                }
            });

            // If should hide is true
            if(shouldHide)
            {
                // Hide
                globalMarkers[i].visible = false;
            }
            else
            {
                // Show
                globalMarkers[i].visible = true;
            }
        }
    });

    // List View - Filter Events
    $("#showEvents").on("click", function(event)
    {
        $("#listViewMessage").text("");
        $("[name=eventList]").show();
        $("[name=locationList]").hide();

        // Show message if none
        if($("[name=eventList]").length == 0)
        {
            $("#listViewMessage").text("Nothing to show.");
        }
    });

    // List View - Filter Locations
    $("#showLocations").on("click", function(event)
    {
        $("#listViewMessage").text("");
        $("[name=locationList]").show();
        $("[name=eventList]").hide();

        // Show message if none
        if($("[name=locationList]").length == 0)
        {
            $("#listViewMessage").text("Nothing to show.");
        }
    });

    // List View - Filter All
    $("#showAll").on("click", function(event)
    {
        $("#listViewMessage").text("");
        $("[name=eventList]").show();
        $("[name=locationList]").show();

        // Show message if none
        if($("[name=locationList]").length == 0 && $("[name=eventList]").length == 0)
        {
            $("#listViewMessage").text("Nothing to show.");
        }
    });

    // Change View Button
    $("[name=viewChange]").on("click", function(event)
    {
        // If hidden
        if($("#listView").is(":hidden"))
        {
            // Show
            $("#listView").show();
            $("#mapView").hide();

            // Show message if none
            if($("[name=locationList]").length == 0 && $("[name=eventList]").length == 0)
            {
                $("#listViewMessage").text("Nothing to show.");
            }
        }
        else
        {
            // Hide
            $("#listView").hide();
            $("#mapView").show();
        }
    });

    // If date picker (first option) is changed
    $("#datepicker").on("change", function()
    {
        // Loop through all markers on map
        for(i = 0; i <= globalMarkers.length - 1; i++)
        {
            // Set up should hide variable
            var shouldHide = true;

            // If the option value matches the marker type
            // Allow other locations to stay on map
            if($(this).val() == globalMarkers[i].attr.dateStart.split(" ")[0] || globalMarkers[i].attr.dateStart == "null")
            {
                // Don't hide
                shouldHide = false;
            }

            // If should hide is true
            if(shouldHide)
            {
                // Hide
                globalMarkers[i].visible = false;
            }
            else
            {
                // Show
                globalMarkers[i].visible = true;
            }
        }
    });

    // If date picker (first option) is changed
    $("#dateStart, #dateStartEdit").on("change", function()
    {
        // Only allow one day option
        $("#dateEnd, #dateEndEdit").datetimepicker("option", "minDate", $(this).val());
        $("#dateEnd, #dateEndEdit").datetimepicker("option", "maxDate", $(this).val());
    });

    // If edit an event is pressed
    $("input[name=eventEdit]").click(function()
    {
        // If no
        if($("input[name=eventEdit]:checked").val() == 0)
        {
            // Hide
            $("#eventDatesEdit").hide();

            // Set null fields
            $("#dateStartEdit").val("");
            $("#dateEndEdit").val("");
        }
        else
        {
            // Show
            $("#eventDatesEdit").show();
        }
    });

    // If add an event is pressed
    $("input[name=event]").click(function()
    {
        // If no
        if($("input[name=event]:checked").val() == 0)
        {
            // Hide
            $("#eventDates").hide();

            // Set null fields
            $("#dateStart").val("");
            $("#dateEnd").val("");
        }
        else
        {
            // Show
            $("#eventDates").show();
        }
    });

    // Click events link
    $("[name=openCalendar]").click(function()
    {
        // If mobile
        if($(this).attr("type") == "mobile")
        {
            // Move datepicker near filter button
            $("#datepicker").css({left: 90, top: 120, position: 'relative'});
        }
        else
        {
            // Move datepicker near filter button
            $("#datepicker").css({right: 0, bottom: 70, position: 'absolute'});
        }

        $("#datepicker").datepicker("show");
    });

    // Click filter menu button
    $("[name=openFilter],[name=closeFilter]").click(function(e)
    {
        // Prevent default action
        e.preventDefault();

        // If visible
        if($("#filter").is(":visible"))
        {
            // Hide
            $("#filter").hide();
        }
        else
        {
            // Show
            $("#filter").show();
        }
    });
});