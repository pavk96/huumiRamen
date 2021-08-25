var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(36.11692967944211, 128.3451631507255), // 지도의 중심좌표
    level: 3,
    mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
  };
var map = new kakao.maps.Map(mapContainer, mapOption);
var marker = new kakao.maps.Marker({
  position: new kakao.maps.LatLng(36.11692967944211, 128.3451631507255), // 마커의 좌표
  map: map,
});
