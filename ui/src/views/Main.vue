<template>
  <section class="content">
    <h1 class="content__header">О нас</h1>
    <p class="content__text">Verilog, Verilog HDL (англ. Verilog Hardware Description Language) — это язык описания аппаратуры, используемый для описания и моделирования электронных систем. Verilog HDL, не следует путать с VHDL (конкурирующий язык), наиболее часто используется в проектировании, верификации и реализации (например, в виде СБИС) аналоговых, цифровых и смешанных электронных систем на различных уровнях абстракции.</p>
    <p class="content__text">Разработчики Verilog сделали его синтаксис очень похожим на синтаксис языка C, что упрощает его освоение. Verilog имеет препроцессор, очень похожий на препроцессор языка C, и основные управляющие конструкции «if», «while» также подобны одноимённым конструкциям языка C. Соглашения по форматированию вывода также очень похожи.</p>
    <p class="content__text">Мы подготовили данный сервис для всех желающих изучить язык описания аппаратуры Verilog.</p>
  </section>
</template>

<script>
export default {
  components: {},
  name: "MainPage",

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
        margin-top: 15px;
      }
    }
</style>
