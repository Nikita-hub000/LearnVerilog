<template>
    <div class="study__header">
        <div class="study__progress">
            <p class="study__text-head">Прогресс обучения:</p>
            <div class="study__bar">
                <p class="study__text">36/100</p>
                <div class="study__line">
                    <div class="study__line-green"></div>
                </div>
            </div>
        </div>
        <h1 class="study__headerText">Задание 1. Проектирование сумматора</h1>
    </div>
    <section>
        <div class="study__lessons">
            <div class="study__item">
                <div class="study__green"></div>
                <p class="study__itemText padding">1 Основы</p>
            </div>
            <div class="study__item">
                <div class="study__green"></div>
                <p class="study__itemText padding">1.1 Объявление устройства</p>
            </div>
            <div class="study__item" :class="{'study__item-active': isActive}">
                <div class="study__green"></div>
                <p class="study__itemText padding">1 Основы</p>
            </div>
            <div class="study__item">
                <div class="study__green"></div>
                <p class="study__itemText padding">1 Основы</p>
            </div>
        </div>
        <div class="study__work">

            <p class="study__itemText">Задание: Спроектировать сумматор</p>
            <img src="../assets/img/task.png" alt="#" class="study__image"/>
            <p class="study__hint">Введите и отправьте ваше решение в форме ниже</p>
            <textarea placeholder="" class="study__input"></textarea>
            <div class="study__sendBox">
                <p class="study__try">Использовано попыток: 0</p>
                <button class="study__button">Отправить</button>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: "StudyPage",
    data: function () {
        return {
            isActive: true
        };
    },
}
</script>

<style lang="scss" scoped>
    section {
        display: flex;
        flex-direction: row;
    }
    .padding {
        padding-left: 1px;
    }
    .study {
        &__header {
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #000000;
            padding-left: 14px;
        }
        &__button {
            background: #008800;
            border-radius: 10px;
            padding: 8px 20px;
            color: white;
            border: 1px solid #008800;
            &:hover {
                background: #199519;
                border: 1px solid #199519;
                cursor: pointer;
            }
        }
        &__hint {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 15px;
            margin-top: 20px;
            margin-bottom: 0;
            color: #9D9D9D;
        }
        &__try {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 15px;
        }
        &__sendBox {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 23px;
        }
        &__green {
            background: #008800;
            min-width: 5px;
        }
        &__item {
            width: 218px;
            display: flex;
            flex-direction: row;
            &-active {
                background: #008800;
                color: white;
            }
        }
        &__input {
            width: 800px;
            height: 200px;
            padding-top: 5px;
            padding-left: 5px;
            margin-top: 5px;
            padding-bottom: 5px;
        }
        &__image {
            width: 500px;
            height: 200px;
            margin-top: 10px;
            margin-bottom: 0;
        }
        &__itemText {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 26px;
            padding-left: 20px;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        &__progress {
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-right: 1px solid black;
            padding-right: 20px;
        }
        &__lessons {
            display: flex;
            flex-direction: column;
            border-right: 1px solid black;
            min-height: 50vw;
        }
        &__text {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            margin-right: 7px;
            line-height: 20px;
            display: flex;
            align-items: center;
            color: #000000;

            &-head {
                padding-top: 14px;
                margin-right: 0;
            }
        }
        &__bar {
            display: flex;
            flex-direction: row;
            margin-top: 7px;
            align-items: center;
            padding-bottom: 14px;
        }
        &__line {
            position: relative;
            z-index: 1;
            width: 130px;
            height: 7px;
            border: 0.5px solid black;
            border-radius: 5px;
            &-green {
                width: 17px;
                height: 7px;
                z-index: 2;
                background: #008000;
                border: 0.5px solid #008000;
            }
        }

        &__headerText {
            padding-top: 14px;
            padding-bottom: 14px;
            margin: 0 auto;
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 35px;
            line-height: 42px;
        }

        &__work {
            display: flex;
            flex-direction: column;
            margin: 10px 150px;
        }
    }
</style>