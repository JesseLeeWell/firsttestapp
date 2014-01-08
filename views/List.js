DXWorkout.List = function (params) {
    var action = params.action,
        key = params.item,
        wo = DXWorkout,
        searchQuery = ko.observable(""),
        title,
        titleBag = [],
        newValue = ko.observable(""),
        keySettings = ko.observableArray(),
        emptyValue = "Enter new " + key + "...",
        isEdit = action === "edit",
        canDelete;

    titleBag = [
        isEdit ? "Edit" : "Select", " ",
        capitalize(key),
        isEdit ? "s" : ""
    ];
    title = titleBag.join("");

    function capitalize(text) {
        return text.substr(0, 1).toUpperCase() + text.substr(1);
    }

    function showToast(message) {
        DevExpress.ui.notify({ message: message, displayTime: 5000, position: { of: '.dx-viewport .layout-content' } });
    }

    function handleDeleteClick(e) {
        var message = "\"" + e.model + "\" was deleted";
        keySettings.splice(keySettings.indexOf(e.model), 1);
        DXWorkout.saveSettings(key, keySettings());

        showToast(message);
    }

    function handleAddClick() {
        var added = false,
            formattedNewValue = $.trim(newValue());
        newValue("");
        if(formattedNewValue) {
            var message = "\"" + formattedNewValue + "\" was added";
            $.each(keySettings(), function(key, value) {
                if(value.toLowerCase() === formattedNewValue.toLowerCase()) {
                    added = true;
                    return false;
                }
            });
            if(!added) {
                keySettings.push(formattedNewValue);
                keySettings.sort();
            }

            DXWorkout.saveSettings(key, keySettings());
            showToast(message);
        }
    }

    function handleItemClick(e) {
        var workout = wo.currentWorkout;
        if(!isEdit) {
            switch(key) {
                case "goal":
                    workout.goal(e.itemData);
                    workout.handleAddExercise();
                    break;
                case "exercise":
                    workout.currentExercise().name(e.itemData);
                    wo.app.navigate("Exercise/add", { direction: "forward" });
                    break;
            }
        }
    };

    function handleCancel() {
        var workout = wo.currentWorkout;
        if(isEdit) {
            wo.app.back();
        } else {
            switch(key) {
                case "goal":
                    workout.cancelCurrentWorkout();
                    break;
                case "exercise":
                    workout.exercises.pop();
                    var url = workout.currentExercise() ? "Exercise/add" : "List/select/goal";
                    wo.app.navigate(url, { direction: 'backward' });
                    break;
            }
        }
    };

    searchQuery.subscribe(function(value) {
        var result = $.grep(wo.settings[key], function(product, index) {
            var regExp = new RegExp(value, "i");
            return !!product.match(regExp);
        });
        keySettings(result);
    });

    canDelete = ko.computed(function() {
        return isEdit && keySettings().length > 1;
    });

    return {
        hideNavigationButton: !isEdit,
        isEdit: isEdit,
        canDelete: canDelete,

        keySettings: keySettings,
        title: title,
        newValue: newValue,
        emptyValue: emptyValue,
        searchQuery: searchQuery,

        handleDeleteClick: handleDeleteClick,
        handleAddClick: handleAddClick,
        handleItemClick: handleItemClick,
        handleCancel: handleCancel,

        viewShowing: function(args) {
            keySettings(wo.settings[key]);
            searchQuery("");
            newValue("");
            if(args.viewInfo.renderResult)
                args.viewInfo.renderResult.$markup.find(".dx-content > .dx-scrollable").data("dxScrollView").scrollTo(0);    
        },

        viewShown: function() {
            if(!isEdit && key === "exercise") 
                wo.currentWorkout.clearCurrentExercise();
        },

        backButtonDown: handleCancel
    };
};