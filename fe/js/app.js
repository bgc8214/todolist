(function (window) {
    $(document).ready(function () {
        alert("hi");
        $.ajax({
            type: 'GET',
            url: './api/todos',
            contentType: 'application/json',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    if (result.completed) { //완료된 것
                        alert("hi");
                        var todo = "<li id=" + result[i].id + "class='completed'><div class='view'><input class='toggle' type='checkbox' checked></input><label>"
                            + result[i].todo + "</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>";
                    } else {
                        alert("yes");
                    }
                }
            }
        });
    });
})(window);

/*
 (function (window) {
 // 시작 시 불러오는 부분
 $(document).ready(function () {
 $.ajax({
 type: 'GET',
 url: './api/todos',
 contentType: 'application/json',
 success: function (data) {
 var completed;
 var checked;
 for (var i = 0; i < data.length; i++) {
 completed = '';
 checked = '';
 if (data[i].completed != 0) {
 completed = ' class="completed"';
 checked = 'checked';
 }
 var prepend = '<li id=' + data[i].id + completed + '>\n <div class="view">\n <input class="toggle" type="checkbox" ' + checked + '>\n <label class="toggle_label">'
 + data[i].todo + '</label>\n<button class="destroy"></button>\n</div>\n <input class="edit" value="">\n </li>';
 $('.todo-list').prepend(prepend);
 }
 countTodo();
 clickElement($('label.toggle_label'));
 destroy('.destroy');
 insertByEnter();
 }
 });
 });
 //함수 영역
 //남은 일정 세는 부분
 function countTodo() {
 $('.todo-count > strong').text($('.todo-list > li').length - $('.todo-list > .completed').length);
 }

 function makeJsonToInsert(todo) {
 return '{"todo" : "' + todo + '"}';
 }

 function makeJsonToComplete(completed) {
 return '{"completed" : ' + completed + '}';
 }

 function PUT(id, completed) {
 $.ajax({
 type: 'PUT',
 url: './api/todos/' + id,
 data: makeJsonToComplete(completed),
 contentType: 'application/json',
 success: function (data) {
 countTodo();
 }
 });
 }

 function POST(todo) {
 $.ajax({
 type: 'POST',
 url: './api/todos',
 data: makeJsonToInsert(todo),
 contentType: 'application/json',
 success: function (data) {
 var prepend = '<li id=' + data.id + '>\n <div class="view">\n <input class="toggle" type="checkbox">\n <label class="toggle_label">'
 + data.todo + '</label>\n<button class="destroy"></button>\n</div>\n <input class="edit" value="">\n </li>';
 $('.todo-list').prepend(prepend);
 $('.new-todo').val("");
 countTodo();
 clickElement($('label.toggle_label:first'));
 destroy('.destroy:first');
 }
 });
 }

 function deleteTodo(obj) {
 $.ajax({
 type: 'DELETE',
 url: './api/todos/' + obj.attr('id'),
 success: function () {
 $(obj).remove();
 countTodo();
 }
 });
 }

 function deleteByCompleted() {
 $.ajax({
 type: 'DELETE',
 url: './api/todos/completed',
 success: function () {
 $('.completed').remove();
 countTodo();
 }
 });
 }

 //개별 선택
 function clickElement(obj) {
 var com;
 obj.on('click', function () {
 if ($(this).siblings('.toggle').prop('checked') == true) {
 $(this).siblings('.toggle').prop('checked', false);
 $(this).parents('div').parents('li').removeClass('completed');
 com = 0;
 } else {
 $(this).siblings('.toggle').prop('checked', true);
 $(this).parents('div').parents('li').addClass('completed');
 com = 1;
 }
 PUT($(this).parents('div').parents('li').attr('id'), com);
 });
 $('input:checkbox').on('click', function () {
 if ($(this).prop('checked') == true) {
 $(this).parents('div').parents('li').addClass('completed');
 com = 1;
 } else {
 $(this).parents('div').parents('li').removeClass('completed');
 com = 0;
 }
 PUT($(this).parents('div').parents('li').attr('id'), com);
 });
 }

 function destroy(str) {
 $(str).on('click', function () {
 deleteTodo($(this).closest('li'));
 })
 }

 function selectBottomButton(str) {
 $('#button_all').removeClass('selected');
 $('#button_completed').removeClass('selected');
 $('#button_active').removeClass('selected');
 $(str).addClass('selected');
 }

 //엔터키로 추가
 function insertByEnter() {
 $('.new-todo').keydown(function (event) {
 if (event.keyCode == 13) {
 if ($('.new-todo').val() != "") {
 POST($('.new-todo').val());
 }
 }
 });
 }

 // 하단 버튼 부분
 $('#label_toggle-all').on('click', function () {
 var com = 0;
 if ($('input:checkbox').prop('checked') != true) {
 com = 1;
 }
 $('input:checkbox').each(function () {
 PUT($(this).parents('div').parents('li').attr('id'), com);
 if (com == 0) {
 $(this).prop('checked', false);
 $(this).parents('div').parents('li').removeClass('completed');
 } else {
 $(this).prop('checked', true);
 $(this).parents('div').parents('li').addClass('completed');
 }
 countTodo();
 });
 });
 $('#button_completed').on('click', function () {
 $('.todo-list > li').hide();
 $('.completed').show();
 selectBottomButton('#button_completed');
 countTodo();
 destroy('.destroy');
 });
 $('#button_active').on('click', function () {
 $('.todo-list > li').show();
 $('.completed').hide();
 selectBottomButton('#button_active');
 countTodo();
 destroy('.destroy');
 })
 $('#button_all').on('click', function () {
 $('.todo-list > li').show();
 selectBottomButton('#button_all');
 countTodo();
 destroy('.destroy');
 })
 $('#button_clear-completed').on('click', function () {
 deleteByCompleted();
 });
 })(window);


 (function (window) {
 'use strict';
 var count = 0;
 $(document).ready(function () {
 //List
 $.ajax({
 url: "/api/todos",
 type: "GET"
 }).done(function (result) {
 for (var index in result) {
 if (result[index].completed === 1) {
 $('.todo-list').prepend("<li data-id=" + result[index].id + " class='completed'><div><input class='toggle' type='checkbox' checked></input><label>" + result[index].todo + "</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>");
 }
 else {
 $('.todo-list').prepend("<li data-id=" + result[index].id + "><div><input class='toggle' type='checkbox'></input><label>" + result[index].todo + "</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>");
 count = count + 1;
 }
 }
 $('.todo-count>strong').text(count);
 });
 //Insert
 $('.new-todo').keypress(function (key) {
 if (key.keyCode == 13) {
 if ($('.new-todo').val() === "") {
 alert("문자열을 입력해주세요");
 }
 else {
 $.ajax({
 url: "/api/todos",
 type: "POST",
 data: {'todo': $('.new-todo').val()}
 }).done(function () {
 $('.new-todo').val('');
 $.ajax({
 url: "/api/todos",
 type: "GET",
 }).done(function (result) {
 $('.todo-list').prepend("<li data-id=" + result[result.length - 1].id + "><div><input class='toggle' type='checkbox'></input><label>" + result[result.length - 1].todo + "</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>");
 count = count + 1;
 $('.todo-count>strong').text(count);
 });
 });
 }
 }
 });
 });
 //Delete
 $(document).on("click", ".destroy", function () {
 var $this = $(this);
 $.ajax({
 url: "/api/todos",
 type: "DELETE",
 data: JSON.stringify({'id': $(this).parents("li").attr("data-id")}),
 contentType: "application/json; charset=utf-8",
 success: function () {
 $this.parents("li").remove();
 count = count - 1;
 $('.todo-count>strong').text(count);
 },
 error: function () {
 console.log("error");
 }
 });
 });
 //Clear Completed
 $(document).on("click", ".clear-completed", function () {
 $.ajax({
 url: "/api/todos/all",
 type: "DELETE",
 success: function () {
 $(".todo-list").children("li.completed").remove();
 $(".toggle-all").prop("checked", false);
 },
 error: function () {
 console.log("error");
 }
 });
 })
 //PUT
 $(document).on("change", ".toggle", function () {
 var here = $(this);
 if ($(this).is(":checked")) {
 $.ajax({
 url: "/api/todos",
 type: "PUT",
 data: JSON.stringify({'id': $(this).parents("li").attr("data-id"), 'completed': '1'}),
 contentType: "application/json; charset=utf-8",
 success: function () {
 here.parents("li").addClass("completed");
 count = count - 1;
 $('.todo-count>strong').text(count);
 }
 });
 }
 else {
 $.ajax({
 url: "/api/todos",
 type: "PUT",
 data: JSON.stringify({'id': $(this).parents("li").attr("data-id"), 'completed': '0'}),
 contentType: "application/json; charset=utf-8",
 success: function () {
 here.parents("li").removeClass("completed");
 count = count + 1;
 $('.todo-count>strong').text(count);
 }
 });
 }
 });
 // SELECT ALL
 $(document).on("click", ".toggle-all", function () {
 if ($('.toggle-all').prop("checked")) {
 $('.toggle:not(:checked)').click()
 }
 else {
 $('.toggle').click();
 }
 });
 $(document).on("click", "a[href='#/active']", function (evt) {
 evt.preventDefault();
 $("a[href='#/completed']").removeClass("selected");
 $("a[href='#/active']").addClass("selected");
 $("a[href='#/']").removeClass("selected");
 $('.toggle:checked').parents("li").hide();
 $('.toggle:not(:checked)').parents("li").show();
 });
 $(document).on("click", "a[href='#/completed']", function (evt) {
 evt.preventDefault();
 $("a[href='#/completed']").addClass("selected");
 $("a[href='#/active']").removeClass("selected");
 $("a[href='#/']").removeClass("selected");
 $('.toggle:checked').parents("li").show();
 $('.toggle:not(:checked)').parents("li").hide();
 });
 $(document).on("click", "a[href='#/']", function (evt) {
 evt.preventDefault();
 $("a[href='#/completed']").removeClass("selected");
 $("a[href='#/active']").removeClass("selected");
 $("a[href='#/']").addClass("selected");
 $('.toggle:checked').parents("li").show();
 $('.toggle:not(:checked)').parents("li").show();
 });
 })(window);


*/