"use strict";

DXWorkout.Results = function(params) {
    var wo = DXWorkout,
        id = params.item,
        workout = ko.observable();

    return {
        hideNavigationButton: !id,
        workout: workout,

        viewShowing: function(args) {
            workout(id ? wo.getWorkoutById(id) : wo.currentWorkout);
            if(args.viewInfo.renderResult)
                args.viewInfo.renderResult.$markup.find(".dx-content > .dx-scrollable").data("dxScrollView").scrollTo(0);
        }
    };
}