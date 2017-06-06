
(function (window) {
    $(document).ready(function () {
        alert("hi");
        $.ajax({
            type: 'GET',
            url: './api/todos',
            contentType: 'application/json',
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var todo;
                    if (result.completed) { //완료된 것
                        todo = "<li id=" + result[i].id + "class='completed'><div class='view'><input class='toggle' type='checkbox' checked></input><label>"
                            + result[i].todo + "</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>";
                    } else {
                        todo = "<li id=" + result[i].id + "><div class='view'><input class='toggle' type='checkbox'></input><label>"
                            + result[i].todo + "</label><button class='destroy'></button></div><input class='edit' value='Create a TodoMVC template'></input></li>";
                    }
                    $('.todo-list').prepend(todo); // 찾아서 리스트 추가
                }

                //엔터시 입력
                $('.new-todo').keydown(function (key) {
                    if (key.keyCode == 13) {
                        if ($('.new-todo').val() == "") {
                            alert("내용을 입력해주세요");
                        } else {
                            alert("저장");
                            alert( $('.new-todo').val() );

                            $.ajax({
                                type: 'POST',
                                url: './api/todos',
                                data: {'todo': $('.new-todo').val()},
                                contentType: 'application/json',
                                success: function (result) {
                                    // 새로 리스트에 등록 및 기존 입력창 value 제거
                                    var todo = '<li id=' + result.id + '>\n <div class="view">\n <input class="toggle" type="checkbox">\n <label class="toggle_label">'
                                        + result.todo + '</label>\n<button class="destroy"></button>\n</div>\n <input class="edit" value="">\n </li>';
                                    $('.todo-list').prepend(todo);
                                    $('.new-todo').val("");

                                }
                            });
                        }
                    }
                });
            }
        });
    });
})(window);
