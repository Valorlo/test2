/*這邊很不熟要注意*/

var data;

function loaddata(callback){
    var xhr=new XMLHttpRequest();//new:創自定義的參數
    xhr.open('get','https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery');

    xhr.send();
    xhr.onload=function(){//這邊會忘記，onload要載入已經轉型好的data
        data=JSON.parse(xhr.responseText)//轉型JSON的type
        callback();//預防資料尚未載入完全就跑下一個程式
    }
}
//得到資料後開始製作前端
//第一部分，做下拉選單
//要注意變數名稱
function ct(){
    var localname={};//宣告一個空物件存取要的資料
    for(var i=0;i<data.length;i++){
        var content=data[i].ZipName_;//存地名
        if(localname[content]==undefined){
        localname[content]=1;
        }
    }
    var area=document.querySelector(".local");
    var stra='';
    stra+='<option value="all"> 請選擇地區 </option>';//all的意義是為了讓"請選擇地區"永遠在第一個
    for(var j in localname){
        stra+='<option value="'+j+'">'+j+'</option>';
    }
    area.innerHTML=stra;//回傳更新的資料

    area.addEventListener("change",update);

    var locatname={};//宣告一個空物件存取要的資料
    for(var i=0;i<data.length;i++){
        var content=data[i].UnitName_;//存地址
        if(locatname[content]==undefined)
        locatname[content]=1;
    }
    var location=document.querySelector(".address");
    var strb='';
    strb+='<option value="all">請選擇單位</option>';//all的意義是為了讓"請選擇地址"永遠在第一個
    for(var j in locatname){
        strb+='<option value="'+j+'">'+j+'</option>';
    }
    location.innerHTML=strb;

    location.addEventListener("change",update);
}
//第二部分，做選擇後出現的內容
function update(){//要用到的來源要重新選取一次
    var areai=document.querySelector(".local");
    var locationi=document.querySelector(".address");
    var tii=document.querySelector(".ti");
    var conti=document.querySelector(".cont");
    var str="";//存內容要呈現的東西
    var total=0;//計算有幾筆資料
    for(var i=0;i<data.length;i++){
        if(data[i].ZipName_==areai.value&&data[i].UnitName_==locationi.value){//找到使用者選擇後對應的資料
            var content=data[i].BeforeDesc_;//紀錄資料
            total+=1;//紀錄幾筆
            str+='<li>'+content+'</li>';//把資料加進str裡
        }
    }
    tii.textContent="在"+areai.value+"中有"+total+"筆資料";
    conti.innerHTML=str;//記得回傳
}

loaddata(ct);/*
|
v
開始執行上面所打的function
將ct當成callback，在loaddata完整的獲取資料後，就會callback()，也就是呼叫ct
接續完成之後的事情
確認程式無誤之後，用gitbash上傳遠端資料庫
*/