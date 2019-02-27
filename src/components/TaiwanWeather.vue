<template src="./template.html"> </template>

<script>
let apiData = [
  { cityName: '全台灣', api: 'F-C0032-001' },
  { cityName: '宜蘭縣', api: 'F-D0047-001' },
  { cityName: '桃園市', api: 'F-D0047-005' },
  { cityName: '新竹縣', api: 'F-D0047-009' },
  { cityName: '苗栗縣', api: 'F-D0047-013' },
  { cityName: '彰化縣', api: 'F-D0047-017' },
  { cityName: '南投縣', api: 'F-D0047-021' },
  { cityName: '雲林縣', api: 'F-D0047-025' },
  { cityName: '嘉義縣', api: 'F-D0047-029' },
  { cityName: '屏東縣', api: 'F-D0047-033' },
  { cityName: '臺東縣', api: 'F-D0047-037' },
  { cityName: '花蓮縣', api: 'F-D0047-041' },
  { cityName: '澎湖縣', api: 'F-D0047-045' },
  { cityName: '基隆縣', api: 'F-D0047-049' },
  { cityName: '新竹市', api: 'F-D0047-053' },
  { cityName: '嘉義市', api: 'F-D0047-057' },
  { cityName: '臺北市', api: 'F-D0047-061' },
  { cityName: '高雄市', api: 'F-D0047-065' },
  { cityName: '新北市', api: 'F-D0047-069' },
  { cityName: '臺中市', api: 'F-D0047-073' },
  { cityName: '臺南市', api: 'F-D0047-077' },
  { cityName: '連江市', api: 'F-D0047-081' },
  { cityName: '金門市', api: 'F-D0047-085' }
]
import axios from 'axios'
export default {
  name: 'weather',
  data() {
    return {
      time: 0,
      apiData: apiData,
      isclicked: true,
      cities: [],
      currentWeather: {},
      Wx: {},
      PoP: {},
      MinT: {},
      MaxT: {},
      CI: {}
    }
  },
  computed: {
    data() {
      return {
        startTime: this.Wx[this.time].startTime,
        endTime: this.Wx[this.time].endTime,
        Wx: this.Wx[this.time].parameter.parameterName,
        PoP: this.PoP[this.time].parameter.parameterName,
        MinT: this.MinT[this.time].parameter.parameterName,
        MaxT: this.MaxT[this.time].parameter.parameterName,
        CI: this.CI[this.time].parameter.parameterName
      }
    }
  },
  methods: {
    whichtime(a) {
      this.time = a
    },
    weatherElement() {
      if (this.currentWeather.length) {
        this.currentWeather[0].weatherElement.forEach(obj => {
          if (obj.elementName === 'Wx') this.Wx = obj.time
          if (obj.elementName === 'PoP') this.PoP = obj.time
          if (obj.elementName === 'MinT') this.MinT = obj.time
          if (obj.elementName === 'MaxT') this.MaxT = obj.time
          if (obj.elementName === 'CI') this.CI = obj.time
        })
      }
    },
    enterHandler(e) {
      this.isclicked = true
      let target = e.target.getAttribute('data-name')
      // console.log(target)

      let obj = this.cities.filter(city => {
        return city.locationName === target
      })
      this.currentWeather = obj
      this.weatherElement()
    },
    clickHandler(e) {
      this.isclicked = false
      let target = e.target.getAttribute('data-name')
      if (target === '基隆市') target = '基隆縣'
      let city = this.apiData.filter(city => {
        return city.cityName === target
      })
      console.log(city[0].api)
      axios
        .get(
          `/api/api/v1/rest/datastore/${
            city[0].api
          }?Authorization=CWB-1A93316A-42F6-4B3C-B64B-B321BD9E6EBB&limit=2`
        )
        .then(res => {
          console.log(res.data.records.locations[0].location)
        })
    },
    cors(res) {
      console.log(res)
    }
  },
  mounted() {
    let api =
      '/api/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-1A93316A-42F6-4B3C-B64B-B321BD9E6EBB&sort=time'
    let cors_api =
      'https://json2jsonp.com/?url=https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-1A93316A-42F6-4B3C-B64B-B321BD9E6EBB&callback=cb'

    // axios.get(api).then(res => {
    //   console.log(res)
    //   this.cities = res.data.records.location
    // })
    axios.get(cors_api).then(res => {
      let json_str = res.data.substring(3, res.data.length - 1)
      let obj = JSON.parse(json_str)
      this.cities = obj.records.location
      //console.log(obj.records.location)
    })
  }
}
</script>
<style src="./style.css" scoped></style>
