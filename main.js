$(document).ready(
    function () {

        fetch('https://gnews.io/api/v4/search?q=example&token=230122fc26a1c767c664cdd7a3deb4d9')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                $("#overlay").hide()
                $("#searchButton").click(function () {
                    $("#overlay").hide();
                });
                $("#overlay").click(function () {
                    $("#overlay").hide();
                });
                $(".iconSearch").click(function () {
                    $("#overlay").show();
                });
                const formInput = document.querySelector('#formSearch')
                formInput.addEventListener('click', function (click) {
                    click.stopPropagation()
                })
                data.articles.map(
                    function (params, i) {

                        return $("#main").append(`
            <div id="${i}" class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 row">
                    <div class="col-xl-4 col-lg-6 col-md-12">
                        <img src="${params.image}"></img>
                    </div>
                    <div class="col-xl-8 col-lg-6 col-md-12">
                        <h3 class="title"><a target="	_blank" href="${params.url}">${params.title}</a></h3>
                        <span class="publishedAt">${params.publishedAt}</span>
                        <p class="description">${params.description}</p>
                        <p class="content">${params.content}</p>
                        <span class="source"><a target="	_blank" href="${params.source.url}"> Nguồn : ${params.source.name}</a></span>
                    </div>
                </div>
            </div>               
        `);
                    });
                $("#searchButton").click(
                    function () {
                        var keys = $("#searchInput").val().toLowerCase();
                        var a = data.articles.filter(
                            function (av, i) {
                                $("#" + i).remove();
                                $("#tieude").remove();
                                var result = av.title.toLowerCase();
                                return result.includes(keys);
                            }
                        );
                        titleLength = a.length;
                        if (titleLength > 0) {
                            $("#notFound").remove();
                            a.map(function (b, i) {
                                $("#main").append(`
                    <div id="${i}" class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 row">
                            <div class="col-xl-4 col-lg-6 col-md-12">
                                <img src="${b.image}"></img>
                            </div>
                            <div class="col-xl-8 col-lg-6 col-md-12">
                                <h3 class="title"><a target="	_blank" href="${b.url}">${b.title}</a></h3>
                                <span class="publishedAt">${b.publishedAt}</span>
                                <p class="description">${b.description}</p>
                                <p class="content">${b.content}</p>
                                <span class="source"><a target="	_blank" href="${b.source.url}"> Nguồn : ${b.source.name}</a></span>
                            </div>
                        </div>
                    </div>               
                `);
                            });
                        }
                        else {
                            $("#main").append(
                                `<h1 id="notFound" >Không tìm thấy kết quả nào</h1>`
                            );
                        };
                        $("#searchInput").val('');
                    }
                )
            })
    })
