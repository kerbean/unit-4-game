// const charObi = $("#owk");
// const charDarth = $("#dv");
$(document).ready(function () {
    const charClick = $(".characters");
    let charChosen = false;
    let phase = "choose-hero";
    let chosen = [];

    let charChew = {
        hp: "300",
        ap: "15",
        ca: "15",
    };
    let charOWK = {
        hp: "150",
        ap: "25",
        ca: "20",
    };
    let charDV = {
        hp: "200",
        ap: "20",
        ca: "20",
    };
    let charST = {
        hp: "150",
        ap: "25",
        ca: "30",
    };


    function restart() {
        phase = "choose-hero";
        charChosen = false;
        chosen = [];
    }

    window.onload = function () {
        //$("#lap").on("click", recordLap);

        $(".characters").on("click", charChoose);
        // charClick.on("click",charChoose);
    };


    function charChoose() {
        console.log("F:charChoose - START");
        if (phase == "choose-hero") {
            if (!charChosen && !chosen.includes($(this).val())) {
                charChosen = true;
                // $(this).fadeOut();
                $(this).fadeOut();
                // $(".character-set").fadeOut();
                // $(this).css("display","none");
                console.log("F:charChoose : this=" + $(this));
                removeChosen($(this), "attacker");
            }
        }
        else if (phase == "choose-enemy") {
            if (charChosen && !chosen.includes($(this).val())) {
                $(this).fadeOut();
                console.log("F:charChoose : this=" + $(this));
                removeChosen($(this), "defender");
            }
        }
    }

    function removeChosen(chosenval, position) {
        console.log("F:removeChosen - START");
        console.log(chosenval + " = " + position);
        chosen.push(chosenval.val());
        console.log(chosen);
        if (position == "attacker") {
            chosenval.detach().appendTo('#attacker');
            chosenval.prop('disable', true);
            chosenval.append("<h3>ATTACKER</h3>");
            $(".character-set").fadeIn();
            $("#status-text").text("CHOOSE YOUR ENEMY");
            showStats(chosenval.val(), "attacker");

            phase = "choose-enemy";
        }
        else if (position == "defender") {
            chosenval.detach().appendTo('#defender');
            chosenval.append("<h3>DEFENDER</h3>");
            $(".character-set").fadeIn();
            $("#status-text").text("BATTLE START!!!");
            showStats(chosenval.val(), "defender");
            phase = "battle-start";
            $("#battle-button").append('<button><img src="assets/images/battle.png"></button>');
        }
    }

    function atkButtsVis() {

    }

    function showStats(hero, position) {
        console.log("F:showStats : hero = " + hero);
        console.log("F:showStats : position = " + position);
        switch (hero) {
            case "chew":
                setStats(charChew, position);
                break;
            case "owk":
                console.log("F:showStats : showing hero stats");
                setStats(charOWK, position);
                break;
            case "dv":
                setStats(charDV, position);
                break;
            case "st":
                setStats(charST, position);
                break;

        }
    }

    function setStats(hero, position) {
        if (position == "attacker") {
            $("#atk-hp").text("HP : " + hero.hp);
            $("#atk-ap").text("AP : " + hero.ap);
            $("#atk-ca").text("CA : " + hero.ca);
        } else {
            $("#def-hp").text("HP : " + hero.hp);
            $("#def-ap").text("AP : " + hero.ap);
            $("#def-ca").text("CA : " + hero.ca);
        }
    }
});