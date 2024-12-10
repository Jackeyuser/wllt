$(function () {
    $.get("https://ossweb-img.qq.com/images/clientpop/idata_ad/24936.json", function (result) {
        // console.log(JSON.parse(result))
        var resObj = JSON.parse(result)
        var listArr = transList(resObj)
        $('.p4 .p4-box').html(template("p2-img-box-item", {
            item: listArr
        }));
        // console.log(listArr)
        $('.p4 .p4-box').html(template("p2-img-box-item", {
            item: listArr
        }));
        $('.p4 .mySwiper4 .swiper-wrapper').html(template("p2-img-box-item-m", {
            item: listArr
        }));
        $('.vtab .vtab-item').on('mouseenter', function () {
            $(this).addClass("on").siblings().removeClass("on");
        });
        var swiper4 = new Swiper(".mySwiper4", {
            pagination: {
              el: ".mySwiper4 .swiper-pagination",
            },
        });
    })

    function transList(sData) {
        var rData = []
        for (var key in sData) {
            if (sData[key].length) {
                rData.push(sData[key][0])
            }
        }
        return rData;
    }
})