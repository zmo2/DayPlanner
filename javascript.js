
var currentTime = new Date()
var currentHour = currentTime.getHours()
var currentDate = currentTime.getDate()
var currentWeekDay = currentTime.getDay()
var currentMonth = currentTime.getMonth()
var currentYear = currentTime.getUTCFullYear()
var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var daysInMonthArr = [31,28,31,30,31,30,31,31,30,31,30,31]
var weekDayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var storeDateData = getSelectDate(currentDate)

//display today date
function displaySetup(date){
    $("#dateDisplay").text( weekDayArr[currentWeekDay] + " " + monthArr[currentMonth] + " " + date + ", " + currentYear)
    $("#currentMonth").text(monthArr[currentMonth])
}
displaySetup(currentDate)
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
            var newTbRow = $("<tr class = 'tbrow'>")
            $("#month").append(newTbRow)

        for (i=0; i<weekDayArr.length;i++){
            var newTbCol = $("<th class = 'tbrow'>")
                newTbCol.text(weekDayArr[i])
            newTbRow.append(newTbCol)
        }
            var newTbRow = $("<tr class = 'tbrow'>")
            $("#month").append(newTbRow)
        for (i=0; i<weekdayCounter; i++){
            var newTbCol = $("<td class = 'tbcol'>")
                newTbCol.text("")
            newTbRow.append(newTbCol)
        }
        for (i=0; i<daysInMonthArr[currentMonth]; i++){
                
                var newTbCol = $("<td class = 'tbcol'>")
                    newTbCol.text(dayOfMonthCounter)
                newTbRow.append(newTbCol)
                if(dayOfMonthCounter === currentDate){
                    newTbCol.addClass("highlight")
                }
                dayOfMonthCounter++
                weekdayCounter ++
                    if(weekdayCounter > 6){
                        var newTbRow = $("<tr class = 'tbrow'>")
                        $("#month").append(newTbRow)
                        weekdayCounter = 0
                    }
                }
        
    }
 
// function mkTbRow (){
//     var newTbRow = $("<tr class = 'tbrow'>")
//     $("#month").append(newTbRow)
// }

calendarSetup()

function pageSetup(){
    $(".inputSec").each(function(){
        $(this).text(localStorage.getItem(storeDateData+ $(this).siblings(".timeSec").text()))
    })
}
pageSetup()

function getSelectDate(date){
    return currentMonth.toString() + date + currentYear.toString()
}

//highlights date clicked on calendar
$(document).on("click", ".tbcol", function(){
    $(".tbcol").removeClass("highlight")
    $(this).addClass("highlight")
    storeDateData = getSelectDate($(this).text())
    displaySetup($(this).text())
    pageSetup()
    console.log(storeDateData)
})

$(document).on("click", ".saveButton", function(){
    
    localStorage.setItem(storeDateData + $(this).siblings(".timeSec").text(), $(this).siblings(".inputSec").text())
    localStorage.getItem(storeDateData + $(this).siblings(".timeSec").text())
})

$("#clear").on("click", function(){
    localStorage.clear()
    pageSetup()
})

$("#prevMonth").on("click", function(){
    currentMonth --
    displaySetup(currentDate)
    calendarSetup()
})

$("#nextMonth").on("click", function(){
    currentMonth ++
    displaySetup(currentDate)
    calendarSetup()
})

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