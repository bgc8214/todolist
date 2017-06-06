(function (window) {
    $(document).ready(function () {
        var listCount = 0;
        $.ajax({
            type: 'GET',
            url: '/api/todos',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var todo;
                    if (result.completed) { //완료된 것
                        todo = "<li id=" + result[i].id + "class='completed'><div class='view'><input class='toggle' type='checkbox' checked></input><label>"
                            + result[i].todo + "</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>";
                    } else {
                        todo = "<li id=" + result[i].id + "><div class='view'><input class='toggle' type='checkbox'></input><label>"
                            + result[i].todo + "</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>";
                        listCount++;
                    }
                    $('.todo-count').find('strong').text(listCount);
                    $('.todo-list').prepend(todo); // 찾아서 리스트 추가
                }
            }
        });

        //엔터로 추가
        $('.new-todo').keydown(function (event) {
            if (event.keyCode == 13) {
                if ($('.new-todo').val() != "") {
                    $.ajax({
                        type: 'POST',
                        url: '/api/todos',
                        data: '{"todo" : "' + $('.new-todo').val() + '"}',
                        contentType: 'application/json',
                        success: function (result) {
                            var todo = "<li id=" + result.id + "><div class='view'><input class='toggle' type='checkbox'></input><label>"
                                + result.todo + "</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>";
                            $('.todo-list').prepend(todo);
                            $('.new-todo').val("");
                            listCount++;
                            $('.todo-count').find('strong').text(listCount);
                        },
                        error: function () {
                            alert("INSERT ERROR");
                        }
                    });
                }
            }
        });


        //삭제
        $(document).on("click",".destroy",function(){
            var clickedList = $(this);
            $.ajax({
                url: "/api/todos/"+ $(this).parents("li").attr("id"),
                type: "DELETE",
                success: function () {
                    clickedList.parents("li").remove();
                    listCount--;
                    $('.todo-count').find('strong').text(listCount);
                },
                error: function () {
                    alert("DELETE ERROR");
                }
            });
        });
    });
})(window);
