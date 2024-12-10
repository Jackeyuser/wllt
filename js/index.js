/************************** PC start ***************************/
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
  }
  if (isMobile()) {
      // H5
    } else {
      // pc
      document.querySelector('.wrapper').style.height = document.getElementsByClassName('wrap')[0].offsetHeight * window.innerWidth / 1920 + 'px';
      document.documentElement.style.setProperty('--scale', window.innerWidth / 1920);
      $(window).on('load resize', function () {
        document.querySelector('.wrapper').style.height = document.getElementsByClassName('wrap')[0].offsetHeight * window.innerWidth / 1920 + 'px';
        document.documentElement.style.setProperty('--scale', window.innerWidth / 1920);
      })
    }
    const getAdtag = () => {
      function getUrlParams2(url) {
        let urlStr = url.split('?')[1]
        const urlSearchParams = new URLSearchParams(urlStr)
        const result = Object.fromEntries(urlSearchParams.entries())
        return result
      }
      return (getUrlParams2(window.location.href).adtag)
    }
    // 特定adtag显示无领奖按钮 
    if(getAdtag()=='2631'||getAdtag()=='2632'|| getAdtag()=='2633'|| getAdtag()=='2634'|| getAdtag()=='2635' || (window.location.href.indexOf('page.html') !== -1) ){
      $('.sec1 .kv-box .kv-download').css('background-image', 'url(//game.gtimg.cn/images/val/act/a20230801download/download-btn3.png)');
      $('.sec1 .kv-box .kv-download').css('padding', '0');
    }
    const enableDownLoad = (msg) => {
      $(function () {
        $.get("https://api.val.qq.com/go/agame/resource/kv?key=aclos_download_center", function (data, status) {
          if (status == 'success') {
            var res;
            try {
              res = JSON.parse(data);
            } catch (error) { }
            if (res && res.channels) {
              if ( getAdtag()=='3301' || getAdtag()=='3302' || getAdtag()=='3303' || msg=='qqDownload' ) {
                var url = res.channels['7'];
              } else if ( getAdtag()=='2631' || getAdtag()=='2632' || getAdtag()=='2633' || getAdtag()=='2634' || getAdtag()=='2635' ) {
                var url = res.channels['24'];
              } else {
                var url = res.channels['21'];
              }
              // var url = res.channels['21'];
              window.location.href = url
              // $('.kv-download').attr('href', url)
            }
          }
        })
      })
    }
    
    
  
    
    $('.vtab .vtab-item').on('mouseenter', function () {
      $(this).addClass("on").siblings().removeClass("on");
    });
    
    
    // 轮播
    
    var swiper2
    if (isMobile()) {
      swiper1 = new Swiper(".mySwiper3", {
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
      });
      // 若换回手工枪械版本 需取消注释
      // var swiper4 = new Swiper(".mySwiper4", {
      //   pagination: {
      //     el: ".swiper-pagination",
      //   },
      // });
    
       // 轮播
       var heros1 = ['纯正枪战', '英雄迥异', '获奖无数','外挂零容忍','潮流游戏']
       var swiper = new Swiper('.m-p2-box .swiper-container', {
           pagination: {
               el: ".m-p2-box .swiper-pagination",
               clickable: true,
               renderBullet: function (index, className) {
                   return '<div class="' + className + '"><p class="m-p2-pip1">' + (heros1[index]) + '<i></i></p></div>';
               },
           },
            loop: true,
            speed: 600,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
       });
    } else {
      // pc
      swiper1 = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerView: 8,
        freeMode: true,
        watchSlidesProgress: true,
      });
    }
    var swiper2 = new Swiper(".mySwiper2", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // loop: true,
      effect: 'fade',
      thumbs: {
        swiper: swiper1,
      },
      speed: 600,
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false,
      // },
      lazy: {
        loadPrevNext: true,
      },
    });
   
    
    
    // 测试接口 '//test-api.val.qq.com/'
    const linkPre = '//api.val.qq.com/'
    
    // 新闻拉取
    const dataList = {
      start: 0,
      maxLength: 10,
      // 获取新闻列表
      /**
       *
       * @param {*} data.start 从第几条开始
       * @param {*} data.maxLength 最大长度
       * @param {*} data.callback 回调方法,需传入items新闻详情对象
       * @param {*} data.docid 传入当前新闻详情id进行过滤
       */
    
    
    
    
      // 获取全部地图
      /**
       *
       * @param {*} data.callback 回调
       */
      getAllMap(data) {
        $.ajax({
          url: `${linkPre}go/agame/graphql/graphiQL?query=%7B%0A%20%20maps%7B%0A%20%20%20%20name%20%0A%20%20%20%20e_name%0A%20%20%20%20icon%0A%20%20%7D%0A%7D`,
          success: (res) => {
            if (!res.data.maps) {
              return;
            }
            if (data && data.callback) {
              data.callback(res.data.maps);
            }
          },
          error: (err) => console.log(err),
        });
      },
      // 获取单个地图信息
      /**
       *
       * @param {*} data.callback 回调
       * @param {*} data.id 地图id
       */
      getMapData(data) {
        $.ajax({
          url: `${linkPre}go/agame/graphql/graphiQL?query=%7B%0A%20%20map(id%3A${data.id})%7B%0A%20%20%20%20name%20%0A%20%20%20%20e_name%0A%20%20%20%20icon%0A%20%20%20%20feature%0A%20%20%20%20location%20%7B%0A%20%20%20%20%20%20icon%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20plane_img%20%7B%0A%20%20%20%20%20%20img_url%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%20%20plant_num%0A%20%20%20%20preview%0A%20%20%7D%0A%7D`,
          success: (res) => {
            if (!res.data.map) {
              return;
            }
            if (data && data.callback) {
              data.callback(res.data.map);
            }
          },
          error: (err) => console.log(err),
        });
      },
    
    };
    
    
    
    // 渲染首页地图
    function mainMaps() {
      let resetMaps = function (this_maps) {
        $('.map-bg-swiper .swiper-wrapper').html(template("map-bg-tem", {
          item: this_maps
        }));
        mapBgSwiper.init();
      }
      dataList.getAllMap({
        callback: resetMaps
      });
    }
    
    mainMaps();
    // 地图滑动
    var mapBgSwiper = new Swiper('.map-bg-swiper', {
      slidesPerView: 1,
      speed: 600,
      loop: true,
      init: false,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      lazy: {
        loadPrevNext: true,
      },
      on: {
        transitionStart: function () {
          var linkText = $(this.slides[this.activeIndex]).attr('data-ename') + ':' + $(this.slides[this.activeIndex]).attr('data-name')
          $('.btn-map-link span').text(linkText)
          $('.btn-map-link').attr('href', '//val.qq.com/game-data.html?pageType=3&mapId=' + (Number(this.realIndex) + 1));
          $('.btn-map-link').attr('data-map-name', $(this.slides[this.activeIndex]).attr('data-ename'));
        }
      },
    })
    // 地图下一页
    $('.btn-map-next').click(function () {
      mapBgSwiper.slideNext();
    })
    // 地图上一页
    $('.btn-map-prev').click(function () {
      mapBgSwiper.slidePrev();
    })
    $('.btn-map-link').click(function () {
      var mapName = $(this).attr('data-map-name')
      LOLSendClickAT('btn', 'map-link' + mapName, '地图-' + mapName)
    })
    
    
    // 弹窗
  function showPopup(popupId) {
      $('#' + popupId).show();
      $('.mask').show();
  }
  
  function hidePopup(popupId) {
      if (popupId) {
          $('#' + popupId).hide()
          if (!$('.popup').is(':visible')) {
              $('.mask').hide();
          }
      } else {
          $('.popup').hide();
          $('.mask').hide();
      }
  }
  
  // 视频弹窗
  var player
  function popVideo(vid) {
      if (!player) {
          player = new window.SuperPlayer({
              container: '#video',
          });
      }
      player.play({
          vid: vid
      });
      showPopup('popupvideo')
  }
  function closeVideo() {
      hidePopup();
      player.stop()
  }
  
  
  // tab切换
  $('.m-p2-box').on('click', 'p', function () {
      // 给当前的添加类名，并清除同级其他的类名
      $(this).addClass("on").siblings().removeClass("on");
      // 获取当前点击的索引
      var index = $(this).index()
      // 对应索引对应的添加类名block，并清楚同级其他的类名
      $('.m-p2-img div').eq(index).addClass("block").siblings().removeClass("block");
      resizeWrapScale();
  });
  
  // 悬浮,滚动时隐藏
  $('.wrap').on("mousewheel DOMMouseScroll", function (e) {
    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
    var isHide = $('.kv-icon').hasClass('hide');  
    if (delta < 0&&!isHide) {
      $('.kv-icon').addClass('hide');
    }
  })