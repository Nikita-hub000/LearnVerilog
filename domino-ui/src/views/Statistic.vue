<template>
    <section class="content">
      <h1 class="content__header">Общая статистика пользователей LearnVerilog</h1>
      <p class="content__text">Топ пользователей по количеству решенных заданий за последний месяц:</p>
      <ol class="content__list">
        <li class="first">Nikita (5)</li>
        <li class="second">Sergey (4)</li>
        <li class="third">Andrey (2)</li>
      </ol>
      <p class="content__text">Количество пользователей прошедших каждый уровень:</p>
      <Bar
        id="my-chart-id"
        :data="chartData1"
        :options="chartOptions"
      />
      <p class="content__text">Среднее число ошибок на каждый уровень:</p>
      <Bar
        id="my-chart-id"
        :data="chartData2"
        :options="chartOptions"
      />
      <p class="content__text">Распределение количества решенных уровней:</p>
      <Bar
        id="my-chart-id"
        :data="chartData3"
        :options="chartOptions"
      />
      <p class="content__text">Активность пользователей по месяцам:</p>
      <Line :data="chartData4" :options="chartOptions" />
    </section>
  </template>
  
  <script>
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,   PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,  PointElement, LineElement)
  export default {
    name: "StatVue",
    components: { Bar, Line },
    data() {
      return {
        chartData1: {
          labels: [ '1 уровень', '2 уровень', '3 уровень', '4 уровень'],
          datasets: [ { data: [40, 30, 25, 10], 
            label: 'Количество пользователей',
            backgroundColor: [      'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',],     
                  borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                ],
                borderWidth: 1 
          } ]
        },
        chartData2: {
          labels: [ '1 уровень', '2 уровень', '3 уровень', '4 уровень'],
          datasets: [ { data: [10, 20, 20, 40], 
            label: 'Среднее число ошибок на каждый уровень:',
            backgroundColor: [      'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',],     
                  borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                ],
                borderWidth: 1 
          } ]
        },
        chartData3: {
          labels: [ '1 уровень', '2 уровень', '3 уровень'],
          datasets: [ { data: [1, 1, 2], 
            label: 'Распределение количества решенных уровней:',
            backgroundColor: [      'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  ],     
                  borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                ],
                borderWidth: 1 
          } ]
        },
        chartData4: {
              labels: [2020, 2021, 2022, 2023],
              datasets: [
                {
                  label: 'Правильные решения',
                  borderColor: 'rgba(255, 99, 132)',
                  data: [40, 39, 50, 40]
                },
                {
                  label: 'Попытки решений',
                  borderColor: 'rgba(255, 159, 64)',
                  data: [50, 39, 60, 50]
                },

              ]
              },
        chartOptions: {
          responsive: true,
        }
      }
    }
  
  };
  </script>
  <style lang="scss" scoped>
      .content {
        margin-top: 34px;
        padding-left: 110px;
        padding-right: 110px;
        &__header {
          font-family: 'InterBold', sans-serif;
          font-weight: 700;
          font-size: 30px;
          line-height: 35px;
        }
        &__text {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 25px;
          line-height: 30px;
          margin-top: 40px;
          color: #0077FF;
        }
        &__list {
          padding-left: 20px;
          padding-top: 10px;
        }
      }
      canvas{
          margin-top: 20px;
          width:1000px !important;
          height:600px !important;
          margin-bottom: 20px;
          }
          li {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: 25px;
            margin-top: 4px;
            &:first-of-type {
              margin-top: 0;
            }
          }
          .first {
            color: gold;
          }
          .second {
            color: silver;
          }
          .third {
            color: burlywood
          }
  </style>
  