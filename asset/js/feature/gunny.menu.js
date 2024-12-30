// (function( $ ){
//     $.fn.gnLoadMenu = function(options){
//         var that = this;
//         var settings = $.extend({}, shop.settingDefault.menu, shop.options.menu, options);
//         shop.saveOptions("menu", options);
//         shop.saveArea("menu", this.selector);
//         $(this).html(shop.html.menu(settings));
//         $(this).find('.'+settings.recordClass).off("click").click(function(){
//             settings.clickItemEvent({
//                 _main: that,
//                 _this: this
//             }, settings);
//         })
//         return settings;
//     }

//     $.fn.gnLoadSubMenu = function(options){
//         options = options || {};
//         var that = this;
//         var settings = $.extend({}, shop.settingDefault.subMenu, shop.options.subMenu, options);
//         shop.saveOptions("subMenu", options);
//         shop.saveArea("subMenu", this.selector);
//         if(settings.menuId){
//             var idMenu = settings.menuId;
//             shop.menuId = settings.menuId;
//         }else{
//             var idMenu = shop.menuId;
//         }        
//         $(this).html(shop.html.subMenu(shop.menuId, settings));
//         $(this).find('.'+settings.recordClass).off("click").click(function(){
//             settings.clickItemEvent({
//                 _main: that,
//                 _this: this
//             }, settings);
//         });
//         return settings;
//     }
// }) (jQuery);

// var menu = {
//     data: [
//         {
//             name: "Trang bị",
//             subMenu: [
//                 {name: "Kính", catId: 2},
//                 {name: "Áo", catId: 5},
//                 {name: "Nón", catId: 1}
//             ]
//         },
//         {
//             name: "Làm đẹp",
//             subMenu: [
//                 {name: "Tóc", catId: 3},
//                 {name: "Mắt", catId: 6},
//                 {name: "Mặt", catId: 4},
//                 {name: "Bộ", catId: 13},
//                 {name: "Cánh", catId: 15}
//             ]
//         }
//     ]
// }
