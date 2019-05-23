<template>
  <div id="ancestor">
    <div class="container-fluid" id="app">
      <div class="row">
        <div id="sidebar" class="col-md-3 col-sm-4 col-xs-12 sidebar">
          <div id="search">
            <input
              id="location-input"
              type="text"
              ref="input"
              placeholder="Location?"
              v-model="input"
              @keyup.enter="organizeAllDetails"
            />
            <button id="search-btn" @click="organizeAllDetails">
              <img src="./assets/search.svg" width="24" height="24" alt="search icon" />
            </button>
          </div>

          <div id="info">
            <div class="wrapper-left">
              <div id="current-weather">
                {{ currentWeather.temp }}
                <span>°C</span>
              </div>
              <div id="weather-desc">{{ currentWeather.summary }}</div>
              <div class="temp-max-min">
                <div class="max-desc">
                  <div id="max-detail">
                    <i>▲</i>
                    {{ currentWeather.todayHighLow.todayTempHigh }}
                    <span>°C</span>
                  </div>
                  <div id="max-summary">
                    at {{ currentWeather.todayHighLow.todayTempHighTime }}
                  </div>
                </div>
                <div class="min-desc">
                  <div id="min-detail">
                    <i>▼</i>
                    {{ currentWeather.todayHighLow.todayTempLow }}
                    <span>°C</span>
                  </div>
                  <div id="min-summary">
                    at {{ currentWeather.todayHighLow.todayTempLowTime }}
                  </div>
                </div>
              </div>
            </div>

            <div class="wrapper-right">
              <div class="date-time-info">
                <div id="date-desc">
                  <img src="./assets/calendar.svg" width="20" height="20">
                  {{ currentWeather.time }}
                </div>
              </div>
              <div class="location-info">
                <div id="location-desc">
                  <img
                    src="./assets/location.svg"
                    width="10.83"
                    height="15.83"
                    style="opacity: 0.9;"
                  >
                  {{ currentWeather.full_location }}
                  <div id="location-detail" class="mt-1">
                    Lat: {{ currentWeather.formatted_lat }}
                    <br>
                    Long: {{ currentWeather.formatted_long }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <dashboard-content
        class="col-md-9 col-sm-8 col-xs-12 content"
        id="dashboard-content"
        :highlights="highlights"
        :tempVar="tempVar">
      </dashboard-content>
      </div>
    </div>
  </div>
</template>

<script>
  import Content from './components/Content';
  import { store } from './store/store'
  import { organizeAllDetails } from './methods/orchestrating';
  import { locationEntered } from './methods/actions';

  export default {
    name: 'app',
    components: {
      'dashboard-content': Content
    },
    data() {
      return store
    },
    methods: {
      organizeAllDetails: organizeAllDetails,
    },
    computed: {},
    watch: {
      input: locationEntered,
    },
    mounted: async function () {
      await organizeAllDetails();
    }
  }
</script>

<style>

</style>
