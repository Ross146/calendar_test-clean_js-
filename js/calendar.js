
  function showCalendar(param) { //принимает объект
    this.elem = document.getElementById(param.id);
    var that =this;
    var activedate = this.gettodaydate();
    var year =activedate.year;
    var mon = activedate.month;
    var rerender = false;
    buttonsRender();
    renderText();
    tableRender();
    calendarClicklistener();

    function tableRender() { // рендерит таблицу
      if(rerender) {
        that.elem.removeChild(that.elem.childNodes[1])
      }
      var d = new Date(year, mon);
      var table = '<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>';
      for (var i = 0; i < getDay(d); i++) { // первый ряд пустых td
        table += '<td></td>';
      }
      while (d.getMonth() == mon) { //ячейки с датами и активной датой
        if(activedate.year == year && activedate.month == mon && activedate.day == d.getDate()) { //активная дата
          table += '<td class="active">' + d.getDate() + '</td>';
        } else {
          table += '<td>' + d.getDate() + '</td>';
        }
        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
          table += '</tr><tr>';
        }
        d.setDate(d.getDate() + 1);
      }
      if (getDay(d) != 0) {  //последний ряд пустых td
        for (var i = getDay(d); i < 7; i++) {
          table += '<td></td>';
        }
      }
      var tableEnd = document.createElement("table");
      tableEnd.innerHTML = table;
      that.elem.appendChild(tableEnd);

      function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
        var day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
      }
    }

    function renderText() { // рендерит месяц год
      if(rerender) {
        that.elem.removeChild(that.elem.childNodes[1])
      }
      var month;
      switch (mon) {
        case 0: month = "January"; break;
        case 1: month = "February"; break;
        case 2: month = "March"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "June"; break;
        case 6: month = "July"; break;
        case 7: month = "August"; break;
        case 8: month = "September"; break;
        case 9: month = "October"; break;
        case 10: month = "November"; break;
        case 11: month = "December"; break;
      }
      var textcontainer = document.createElement("span");
      textcontainer.innerHTML = year +" " +month;
      that.elem.appendChild(textcontainer);
    }

    function buttonsRender () { // рендерить кнопочки перелистывания
      var buttons = '<button class="prev">Prev</button><button class="next">Next</button>'
      var div = document.createElement("div");
      div.innerHTML = buttons;
      that.elem.appendChild(div);
    }

    function calendarClicklistener() { // прослушка события. Для ie<=8 надо onclick
      that.elem.addEventListener("click", function (e) {
        e.target.className == 'prev' ? downMonth():
        e.target.className == 'next' ? upMonth():
        e.target.tagName == 'TD'? newActiveday(e):null;
      })
    }

    function newActiveday (e) { //установка новый активной даты и запись её в объект activedate
      var oldActiveTd = that.elem.getElementsByClassName("active")[0];
      if(oldActiveTd) {
        oldActiveTd.classList.remove("active");
      }
      var newActiveTd = e.target;
      newActiveTd.classList.add("active");
      activedate.month = mon;
      activedate.year = year;
      activedate.day = newActiveTd.innerHTML;
    }

    function upMonth() { // след месяц
      mon++;
      if(mon == 12) {
        year++;
        mon = mon - 12;
      }
      rerender = true;
      renderText();
      tableRender();
    }

    function downMonth() { // пред месяц
      mon--;
      if(mon == -1) {
        year--;
        mon = mon + 12;
      }
      rerender = true;
      renderText();
      tableRender();
    }
  }

  showCalendar.prototype.gettodaydate = function() { // актуальная дата сегодня
    var date = new Date;
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    }
  }


