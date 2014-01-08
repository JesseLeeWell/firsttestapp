"use strict";

DXWorkout.Log = function (params) {
    var log = ko.computed(function() {
        var workouts = DXWorkout.workouts();
        workouts.sort(function(i, j) {
            return new Date(j.startDate) - new Date(i.startDate);
        });

        var grouped = {},
            result = [];

        $.each(workouts, function() {
            var key = Globalize.format(new Date(this.startDate), "MMM yyyy");
            if (!grouped[key])
                grouped[key] = [];
            grouped[key].push(this);
        });

        $.each(grouped, function(key, value) {
            result.push({ key: key, items: value });
        });

        return result;
    });

    function handleItemClick(e) {
        DXWorkout.app.navigate("Results/show/" + e.itemData.id);
    };

    return {
        log: log,
        handleItemClick: handleItemClick
    };
};