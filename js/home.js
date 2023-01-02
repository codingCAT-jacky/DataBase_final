var StarNum;

$(document).ready(function(){


    $('#AllHotel').click(function(){
        console.log("AllHotel click");
        $.ajax({
            type: 'GET',
            url: '/php/select_AllHotel.php',
            success:function(allHotel){
                console.log("AllHotel="+allHotel);
                $("#result").html("");
                $.each(allHotel, function(index, hotel){
                    console.log("hotel" + index + "=" + hotel);
                    MakeHotelCard(index,  hotel);
                });
            }
        });
    });

    $('#AllSight').click(function(){
        $.ajax({
            type: 'GET',
            url: '/php/select_AllSight.php',
            success:function(allSight){
                console.log("allSight="+allSight);
                $("#result").html("");
                $.each(allSight, function(index, sight){
                    console.log("sight" + index + "=" + sight);
                    MakeSightCard(index, sight);
                });
            }
        });
    });


});
function MakeHotelCard(index, hotel)
{
  let mapURL = "https://www.google.com.tw/maps/place/" + hotel.Address;
  let collapseURL = "#collapse" + index;
  let card1 =
    `
    <div class="card container">
      <div style="width=130px; height=200px">
      <img src=${hotel.PhotoURL} style="width=100px; height=150px" alt="此景點無圖片">
      </div>
      <div class="card-body">
        <div class="row py-2">
            <h3 class="card-title text-dark">${hotel.HotelName}</h5>
        </div>
        <span id="count" style="display:none">${hotel.count}</span>
        <div class="row">
            <span class="col-9">
                地區:${hotel.Zone}</br>
                評價:${hotel.StarNum} &#11088;
            </span>
            <a href=${mapURL} class="btn btn-info col-3">
                地址
            </a>
        </div>
        
      </div>
      <div class="card-footer">
        <div class="row">
            <button class="btn btn-warning col-8 offset-2" data-bs-toggle="collapse" href="${collapseURL}">
                詳細資訊
            </button>
        <div>
      </div>
    </div>
    `;

    let card2 =
    `               
    <div class="collapse" id="collapse${index}">
      <div class="card">
        <div class="card-body">
            <p>
                ${hotel.Description}
            </p>
        </div>
        <div class="card-footer">
            <div class="row">
                <span class="col-4 ps-3 fs-4">留下評價:</span>
                <div class="col-4 ">
                  <div class="input-group">
                    <select class="form-select" id="evaluation${hotel.HotelName}" onchange="selectOnchange_evaluation(this)">
                        <option value="1"> 1 ⭐</option>
                        <option value="2"> 2 ⭐</option>
                        <option value="3"> 3 ⭐</option>
                        <option value="4"> 4 ⭐</option>
                        <option value="5"> 5 ⭐</option>
                    </select>
                  </div> 
                </div>
                <button id="confirmRate${hotel.HotelName}" class="btn btn-info btn-sm col-3 ms-3">
                  確認評價
                </button>
            <div>
        </div>
      </div>
    </div>
    `;                
  let finalcard = $("<div></div>").addClass("col-md-12 col-lg-4 py-5")
    .attr("id", "showcards");
  finalcard.append(card1, card2);
  $("#result").append(finalcard);

  
  let confirmRateBtn =  "confirmRate" + hotel.HotelName;
  console.log("confirmRateBtn="+confirmRateBtn);
  
  
  $("#"+confirmRateBtn).click(function(){
    let StarForm = document.getElementById("evaluation" + hotel.HotelName); 
    let selectedStar = StarForm.selectedIndex+1;
    let selectedHotelName = hotel.HotelName;
    let newStarNum, oldStarNum, hotelIsRated=0, newCount = hotel.count+1;
    console.log("IN click hotelName=" + hotel.HotelName);
    console.log("SelectedStar=" + selectedStar);
    console.log("newCount=" + newCount);
    //把所有這個使用者評價過的sight拿出來與這次評價的sight比對，看看是否已經評價過
    $.ajax({
      type: 'GET',
      data: 'account=' + "kai",
      url: '/php/select_evaluationHotel.php',
      success:function(allHotel){
          console.log("evaluated Hotel="+allHotel);
          $.each(allHotel, function(index, userEvaluatedhotel){
              console.log("single evaluated hotel" + index + "= " + userEvaluatedhotel.HotelName);
              if(userEvaluatedhotel.HotelName == selectedHotelName)
              {
                console.log("match");
                console.log("userEvaluatedhotel.StarNum="+userEvaluatedhotel.StarNum);
                oldStarNum = (hotel.StarNum * hotel.count - userEvaluatedhotel.StarNum) / (hotel.count-1);
                newStarNum = (oldStarNum + selectedStar) / hotel.count;
                hotelIsRated = 1;
                newCount = hotel.count;
              }
          });
          if(hotelIsRated==1)
          newStarNum =  (hotel.StarNum * hotel.count + selectedStar) / (hotel.count+1);
          console.log("newStarNum="+newStarNum);
          updateHotelRateFnc(hotel.HotelName, newStarNum, newCount);
          updateEvaluationFnc("kai", hotel.HotelName, selectedStar);
      }
    }); 
  });
}

