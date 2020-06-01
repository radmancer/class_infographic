/////////////////////////////////////////////////////////////////
// functions                                                   //
/////////////////////////////////////////////////////////////////
function femaleSymbolAnimation(){
    toggleVisibility(crossVertical);
    animate(nudgeDown, crossVertical, 4.00, 0.1, 5, true);
    sleep(toggleVisibility, crossHorizontal, 100, 100);
}
function maleSymbolAnimation(){
    toggleVisibility(arrowShaft);
    animate(nudgeUp, arrowShaft, 3.2, 0.1, 5, true);
    sleep(toggleVisibility, arrowHead, 100, 100);
}
function maleStatsAnimation(){
    showHideStats(maleFemaleData, "male");
}
function femaleStatsAnimation(){
    showHideStats(maleFemaleData, "female");
}
function goldenNumberAnimation(){
    animate(enhanceStroke, goldenOutlineOn2, 6, 0.1, 5, true);
    animate(enhanceStroke, goldenOutlineOn0, 6, 0.1, 5, true);
}
function goldenNumberBarAnimation(){
    toggleVisibility(goldenBracket);
    toggleVisibility(cohortButterBar);
    animate(enhanceStroke, goldenBracket, 3, 0.1, 5, true);
}
function goldenNumberStatsAnimation(){
    showHideStats(maleFemaleData, "cohort");
}
function dashedLineAnimation(){
    toggleVisibility(dashedLine);
}
function dashedLineStatsAnimation(){
    showHideStats(maleFemaleData, "alumni");
}
function numberMaskAnimation(){
    toggleVisibility(logoNumberMasks[0]);
    toggleVisibility(logoNumberMasks[3]);
}
function topBarAnimation(){
    toggleVisibility(topBar);
    var topBarDistance = 0.5;   //pixels
    var topBarGoalDistance = 5; //pixels
    var topBarTime = 15;        //milliseconds
    animateWithAcceleration(expand, topBar, topBarRange, topBarDistance, topBarGoalDistance, topBarTime, false);
}
function topBarStatsAnimation(){
    for(var i = 0; i < 3; i++){
        toggleVisibility(healthcareStats[i]);
    }
}
function mediumBarAnimation(){
    toggleVisibility(mediumBar);
    var mediumBarDistance = 0.5;   //pixels
    var mediumBarGoalDistance = 5; //pixels
    var mediumBarTime = 15;        //milliseconds
    animateWithAcceleration(expand, mediumBar, mediumBarRange, mediumBarDistance, mediumBarGoalDistance, mediumBarTime, false);
}
function mediumBarStatsAnimation(){
    toggleVisibility(academiaOne);
    toggleVisibility(academiaFive);
    toggleVisibility(academiaPercent);
}
function bottomBarAnimation(){
    toggleVisibility(bottomBar);
    var bottomBarDistance = 0.5;   //pixels
    var bottomBarGoalDistance = 5; //pixels
    var bottomBarTime = 15;        //milliseconds
    animateWithAcceleration(expand, bottomBar, bottomBarRange, bottomBarDistance, bottomBarGoalDistance, bottomBarTime, false);
}
function bottomBarStatsAnimation(){
    toggleVisibility(publicHealthOne);
    toggleVisibility(publicHealthFive);
    toggleVisibility(publicHealthPercent);
}
function rangeCalc(totalTime, rateOfChange, wait){
  console.log("range: " + (rateOfChange * totalTime) / wait);
}
function waitTimeCalc(totalTime, range, rateOfChange){
  console.log("waitTime: " + (totalTime * rateOfChange) / range);
}
function rateOfChangeCalc(totalTime, range, wait){
  console.log("rateOfChange: " + (range * wait) / totalTime);
}
function totalTimeCalc(range, rateOfChange, wait){
  var totalTime = (range / rateOfChange) * wait;
  console.log("=============\ntotalTime: " + totalTime);
  return totalTime;
}
function sleep(sleepFunction, element, range, wait){
    var i = 0.00;
    (function loop () {
        setTimeout(function () {
            if (i < range) {          // If i > 0, keep going
                i = i + wait;
                loop();       // Call the loop again, and pass it the current value of i
            }
            else{
              sleepFunction(element);
            }
        }, wait);
    })(1);
}
function convertMillisecondsToSeconds(time){
    return time * 0.001;
}
function calculateVelocity(distance, time){
    return distance / convertMillisecondsToSeconds(time);
}
function animate(animationFunction, element, range, rateOfChange, wait, mute){
    if(mute == false){
      TOTAL_TIME = totalTimeCalc(range, rateOfChange, wait);
      rateOfChangeCalc(TOTAL_TIME, range, wait);
      waitTimeCalc(TOTAL_TIME, range, rateOfChange);
      rangeCalc(TOTAL_TIME, rateOfChange, wait);
    }

    var i = 0.00;
    (function loop () {
        animationFunction(element, i);
        setTimeout(function () {
            if (i < range) {          // If i > 0, keep going
                i = i + rateOfChange;
                loop();       // Call the loop again, and pass it the current value of i
            }
        }, wait);
    })(1);
}
function animateWithAcceleration(helperFunction, element, range, distance, goalDistance, time, mute){
    var i = 0;
    var acceleration = (goalDistance - distance) / time;
    var tempAcceleration = acceleration;
    (function loop () {
        helperFunction(element, i);
        setTimeout(function () {
            if (i < range) {
                if(i < range / 2){
                    i = i + distance + tempAcceleration;
                    tempAcceleration += acceleration;
                }
                else if(i >= range / 2){
                    tempAcceleration -= acceleration;
                    i = i + distance + tempAcceleration;
                }
                loop();
            }
        }, time);
    })(1);
}
function enhanceStroke(element, i){
    element.setAttribute("stroke-width", i);
}
function expand(element, i){
    element.setAttribute("width", i);
}
function nudgeUp(element, i) {
    var value = parseFloat(element.getAttribute("y"), 10);
    element.setAttribute("y", value - i);
}
function nudgeDown(element, i) {
    var value = parseFloat(element.getAttribute("y"), 10);
    element.setAttribute("y", value + i);
}
function nudgeLeft(element, i) {
    var value = parseFloat(element.getAttribute("x"), 10);
    element.setAttribute("x", value - i);
}
function nudgeRight(element, i) {
    var value = parseFloat(element.getAttribute("x"), 10);
    element.setAttribute("x", value + i);
}
function showHide(element){
    if(element.style.display == "none"){
      element.style.display = "block";
    }
    else{
      element.style.display = "none";
    }
}
function toggleVisibility(element){
    if(element.style.display == "block" || element.style.display == "" || element.style.display == null){
        element.style.display = "none";
    }
    else if(element.style.display == "none"){
        element.style.display = "block";
    }
}
function showHideStats(dataArray, maleFemaleFlag){
    if(maleFemaleFlag == "female"){
        for(var i = 45; i <= 53; i++){ toggleVisibility(dataArray[i]); }
        toggleVisibility(femaleButterBar);
    }
    else if(maleFemaleFlag == "male"){
        for(var i = 54; i <= 60; i++){ toggleVisibility(dataArray[i]); }
        toggleVisibility(maleButterBar);
    }
    else if(maleFemaleFlag == "cohort"){
        for(var i = 61; i <= 100; i++){ toggleVisibility(dataArray[i]); }
    }
    else{
        for(var i = 101; i <= 116; i++){ toggleVisibility(dataArray[i]); }
    }
}
function hideAllGraphics(){
    //hide bar graph.
    toggleVisibility(topBar);
    toggleVisibility(mediumBar);
    toggleVisibility(bottomBar);

    //hide symbol ends.
    toggleVisibility(crossHorizontal);
    toggleVisibility(arrowHead);

    //hide remaining symbol parts.
    animate(nudgeUp, crossVertical, 4.00, 0.1, 5, true);
    animate(nudgeDown, arrowShaft, 3.1, 0.1, 5, true);
    toggleVisibility(crossVertical);
    toggleVisibility(arrowShaft);

    //-------------------------------------------------------------//
    //hide student symbol stats.                                    //
    //-------------------------------------------------------------//
    //hide female stats.
    showHideStats(maleFemaleData, "female");

    //hide male stats.
    showHideStats(maleFemaleData, "male");

    //hide cohort stats.
    showHideStats(maleFemaleData, "cohort");

    //hide alumni stats.
    showHideStats(maleFemaleData, "alumni");

    //hide golden bracket.
    goldenBracket.setAttribute("stroke-width", "0px");
    toggleVisibility(goldenBracket);
    toggleVisibility(cohortButterBar);

    //hide all the logo number masks.
    for(var i = 0; i < logoNumberMasks.length; i++){ toggleVisibility(logoNumberMasks[i]); }
    toggleVisibility(dashedLine);

    //compress stroke width of the logo's second 20.
    goldenOutlineOn2.setAttribute("stroke-width", "0px");
    goldenOutlineOn0.setAttribute("stroke-width", "0px");

    //healthcare stats.
    for(var i = 0; i < 3; i++){
        toggleVisibility(healthcareStats[i]);
    }

    //Hide all academia bar stats.
    mediumBarStatsAnimation();

    //Hide all public health bar stats.
    bottomBarStatsAnimation();
}