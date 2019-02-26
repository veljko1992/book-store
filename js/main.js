$(document).ready(function() {
  //Navigation
  var nav = $("nav");
  var navLi = $("nav li");
  var menuBtn = $("#menu-btn");
  var winWidth = $(window).width();
  var $booksLink = $("#booksLink");
  var $booksList = $("#booksList");

  //Provera sirine ekrana ako je veca od 992 navigacija se vidi, a ako je manja sakrivena je
  if (winWidth >= 992) {
    nav.css("display", "block");
    menuBtn.css("display", "none");
  } else {
    nav.css("display", "none");
    menuBtn.css("display", "block");
  }
  //Kada resajzujemo window ako je vece od 992 navigacija se idi, a ako je manja nav se ne vidi sklanja se i iksic
  $(window).resize(function() {
    winWidth = $(window).width();
    if (winWidth >= 992) {
      nav.css("display", "block");
      menuBtn.css("display", "none");
    } else {
      nav.css("display", "none");
      menuBtn.css("display", "block");
      $("#menu-btn span").removeClass("bOpen");
      nav.removeClass("open");
    }
  });
  //Kad kliknemo na iksic pojavljuje se i nestaje navigacija
  menuBtn.on("click", function() {
    if ($(nav).attr("class") == "open") {
      $("#menu-btn span").removeClass("bOpen");
      nav.fadeOut(400, function() {
        nav.removeClass("open");
      });
      $booksList.css("display", "none");
    } else {
      $("#menu-btn span").addClass("bOpen");
      nav.fadeIn(400);
      nav.addClass("open");
    }
  });
  //Kad kliknemo na link na navigaciju ako je manja od 992 nestaje
  navLi.on("click", function(e) {
    if (winWidth < 992 || nav.attr("class") == "open") {
      if (e.target.textContent == "KNJIGE") {
        if ($booksList.css("display") == "none") {
          $booksList.css("display", "block");
        } else {
          $booksList.css("display", "none");
        }
      } else {
        $("#menu-btn span").removeClass("bOpen");
        nav.fadeOut(400, function() {
          nav.removeClass("open");
        });
        $booksList.css("display", "none");
      }
    }
  });

  // Smooth scrool navigations link
  var navHeight = 140;

  $("nav .navigation-link").on("click", function(e) {
    sectionID = $(this).attr("href");
    // console.log(sectionID);
    sectionPosition = $(sectionID).offset().top - navHeight;
    // console.log(sectionPosition);
    $("html, body").animate(
      {
        scrollTop: sectionPosition
      },
      1000
    );
  });
  // Smooth scrool navigations link END

  //Navigation END

  //Prepare items for local storage
  var $addItemButton = $(".addItem");
  var $numberArticle = $("#numberArticle");

  var countItem = {};
  var countItems = [];
  var fetched = false;

  $addItemButton.on("click", function(e) {
    e.preventDefault();

    var target = e.target;
    var price =
      target.parentElement.previousSibling.previousSibling.textContent;
    var bookName = target.parentElement.parentElement.children[0].textContent;

    var bookPrice = "";
    for (i = 0; i < price.length; i++) {
      if (price.charAt(i) >= 0 || price.charAt(i) <= 9) {
        bookPrice += price.charAt(i);
      }
    }
    bookPrice = parseInt(bookPrice);

    numArticle = localStorage.getItem("numArticle");

    if (numArticle == null) {
      numArticle = 1;
    } else {
      newNumb = parseInt(numArticle);
      newNumb += 1;
      numArticle = newNumb;
    }

    var totalBill = localStorage.getItem("totalBill");

    if (totalBill == null) {
      totalBill = 0;
    } else {
      newNumb = parseInt(totalBill);
      totalBill = newNumb;
    }

    totalBill += bookPrice;

    countItem.id = numArticle;
    countItem.name = bookName;
    countItem.price = bookPrice;

    addItem(countItem);

    localStorage.setItem("totalBill", totalBill);
    localStorage.setItem("numArticle", numArticle);
    checkNumArticle();
  });
  //Prepare items for local storage END

  // Check number od article
  checkNumArticle();

  function checkNumArticle() {
    var chechNumArticle = localStorage.getItem("numArticle");

    if (chechNumArticle == null) {
      $numberArticle.addClass("d_none");
    } else {
      $numberArticle.removeClass("d_none");
      $numberArticle.html(localStorage.getItem("numArticle"));
    }
  }
  // Check number od article END

  // Add items to local sotorage
  function addItem(countItem) {
    fetched = false;
    var item = fetch();

    if (item != null) {
      item.push(countItem);
      to_push = JSON.stringify(item);
    } else {
      countItems.push(countItem);
      to_push = JSON.stringify(countItems);
    }
    localStorage.setItem("countItems", to_push);
    return;
  }

  function fetch() {
    var to_fetch = localStorage.getItem("countItems");
    var item = JSON.parse(to_fetch);
    return item;
  }

  // Add items to local sotorage END

  //Push items to shoping card

  var $shoppingCard = $("#shoppingCard");
  var $shoppingList = $("#shoppingList");
  var $exit = $("#exit");
  var $shoppingListItems = $("#shoppingListItems");

  $shoppingCard.on("click", function(e) {
    $shoppingList.css("display", "block");
    listItems();
  });

  $exit.on("click", function(e) {
    $("#empty").remove();
    $shoppingList.css("display", "none");
  });

  function listItems() {
    var item = fetch();
    if (item == null) {
      $shoppingListItems.append('<p id="empty">Shoping lista je prazna</p>');
    } else {
      var table = `<table>`;
      for (i = 0; i < item.length; i++) {
        table += `<tr>`;
        for (prop in item[i]) {
          console.log(item[i][prop]);
          table += `<td>${item[i][prop]}</td>`;
        }
        table += `</tr>`;
      }
      table += `</table>`;
      $shoppingListItems.html(table);
    }
    fetched = true;
    return;
  }
  //Push items to shoping card END
});