function MakeSightCard(index, sight)
{
  let mapURL = "https://www.google.com.tw/maps/place/" + sight.Address;
  let collapseURL = "#collapse" + index;
  let card1 =
    `
    <div class="card container">
      <div style="width=130px; height=200px">
      <img src=${sight.PhotoURL} style="width=100px; height=150px" alt="此景點無圖片">
      </div>
      <div class="card-body">
        <div class="row py-2">
            <h3 class="card-title text-dark">${sight.SightName}</h5>
        </div>
        <span id="count" style="display:none">${sight.count}</span>
        <div class="row">
            <span class="col-9">
                地區:${sight.Zone}</br>
                評價:${sight.StarNum} &#11088;
            </span>
            <a href=${mapURL} class="btn btn-info col-3">
                地址
            </a>
        </div>
        
      </div>
      <div class="card-footer">
        <div class="row">
            <button class="btn btn-warning col-9" data-bs-toggle="collapse" href="${collapseURL}">
                詳細資訊
            </button>
            <a id="love${sight.SightName}" style="text-align: center" class="col-3 pt-2 fs-4">
                ❤
            </a>
        <div>
      </div>
    </div>
    `;

    let card2 =
    `               
    <div class="collapse" id="collapse${index}">
      <div class="card">
        <div class="card-body">
            <p>
                ${sight.Description}
            </p>
        </div>
        <div class="card-footer">
            <div class="row">
                <span class="col-4 ps-3 fs-4">留下評價:</span>
                <div class="col-4 ">
                  <div class="input-group">
                    <select class="form-select" id="evaluation${sight.SightName}" onchange="selectOnchange_evaluation(this)">
                        <option value="1"> 1 ⭐</option>
                        <option value="2"> 2 ⭐</option>
                        <option value="3"> 3 ⭐</option>
                        <option value="4"> 4 ⭐</option>
                        <option value="5"> 5 ⭐</option>
                    </select>
                  </div> 
                </div>
                <button id="confirmRate${sight.SightName}" class="btn btn-info btn-sm col-3 ms-3">
                  確認評價
                </button>
            <div>
        </div>
      </div>
    </div>
    `;                
  let finalcard = $("<div></div>").addClass("col-md-12 col-lg-4 py-5")
    .attr("id", "showcards");
  finalcard.append(card1, card2);
  $("#result").append(finalcard);

  
  let confirmRateBtn =  "confirmRate" + sight.SightName;
  console.log("confirmRateBtn="+confirmRateBtn);

  $("#"+confirmRateBtn).click(function(){
    let StarForm = document.getElementById("evaluation" + sight.SightName); 
    let selectedStar = StarForm.selectedIndex+1;
    let selectedSightName = sight.SightName;
    let newStarNum, oldStarNum, SightIsRated=0, newCount=sight.count+1;
    console.log("IN click SightName=" + sight.SightName);
    console.log("SelectedStar=" + selectedStar);

    //把所有這個使用者評價過的sight拿出來與這次評價的sight比對，看看是否已經評價過
    $.ajax({
      type: 'GET',
      data: 'account=' + "kai",
      url: '/php/select_evaluationSight.php',
      success:function(allSight){
          console.log("evaluated Sight="+allSight);
          $.each(allSight, function(index, userEvaluatedSight){
              console.log("single evaluated Sight" + index + "= " + userEvaluatedSight.SightName);
              if(userEvaluatedSight.SightName == selectedSightName)
              {
                console.log("match");
                console.log("userEvaluatedSight.StarNum="+userEvaluatedSight.StarNum);
                oldStarNum = (sight.StarNum * sight.count - userEvaluatedSight.StarNum) / (sight.count-1);
                newStarNum = (oldStarNum + selectedStar)/sight.count;
                SightIsRated = 1;
                newCount = sight.count;
              }
          });
          if(SightIsRated==1)
            newStarNum =  (sight.StarNum * sight.count + selectedStar) / (sight.count+1);
          updateSightRateFnc(sight.SightName, newStarNum, newCount);
          updateEvaluationFnc("kai", sight.SightName, selectedStar);
      }
    });
    
  });
}

function updateHotelRateFnc(hotelName, starNum, count)
{

}
function updateSightRateFnc(sightName, starNum, count)
{

}
function updateEvaluationFnc(account, place, starNum)
{

}