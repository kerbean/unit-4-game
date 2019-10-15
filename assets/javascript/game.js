// const charObi = $("#owk");
// const charDarth = $("#dv");
const charClick = $(".characters");
let charChosen = false;

function restart(){

}

window.onload = function () {
    //$("#lap").on("click", recordLap);
    
    $(".characters").on("click",charChoose);
    // charClick.on("click",charChoose);
  };


function charChoose(){
    console.log("F:charChoose - START");
    if(charChosen){
        
    }else{
        charChosen = true;
        // $(this).fadeOut();
        $(this).fadeOut();
        // $(".character-set").fadeOut();
        // $(this).css("display","none");
        removeChosen($(this),$(this).attr('id'));
    }
}

function removeChosen(chosenval,chosenid){
    console.log(chosenval + " " + chosenid);
    chosenval.detach().appendTo('#attacker');
    $(".character-set").fadeIn();

}