console.log("hello")

//display today date
$("#dateDisplay").text(Date())

//make the calendar and show current month
function calendarSetup(){
    var currentTime = new Date()
    var currentHour = currentTime.getHours()
    var currentDate = currentTime.getDate()
    var currentWeekDay = currentTime.getDay()
    var currentMonth = currentTime.getMonth()
    var currentYear = currentTime.getUTCFullYear()
    var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var daysInMonthArr = [31,28,31,30,31,30,31,31,30,31,30,31]
    var weekDayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    if(currentYear%4 === 0){
        daysInMonthArr[1] = 29
    }
    var firstOfMonth = new Date(monthArr[currentMonth]+ " 1," + currentYear + " 10:01:01")
    var tempWeekNum = firstOfMonth.getDay()
    var weekdayCounter = tempWeekNum
    var dayOfMonthCounter = 1
    console.log(tempWeekNum)

            var newTbRow = $("<tr class = 'tbrow'>")
            $("#month").append(newTbRow)

        for (i=0; i<weekDayArr.length;i++){
            var newTbCol = $("<th>")
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
        $(this).text(localStorage.getItem($(this).siblings(".timeSec").text()))
    })
}
pageSetup()
$(document).on("click", ".saveButton", function(){
    localStorage.setItem($(this).siblings(".timeSec").text(), $(this).siblings(".inputSec").text())
    localStorage.getItem($(this).siblings(".timeSec").text())
})