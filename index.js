"use strict";

window.DXWorkout = {};

!function () {
    var wo = window.DXWorkout,
        app,
        currentBackAction,
        device = DevExpress.devices.current(),
        iosVersion = DevExpress.devices.iosVersion(),
        APP_SETTINGS = {
            namespace: wo,
            defaultLayout: "slideout",
            navigation: [
                {
                    "id": "Home",
                    "title": "Home",
                    "action": "#Home",
                    "icon": "home"
                },
                {
                    "id": "Logs",
                    "title": "Logs",
                    "action": "#Log",
                    "icon": "event"
                },
                {
                    "id": "Graphs",
                    "title": "Graphs",
                    "action": "#GoalGraphs",
                    "icon": "chart"
                },
                {
                    "id": "Settings",
                    "title": "Settings",
                    "action": "#Settings",
                    "icon": "card"
                }
            ]
        };

    $.extend(wo, {
        defaultSettings: {
            goal: ["Cardiovascular", "Flexibility", "Losing Fat", "Muscular Strength"],
            exercise: ["Back extension", "Bench press", "Bent-over row", "Biceps curl", "Calf raise", "Chest fly", "Chin-up", "Close-grip bench press", "Crunch",
                "Deadlift", "Dip", "Front raise", "Good-morning", "Handstand push-up", "Hyperextension", "Lateral raise", "Leg curl", "Leg extension", "Leg press",
                "Leg raise", "Lunge", "Machine fly", "Military press", "Pulldown", "Pullup", "Push-up", "Pushdown", "Rear delt raise", "Rowing at cable machine",
                "Seated row", "Shoulder press", "Shoulder shrug", "Sit-up", "Squat", "Supine row", "Triceps extension", "Upright row"],
            lengthUnit: "miles",
            weightUnit: "lbs"
        },

        hardwareBackButton: (device.phone && device.platform === "win8") || device.platform === "android",
        currentWorkout: null,

        formatTime: function(totalMinutes) {
            totalMinutes = Math.ceil(totalMinutes);

            var hours = Math.floor(totalMinutes / 60),
                mins = totalMinutes % 60;

            var bag = [];
            if(hours)
                bag.push(hours, "h");

            if(mins) {
                if(bag.length)
                    bag.push(" ");
                bag.push(mins, "m");
            }

            if(!bag.length)
                bag.push(0);

            return bag.join("");
        }
    });

    var subviewMap = {
        "Home": ["Exercise/*", "List/select/*", "Results"],
        "Settings": ["List/edit/*"],
        "GoalGraphs": ["WeightGraphs"]
    };

    function testUri(patterns, uri) {
        var pattern = [],
            regexp;

        $.each(patterns, function() {
            pattern.push(this.replace("/", "\\/").replace("*", ".+"));
        });

        regexp = new RegExp("^(" + pattern.join("|") + ")$");
        return regexp.test(uri);
    }

    function isWorkoutMaster(uri) {
        return testUri(subviewMap["Home"], uri);
    }

    function startApp() {
        var current = wo.getCurrentFromStorage();

        if(current && confirm("Do you want to continue workout in progress?")) {
            var workout = wo.createWorkoutViewModel();
            workout.fromJS(current);
            wo.currentWorkout = workout;
            wo.app.navigate("Results");
            return;
        }

        wo.removeCurrentWorkout();
        wo.app.navigate();
    }

    function onNavigate(args) {
        if(!args.currentUri)
            return;

        if(subviewMap[args.uri] && testUri(subviewMap[args.uri], args.currentUri) && args.options.location === "navigation") {
            args.cancel = true;
            return;
        }

        if(args.options.location === "navigation" && args.options.target !== "back" && isWorkoutMaster(args.currentUri) && !isWorkoutMaster(args.uri)) {
            if(!confirm("Cancel workout in progress?")) 
                args.cancel = true;
        }
    }

    function onViewShown(args) {
        var viewInfo = args.viewInfo;
        if (viewInfo.model.hideNavigationButton)
            viewInfo.renderResult.$markup.find(".nav-button-item").remove();

        currentBackAction = viewInfo.model.backButtonDown;
    }

    function onBackButton() {
        if(currentBackAction) {
            currentBackAction();
        } else {
            if(wo.app.canBack()) {
                wo.app.back();
            }
            else {
                if(confirm("Are you sure you want to exit?")) {
                    switch(device.platform) {
                        case "android":
                            navigator.app.exitApp();
                            break;
                        case "win8":
                            window.external.Notify("DevExpress.ExitApp");
                            break;
                    }
                }
            }
        }
    }

    function onDeviceReady() {
        document.addEventListener("backbutton", onBackButton, false);
        document.addEventListener("pause", wo.saveCurrentWorkout, false);
        navigator.splashscreen.hide();
    }

    $(function() {
        FastClick.attach(document.body);
        app = wo.app = new DevExpress.framework.html.HtmlApplication(APP_SETTINGS);
        app.router.register(":view/:action/:item", { view: "Home", action: undefined, item: undefined });
        wo.app.viewShown.add(onViewShown);
        wo.app.navigationManager.navigating.add(onNavigate);

        // enable iOS7 theme
        if(device.platform === "ios" && iosVersion && iosVersion[0] === 7) {
            $(".dx-viewport")
                .removeClass("dx-theme-ios")
                .addClass("dx-theme-ios7");
        }

        wo.initUserData();
        startApp();

        setTimeout(function() {
            document.addEventListener("deviceready", onDeviceReady, false);
            window.onunload = wo.saveCurrentWorkout;
        }, 1000);
    });

}();