(function (window) {
    $(document).ready(function () {
        var listCount = 0;
        $.ajax({
            type: 'GET',
            url: '/api/todos',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var todo;
                    if (result[i].completed) { //완료된 것
                        todo = "<li id=" + result[i].id + " class='completed'><div class='view'><input class='toggle' type='checkbox' checked></input><label>"
                            + result[i].todo + "</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>";
                    } else {
                        todo = "<li id=" + result[i].id + " ><div class='view'><input class='toggle' type='checkbox'></input><label>"
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
        $(document).on("click", ".destroy", function () {
            var clickedList = $(this);
            $.ajax({
                url: "/api/todos/" + $(this).parents("li").attr("id"),
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

        //완료 버튼 눌렀을 때, 업데이트
        $(document).on("change", ".toggle", function () {
            var clickedList = $(this);
            if ($(this).is(":checked")) {
                $.ajax({
                    url: "/api/todos/" + $(this).parents("li").attr("id"),
                    type: "PUT",
                    data: '{"completed" : ' + 1 + '}',
                    contentType: 'application/json',
                    success: function () {
                        clickedList.parents("li").addClass(" completed");
                        listCount--;
                        $('.todo-count').find('strong').text(listCount);
                    }
                });
            }
            else {
                $.ajax({
                    url: "/api/todos/" + $(this).parents("li").attr("id"),
                    type: "PUT",
                    data: '{"completed" : ' + 0 + '}',
                    contentType: 'application/json',
                    success: function () {
                        clickedList.parents("li").removeClass("completed");
                        listCount++;
                        $('.todo-count').find('strong').text(listCount);
                    }
                });
            }
        });


        // All, Active, Completed 버튼 클릭 동작
        $(document).on("click", "a[href$='#/']", function (event) {
            $("a[href$='#/']").addClass("selected");
            $("a[href$='#/active']").removeClass("selected");
            $("a[href$='#/completed']").removeClass("selected");
        });

        $(document).on("click", "a[href$='#/active']", function (event) {
            event.preventDefault();
            $("a[href$='#/active']").addClass("selected");
            $("a[href$='#/']").removeClass("selected");
            $("a[href$='#/completed']").removeClass("selected");
        });
        $(document).on("click", "a[href$='#/completed']", function (event) {
            event.preventDefault();
            $("a[href$='#/completed']").addClass("selected");
            $("a[href$='#/']").removeClass("selected");
            $("a[href$='#/active']").removeClass("selected");
        });


        $(document).on("click", ".toggle-all", function () {
            if ($('.toggle-all').prop("checked")) {
                $('.toggle:not(:checked)').click()
            }
            else {
                $('.toggle').click();
            }
        });


    });
})(window);
