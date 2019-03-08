$showBookWrapper = $('#showBookItem');
var showItems = '';
var showBookId = localStorage.getItem('showBookId');

$.getJSON("../json/books.json", function (result) {
    var showBook = result;

    for(i = 0; i < showBook.length; i++){
        if(showBook[i].id == showBookId){
            showItems += `<div class="row bookItem" data-name="${showBook[i].name}" data-price="${showBook[i].price}" data-id="${showBook[i].id}"">
            <div class="imgWrapper col-12 col-md-6"><img src="../img/${showBook[i].img}" alt="" class="img-fluid"></div>
            <div class="textWrapper col-12 col-md-6">
                <h1>${showBook[i].name}</h1>
                <p>${showBook[i].description}</p>
                <p>${showBook[i].price},00 RSD</p>
                <p><a href="" class="addItem showBtn">Kupite</a></p>
            </div>
          </div>` 
        }
    }

    $showBookWrapper.html(showItems);
});
