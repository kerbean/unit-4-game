// const charObi = $("#owk");
// const charDarth = $("#dv");
$(document).ready(function () {
    const charClick = $(".characters");
    let charChosen = false;
    let phase = "choose-hero";
    let chosen = [];
    let atkHero = "";
    let defHero = "";

    let charChew = {
        hp: 300,
        ap: 15,
        ca: 15,
    };
    let charOWK = {
        hp: 150,
        ap: 25,
        ca: 20,
    };
    let charDV = {
        hp: 200,
        ap: 20,
        ca: 20,
    };
    let charST = {
        hp: 150,
        ap: 25,
        ca: 30,
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
        $("#battle-button").on("click", attack);
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
            atkHero = hero;
            $("#atk-hp").text("HP : " + hero.hp);
            $("#atk-ap").text("AP : " + hero.ap);
            $("#atk-ca").text("CA : " + hero.ca);
        } else {
            defHero = hero;
            $("#def-hp").text("HP : " + hero.hp);
            $("#def-ap").text("AP : " + hero.ap);
            $("#def-ca").text("CA : " + hero.ca);
        }
    }

    function attack() {
        console.log("F:attack - START");
        console.log("F:attack - defHero.hp = " + defHero.hp);
        console.log("F:attack - atkHero.ap = " + atkHero.ap);
        if (defHero.hp > 0 && atkHero.hp > 0) {
            defHero.hp -= atkHero.ap;
            atkHero.hp -= defHero.ca;
            $("#atk-hp").text("HP : " + atkHero.hp);
            $("#def-hp").text("HP : " + defHero.hp);
            if (atkHero.hp <= 0) {
                $(".alert").addClass('show');
                $("#alertwin").text("YOUR HEALTH IS EXHAUSTED. YOU LOSE!!");
                setInterval(removeAlert, 5000);
            }
            else if(defHero.hp <= 0){
                $(".alert").addClass('show');
                $("#alertwin").text("YOU WIN!! CHOOSE YOUR NEXT OPPONENT!!");
                setInterval(removeAlert, 5000);
            }
        }
        atkHero.ap += 15;
        $("#atk-ap").text("AP : " + atkHero.ap);
    }

    function removeAlert() {
        $(".alert").removeClass('show');
    }
});