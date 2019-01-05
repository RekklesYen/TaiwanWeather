
<template src='./template.html'>

</template>

<script>
import axios from 'axios'
export default {
  name: 'weather',
  data() {
    return {
      cities: [],
      currentWeather: {},
      Wx: {},
      PoP: {},
      MinT: {},
      MaxT: {},
      CI: {}
    }
  },
  methods: {
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
      let target = e.target.getAttribute('data-name')
      //console.log(typeof target)

      let obj = this.cities.filter(city => {
        return city.locationName === target
      })
      this.currentWeather = obj
      this.weatherElement()
    }
  },
  mounted() {
    let api =
      '/api/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-1A93316A-42F6-4B3C-B64B-B321BD9E6EBB'
    // 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-1A93316A-42F6-4B3C-B64B-B321BD9E6EBB'
    axios.get(api).then(res => (this.cities = res.data.records.location))
  }
}
</script>
<style src='./style.css' scoped>
</style>
