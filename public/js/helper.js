var startDate = moment("2022-01-01");
var endDate = moment();
$( document ).ready(function() {
      
      $("a").on("click", function(){
        $(this).toggleClass('active');
      });

      $("figure").on("click", function(){
        $(this).toggleClass('active');
      }); 


      
});

      $( document ).ready(function() {
        var $this = $(this),
            from = +moment(startDate).format("X"),
            to = +moment(endDate).subtract(2, "days").format("X")
    
            $("#dayfrom").text(moment(from, "X").format("MMM"));
            $("#monthfrom").text(moment(from, "X").format("Do"));
            $("#yearfrom").text(moment(from, "X").format("YYYY"));
            $("#dayto").text(moment(to, "X").format("MMM"));
            $("#monthto").text(moment(to, "X").format("Do"));
            $("#yearto").text( moment(to, "X").format("YYYY"));

        


            
      });

      $(".js-range-slider").ionRangeSlider({
        skin: "round",
        type: "double",
        grid: true,

        min: +moment(startDate).format("X"),
        max: +moment(endDate).format("X"),

        from: +moment(startDate).format("X"),
        to: +moment(endDate).subtract(2, "days").format("X"),

        prettify: function (num) {
          return moment(num, "X").format("MMM Do YYYY");
        }
      });

      $(".js-range-slider").on("change", function () {
        var $this = $(this),
            from = $this.data("from"),
            to = $this.data("to");
    
            $("#dayfrom").text(moment(from, "X").format("MMM"));
            $("#monthfrom").text(moment(from, "X").format("Do"));
            $("#yearfrom").text(moment(from, "X").format("YYYY"));
            $("#dayto").text(moment(to, "X").format("MMM"));
            $("#monthto").text(moment(to, "X").format("Do"));
            $("#yearto").text( moment(to, "X").format("YYYY"));
        });