// const geojson = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "feature",
//       geometry: {
//         type: "LineString",
//         cordinates: [...coords],
//       },
//     },
//   ],
// };

// const startPoint = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "feature",
//       geometry: {
//         type: "Point",
//         cordinates: [start],
//       },
//     },
//   ],
// };

// const endPoint = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "feature",
//       geometry: {
//         type: "Point",
//         cordinates: [end],
//       },
//     },
//   ],
// };

// const lineStyle = {
//   id: "roadLayer",
//   type: "line",
//   source: {
//     "line-join": "round",
//     "line-cap": "round",
//   },
//   paint: {
//     "line-width": 4,
//     "line-opacity": 0.75,
//     "line-color": "blue",
//   },
// };

// const layerEndpoint = {
//   id: "end",
//   type: "circle",
//   source: {
//     type: "geojson",
//     data: end,
//   },
//   paint: {
//     "circle-radius": 10,
//     "circle-color": "#f30",
//   },
// };

// // import Bike from '@mui/icons-material/DirectionsBike'
// // import Drive from '@mui/icons-material/DriveEta'
// // import Walk from '@mui/icons-material/DirectionsRun'


// const json_data = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=""`);


  // useEffect(() => {
  //   getRoute()
  // }, [])

  // const getRoute = async () => {
  //   const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token="pk.eyJ1Ijoic2V0aHMxMCIsImEiOiJjbGg5ZTJvbnQwNm9hM2VudWQ3c2hvODV1In0.H3Q1whUv1HhxstaBd-bLZQ"`);
  //   const data = response.json();
  //   console.log(data)
  // }