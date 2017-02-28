function domobj() {
  var self = this;
  self.products = [];
  self.getproducts = function(url) {
    $.getJSON(url, function(response) {
      for (i = 0; i < response.sales.length; i++) {
        self.products.push(new productobj(response.sales[i], i));
      }
    });
  }
  self.updateproducthtml = function() {
    for (i = 0; i < self.products.length; i++) {
      self.products[i].updatehtml();
    }
  }
  self.updatedom = function() {
    var i = 0
    thishtml = '';
    for (i = 0; i < self.products.length; i++) {
      if (i % 2 == 0) {
        thishtml += "<div class=''>";
        console.log("START")
      }
      thishtml += self.products[i].htmlview;
      if ((i % 2 == 1) || i == (self.products.length - 1)) {
        thishtml += "</div>";
        console.log("FINISH")
      }
    }
    $("#content").append(thishtml)
  }
}

function productobj(product, i) {
  var self = this;
  self.photo = product.photos.medium_half
  self.title = product.name
  self.tagline = product.tagline
  self.url = product.url
  self.desc = product.description
  self.htmlview = ""
  self.index = i
  self.custom_class = "col" + ((i % 2) + 1)
  self.updatehtml = function() {
    $.get('product-template.html', function(template) {
      self.htmlview = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{custom_class}', self.custom_class).replace('{productdesc}', self.desc);
    });
  }
}
var page = new domobj();
page.getproducts('data.json');
setTimeout("console.log('building html');page.updateproducthtml();", 300);
setTimeout("page.updatedom()", 800)
  /* description on mouse hover at image*/
$(document).ready(function() {
  /*It takes a second or two to load the page. Let the user know that the page is still loading until the page renders.*/
  $("#cover").fadeOut("slow");
  $("#content").on('mouseenter', '.product', function(event) {
    //alert($(this).attr('class'));
    $(this).find('.productdesc').show();
    $(this).css({
      opacity: 1
    });
  }).on('mouseleave', '.product', function() {
    $(this).find('.productdesc').hide();
  });
  /* image will be deleted while clicking on close */
  $("#content").on('click', '.close', function(event) {
    //alert($(this).closest('div').attr('class'));
    $(this).closest('div').css({
      "display": "none"
    });
    //$(this).css({"display":"none"});
  });
});
/*tooltip*/
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});