/**
 * Get list of results for sidebar
 */
var getSidebarResults = function(node) {
   if ( $("#not-subscriber-msg").is(":visible") ) {
      var right = parseInt($("#sidebar").css("right"), 10);
      if (right == 0) {
         right *= -1;
         $("#sidebar").animate({
            right : "-=250",
         }, 150);
      }
      return;
   }
   var listPageSize = 10;
   var query = "/search?";
   var params = getFacetParams(node);
   listPage = node.listPage;
   if (!listPage) {
      node.listPage = 0;
      listPage = 0;
   }
   if (listPage > 0) {
      params += "&pg=" + listPage;
   }
   params += "&max=10&sidebar=1";
   $("#sidebar .title").text(node.name);
   
   var topH = $("#sidebar .top").outerHeight(true)+15;
   var h = parseInt($("#sidebar").css("height"),10)-topH;
   $("#sidebar #content").css("max-height", h+"px");
   $("#sidebar #content").empty();
   $("#list-page-ctls .total").text(node.size);
   
   // page counts
   var numPages = Math.floor((node.size + 9) / 10);
   $("#list-page-ctls .page-count").text((listPage+1)+" of "+numPages);
   $(".page-nav.prev").show();
   $(".page-nav.next").show();
   if ( 0 == listPage )  $(".page-nav.prev").hide();
   if ( numPages == (listPage+1) )  $(".page-nav.next").hide();
   
   
   // append the query/date stuff (true causes date param to be added)
   params = params + getSearchParams("&", true);
   

   $.getJSON(query+params, function(data, textStatus, jqXHR) {
      if (textStatus !== "success") {
         return;
      }
      
      $("#sidebar #content").html(data.html);
      var right = parseInt($("#sidebar").css("right"), 10);
      if (right < 0) {
         right *= -1;
         $("#sidebar").animate({
            right : "+="+right,
         }, 150);
      }

   });
}

var prevPageClicked = function() {
   alert("prev");
}
var nextPageClicked = function() {
   alert("next");
}

var hideSidebar = function() {
   var right = parseInt($("#sidebar").css("right"), 10);
   if (right == 0) {
      right *= -1;
      $("#sidebar").animate({
         right : "-=250",
      }, 150);
   }
}