"use strict";

DXWorkout.Exercise = function(params) {
    var wo = DXWorkout,
        action = params.action,
        workout = ko.observable(),
        exercise = ko.observable(),
        title = ko.observable(""),
        commandsVisible = ko.observable(false),
        cancelCommands = [
            { text: "Cancel exercise", clickAction: cancelExercise },
            { text: "Cancel workout", clickAction: cancelWorkout }
        ];

    function handleCancel() {
        commandsVisible(true);
    }

    function cancelExercise() {
        commandsVisible(false);
        wo.app.navigate("List/select/exercise", { direction: 'backward' });
    };

    function cancelWorkout() {
        commandsVisible(false);
        wo.currentWorkout.cancelCurrentWorkout();
    };

    return {
        hideNavigationButton: true,

        title: title,
        workout: workout,
        exercise: exercise,
        cancelCommands: cancelCommands,
        commandsVisible: commandsVisible,

        handleCancel: handleCancel,
        backButtonDown: handleCancel,

        viewShowing: function(args) {
            var currentWorkout = wo.currentWorkout,
                currentExercise = currentWorkout.currentExercise(),
                exerciseCount = currentWorkout.exercises().length;

            workout(currentWorkout);
            exercise(currentExercise);
            title('#' + exerciseCount + ' ' + currentExercise.name());
            if(args.viewInfo.renderResult)
                args.viewInfo.renderResult.$markup.find(".dx-content > .dx-scrollable").data("dxScrollView").scrollTo(0);
        }
    };
}