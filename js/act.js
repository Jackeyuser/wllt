// act.js

Milo.setCommonConfig({
    needPromiseCallback: true,
  });
  
  const act = {
    lockdata: {},
    lock(key, timeout) {
      if (this.lockdata[key]) {
        this.logTrace("lock", key + " false");
        return false;
      }
      if (!timeout) {
        timeout = 5000;
      }
      this.lockdata[key] = setTimeout(() => {
        delete this.lockdata[key];
      }, timeout);
      this.logTrace("lock", key + " true");
      return true;
    },
    unlock(key) {
      this.logTrace("unlock", key);
      const id = this.lockdata[key];
      if (id) {
        delete this.lockdata[key];
        clearTimeout(id);
      }
    },
    logTrace(func, data) {
      if (data !== undefined) {
        console.log(`[a20230801download] ${func}`, data);
      } else {
        console.log(`[a20230801download] ${func}`);
      }
    },
    showTips(res) {
      if (typeof res == "string") {
        alert(res);
        return;
      }
      if (res.iRet == 101) {
        alert("登录态已失效，请重新登录");
        this.logout();
        return;
      }
      let msg = res.sMsg + " (" + res.iRet + ")" + (res.sAmsSerial ? " " + res.sAmsSerial : "");
      if (res.iRet === 0 || res.iRet == 302 || res.iRet == -120 || (res.iRet > 610100 && res.iRet < 610120)) {
        msg = res.sMsg;
      }
      $("#dia-common p").text(msg);
      TGDialogS("dia-common");
    },
  
    // -------------------------------------------------
    // -------------------- logic ----------------------
    // -------------------------------------------------
  
    async init() {
      this.logTrace("init");
      if (!(await checkLogin())) {
        this.logTrace("init", "checkLogin false");
        return;
      }
      this.logTrace("init", "checkLogin true");
      this.reportLogin();
    },
    // async checkLogin() {
    //   this.logTrace("checkLogin");
    //   const res = await Milo.checkLogin({
    //     iUseQQConnect: true,
    //   });
    //   this.logTrace("checkLogin", res);
    //   if (res.isLogin) {
    //     return true;
    //   }
    //   return false;
    // },
    // async login() {
    //   this.logTrace("login");
    //   await new Promise((resolve) => {
    //     window.iUseQQConnect = true;
    //     Milo.loginByQQConnectAndWX({
    //       oWXParams: {
    //         appId: "wx527960167fe1c1b3",
    //         gameDomain: "val.qq.com",
    //         lang: "zh_CN",
    //         callback: resolve,
    //       },
    //       // oQQParams: {
    //       //   appId: "21000501",
    //       //   callback: resolve,
    //       // },
    //       oQQConnectParams: {
    //         appId: "102059301",
    //         scope: "get_user_info",
    //         state: "STATE",
    //         redirectUri: "https://val.qq.com/comm-htdocs/login/qc_redirect.html",
    //         callback: resolve,
    //         showParams: {},
    //       },
    //     });
    //   });
    //   this.reportLogin();
    // },
    // async logout() {
    //   this.logTrace("logout");
    //   await Milo.logout();
    //   location.reload();
    // },
    getAdtag() {
      const query = Milo.getUrlParams();
      return query.adtag ? query.adtag : "0";
    },
    async reportLogin() {
      try {
        this.logTrace("reportLogin");
        const res = await Milo.emit({
          actId: "572318",
          token: "a05bf6",
          sData: {
            actiontype: "login",
            channelid: this.getAdtag(),
          },
        });
        this.logTrace("reportLogin", res);
      } catch (e) {
        this.logTrace("reportDownload", e);
      }
    },
    async reportDownload() {
      try {
        this.logTrace("reportDownload");
        const res = await Milo.emit({
          actId: "572318",
          token: "a05bf6",
          sData: {
            actiontype: "download",
            channelid: this.getAdtag(),
          },
        });
        this.logTrace("reportDownload", res);
      } catch (e) {
        this.logTrace("reportDownload", e);
      }
    },
    async download(msg) {
      if(msg=='qqDownload'){
        this.logTrace("download");
        this.reportDownload();
        this.logTrace("download", "start");
        console.log('qq渠道无需登录')
        enableDownLoad('qqDownload');
      }
      else{
        if(this.getAdtag()=='2631'||this.getAdtag()=='2632'||this.getAdtag()=='2633'||this.getAdtag()=='2634'||this.getAdtag()=='2635'){
          // gtag('event', 'conversion', {
          //   'send_to': 'AW-11219248912/MwmpCJGAyp8ZEJDO4OUp',
          //   'event_callback': function(){return false}
          // });
          this.logTrace("download");
          this.reportDownload();
          this.logTrace("download", "start");
          // receiveNow();
          console.log('特定adtag无需登录')
          enableDownLoad();
          function gtag_report_conversion() {
            var callback = function () {
              console.log('reportBack')
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-16511336286/uBqACIypiKAZEN7-m8E9',
                'event_callback': callback
            });
            return false;
          }
          gtag_report_conversion()
        }
        else if(this.getAdtag()=='2640'){
          this.logTrace("download");
          this.reportDownload();
          this.logTrace("download", "start");
          enableDownLoad();
          this.logTrace("download", "uet report");
          if (window.uetq) {
            window.uetq.push('event', '下载游戏', {});
          }
        }
        else{
          this.logTrace("download");
          if ( !(await checkLogin()) ) {
            await login();
          }
          this.reportDownload();
          this.logTrace("download", "start");
          receiveNow();
          enableDownLoad();
        }
      }
    },
  };
  
  let readyStateCheckCount = 0;
  let readyStateCheckId = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckId);
      act.init();
      return;
    }
    readyStateCheckCount++;
    // didn't finish loading in 30sec
    if (readyStateCheckCount > 300) {
      clearInterval(readyStateCheckId);
      alert("页面加载失败，请刷新页面");
    }
  }, 100);
  
  
  /**jzh**/ 
  function receiveNow(){
    var flow_1005355 = {
      actId: '609271',
      token: '5479e1',
      sData: {
      }
    }
    Milo.emit(flow_1005355).then((res)=>{
        if(res.iRet == 0){
          $('#receiveNow').text(res.sMsg);
          $('#receive').show();
        }else{
            if(res.iRet == 101){
              login();
            } else if(res.iRet == -100 || res.iRet == -101 || res.iRet == -102 || res.iRet == -103){
              $('#receiveNow').text('下载游戏并使用官方启动器登录，奖励会自动发放。仅可领取一次');
              $('#receive').show();
            }else{
              $('#receiveNow').text(res.sMsg);
              $('#receive').show();
            }
        }
        console.log(res);
    });
  }
  function filter(oriStr) {
    if (!oriStr) {
        return oriStr;
    }
    const charCodes = [
        "3c",
        "3e",
        "27",
        "22",
        "28",
        "29",
        "60",
        {
        format: "script{}",
        chr: "3a",
        },
    ];
    const xssChars = [];
    const filterChars = [];
    let tmpFormat = "{}";
    let tmpChr;
    for (let i = 0; i < charCodes.length; i++) {
        if ("string" === typeof charCodes[i]) {
        tmpFormat = "{}";
        tmpChr = charCodes[i];
        } else {
        tmpFormat = charCodes[i].format;
        tmpChr = charCodes[i].chr;
        }
        xssChars.push(tmpFormat.replace("{}", `\\u00${tmpChr}`));
        xssChars.push(tmpFormat.replace("{}", `%${tmpChr}`));
        xssChars.push(tmpFormat.replace("{}", `%25${tmpChr}`));
        filterChars.push(tmpFormat.replace("{}", `&#x${tmpChr};`));
        filterChars.push(tmpFormat.replace("{}", `%26%23x${tmpChr}%3B`));
        filterChars.push(tmpFormat.replace("{}", `%2526%2523x${tmpChr}%253B`));
    }
    for (let i = 0; i < xssChars.length; i++) {
            oriStr = oriStr.replace(new RegExp(xssChars[i], "gi"), filterChars[i]);
    }
    oriStr = oriStr.replace(/script[\u000d\u000a\u0020]+\:/i, "script&#x3a;");
    return oriStr;
  }
  function filterWxNickName(oriStr) {
    const matchArr = oriStr.match(/\<span\sclass\=\"emoji\semoji[0-9a-z]+\"\>\<\/span\>/g);
    let oriTagStr = "";
    let filterTagStr = "";
    const tag = `{tag_${new Date().getTime()}}`;
    if (!matchArr || !matchArr.length) {
        return this.filter(oriStr);
    }
    oriTagStr = oriStr.replace(/\<span\sclass\=\"emoji\semoji[0-9a-z]+\"\>\<\/span\>/g, tag);
    filterTagStr = this.filter(oriTagStr);
    for (let i = 0; i < matchArr.length; i++) {
        filterTagStr = filterTagStr.replace(tag, matchArr[i]);
    }
    return filterTagStr;
  }
  function checkPlat(sAppTarget = 'lolapp') {
    if (new RegExp('QQ/').test(navigator.userAgent)) {
        return 'QQ';
    }
    if (navigator.userAgent.match('MicroMessenger')) {
        return 'WX';
    }
    if (/weibo/i.test(navigator.userAgent)) {
        return 'WEIBO';
    }
    if (typeof HostApp != 'undefined' || Milo.get('djc_appVersion') != null) {
        return 'DJC';
    }
    if (Milo.get('lcu_client') != null) {
        return 'LCU';
    }
    if (new RegExp(sAppTarget).test(navigator.userAgent)) {
        return 'ZM';
    }
    return 'Browser';
  }
  function checkClient() {
    let client = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        // 判断iPhone|iPad|iPod|iOS
        client = 'iOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {
        // 判断Android
        client = 'Android';
    } else {
        client = 'PC';
    }
    return client;
  }
  async function checkLogin() {
    const res = await Milo.checkLogin({
        iUseQQConnect: Milo.get('acctype') ? true : false,
    });
    console.log('checkLogin', res);
    if (res.isLogin) {
        this.userInfo = res.userInfo ? res.userInfo : res.result;
        if (this.userInfo) {
            aegis &&
                aegis.setConfig({
                    uin: this.userInfo.userUin ? this.userInfo.userUin : this.userInfo.openid,
                });
        }
        $('#milo-unlogin').hide();
        $('#milo-logined').show();
        const nickName = this.filterWxNickName(this.userInfo ? this.userInfo.nickName : '');
        $('#milo-userUin').html(nickName);
        const plat = this.checkPlat();
        if (plat == 'QQ' || plat == 'ZM') {
            $('#milo-logout').hide();
        }
        return true;
    }
    return false;
  }
  async function login() {
    window.iUseQQConnect = 1;
    const clres = await Milo.checkLogin({
        iUseQQConnect: true,
    });
    await new Promise((resolve) => {
        const plat = this.checkPlat();
        if (plat == 'WX') {
            Milo.mobileLoginByWX({
                appId: 'wx7968e3c56f642150',
                gameDomain: 'val.qq.com',
                scope: 'snsapi_userinfo',
                lang: 'zh_CN',
            });
        } else if (plat == 'QQ') {
            Milo.mobileLoginByQQConnect({
                appId: '102059301',
                scope: 'get_user_info',
                redirectUri: 'https://val.qq.com/comm-htdocs/login/qc_redirect.html',
            });
        } else if (plat == 'ZM') {
            // ignore
        } else if (this.checkClient() === 'PC') {
            Milo.loginByQQConnectAndWX({
                oWXParams: {
                    appId: 'wx527960167fe1c1b3',
                    gameDomain: 'val.qq.com',
                    lang: 'zh_CN',
                    callback: resolve,
                },
                oQQConnectParams: {
                    appId: "102059301",
                    scope: "get_user_info",
                    state: "STATE",
                    redirectUri: 'https://val.qq.com/comm-htdocs/login/qc_redirect.html',
                    callback: resolve,
                    showParams: {},
                },
            });
        } else {
            Milo.mobileLoginByQCAndWX({
                oWXParams: {
                    appId: 'wx7968e3c56f642150',
                    gameDomain: 'val.qq.com',
                    scope: 'snsapi_userinfo',
                    lang: 'zh_CN',
                },
                oQQConnectParams: {
                    appId: '102059301',
                    scope: 'get_user_info',
                    redirectUri: 'https://val.qq.com/comm-htdocs/login/qc_redirect.html',
                }
            });
        }
    }).then(() => {
      act.init();
  })
  }
  async function logout() {
    await Milo.logout();
    location.reload();
  }
  