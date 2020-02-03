
var currentTime = new Date()
var currentHour = currentTime.getHours()
var currentDate = currentTime.getDate()
var currentWeekDay = currentTime.getDay()
var currentMonth = currentTime.getMonth()
var currentYear = currentTime.getUTCFullYear()
var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var daysInMonthArr = [31,28,31,30,31,30,31,31,30,31,30,31]
var weekDayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var dayHourArr = ["9AM","10AM","11AM", "12PM", "1PM", "2PM", "3PM", "4PM"]
var storeDateData = getSelectDate(currentDate)

displaySetup(currentDate)
calendarSetup()
pageSetup()

// ************************************* ON CLICK EVENTS *****************************

//add eventlistener to all the cells in the calendar: highlight when selected and go to the date's schedule
$(document).on("click", ".tbcol", function(){
    $(".tbcol").removeClass("highlight")
    $(this).addClass("highlight") 
    if($(this).children().text() === ""){
        storeDateData = getSelectDate($(this).text())
        displaySetup($(this).text())
    }else{
    storeDateData = getSelectDate($(this).text().substring(0, $(this).text().indexOf($(this).children().text())))
    displaySetup($(this).text().substring(0, $(this).text().indexOf($(this).children().text()))  )
    }
    pageSetup()
})

//when save button clicked, saves the input into local storage for that specific date and time
$(document).on("click", ".saveButton", function(){
    localStorage.setItem(storeDateData + $(this).siblings(".timeSec").text(), $(this).siblings(".inputSec").text())
    localStorage.getItem(storeDateData + $(this).siblings(".timeSec").text())
    calendarSetup()
})

//clears the localstorage on all saved events
$("#clear").on("click", function(){
    localStorage.clear()
    pageSetup()
    calendarSetup()
})

//goes to the previous month 
$("#prevMonth").on("click", function(){
    if(currentMonth === 0){
        currentYear--
        currentMonth = 11
        displaySetup(currentDate)
        calendarSetup()
    }else{
    currentMonth --
    displaySetup(currentDate)
    calendarSetup()
}
})

//goes to the next month
$("#nextMonth").on("click", function(){
    if(currentMonth === 11){
        currentYear++
        currentMonth = 0
        displaySetup(currentDate)
        calendarSetup()
    }else {
    currentMonth ++
    displaySetup(currentDate)
    calendarSetup()
}
})

//show/hide calendar
$("#displayCalendar").on("click", function(){
    if($(this).text() === "Show Calendar"){
        $("#currentMonth").show()
        $("#month").show()
        $(this).text("Hide Calendar")
    }else{
        $("#currentMonth").hide()
        $("#month").hide()
        $(this).text("Show Calendar")
    }
})

// ********************************* FUNCTIONS Start here! *************************************

//function that returns mdyyyy string (used to tag for localstorage)
function getSelectDate(date){
    return currentMonth.toString() + date + currentYear.toString()
}

//sets up the page by grabbing the local storage and display saved plans
function pageSetup(){
    $(".inputSec").each(function(){
        $(this).text(localStorage.getItem(storeDateData+ $(this).siblings(".timeSec").text()))
            if($(this).val() > currentTime.getHours()){
                $(this).addClass("future")
            }else if($(this).val() < currentTime.getHours()){
                $(this).addClass("past")
            }else{
                $(this).addClass("now")
            }
        }
    )
}

//make the calendar and show current month
function calendarSetup(monthDis, year){
    if(monthDis === null){
        monthDis = currentMonth
    }
    if(year === null){
        year = currentYear
    }

    $("#month").empty()
    
    if(currentYear%4 === 0){
        daysInMonthArr[1] = 29
    }
    var firstOfMonth = new Date(monthArr[currentMonth]+ " 1," + currentYear + " 10:01:01")
    var tempWeekNum = firstOfMonth.getDay()
    var weekdayCounter = tempWeekNum
    var dayOfMonthCounter = 1
            var newTbRow = $("<tr class = 'tbhead'>")
            $("#month").append(newTbRow)

        for (i=0; i<weekDayArr.length;i++){
            var newTbCol = $("<th class = 'tbhead'>")
                newTbCol.text(weekDayArr[i])
            newTbRow.append(newTbCol)
        }
            var newTbRow = $("<tr class = 'tbrow'>")
            $("#month").append(newTbRow)
        for (i=0; i<weekdayCounter; i++){
            var newTbCol = $("<td class = 'emptyCol'>")
                newTbCol.text("")
            newTbRow.append(newTbCol)
        }
        for (i=0; i<daysInMonthArr[currentMonth]; i++){
                var newTbCol = $("<td class = 'tbcol'>")
                    newTbCol.text(dayOfMonthCounter)
                newTbRow.append(newTbCol)
                var str = getSelectDate(dayOfMonthCounter)
                var finalStr = ""
                for (z=0; z < dayHourArr.length;z++){
                    if(localStorage.getItem(str + dayHourArr[z]) === null){
                    }else{
                    finalStr = dayHourArr[z] + " " + localStorage.getItem(str + dayHourArr[z])
                    var dailySch = $("<p class = 'sche'>")
                    dailySch.text(finalStr)
                    newTbCol.append(dailySch)
                }
                }
                if(dayOfMonthCounter === currentDate & currentMonth === currentTime.getMonth()){
                    newTbCol.addClass("highlight")
                }
                dayOfMonthCounter++
                weekdayCounter ++
                    if(weekdayCounter > 6 & i<daysInMonthArr[currentMonth]-1){
                        var newTbRow = $("<tr class = 'tbrow'>")
                        $("#month").append(newTbRow)
                        weekdayCounter = 0
                    }
                }
    }

//display today date
function displaySetup(date){
    $("#dateDisplay").text(weekDayArr[currentWeekDay] + " " + monthArr[currentMonth] + " " + date + ", " + currentYear)
    $("#currentMonth").text(monthArr[currentMonth])
}