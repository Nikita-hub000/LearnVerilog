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
        <h1 class="study__headerText" v-if="!isEdit">{{ renderItem.title }}</h1>
        <button class="study__button study__button-edit" v-if="!isEdit && isAdmin" @click="goEdit">Редактировать</button>
        <input class="study__headerText study__input-header" v-if="isEdit" v-model="renderItem.title" placeholder="Введите название"/>
    </div>
    <section>
        <div class="study__lessons">
            <div class="study__item" :class="{'study__item-active': activeItem === item.id}" v-for="item in course" :key="item.id">
                <div class="study__green" @click="goToCourse(item.id)" v-if="item.id <= activeItem"></div>
                <p class="study__itemText padding" @click="goToCourse(item.id)" v-if="!isEdit || isEdit && activeItem !== item.id">{{ item.titleNav }}</p>
                <input class="study__itemText padding study__nav" v-if="isEdit && activeItem === item.id" v-model="item.titleNav" placeholder="Введите название"/>
            </div>
            <button class="study__button study__button-create" v-if="isAdmin" @click="goToCreate">Создать</button>
        </div>
        <div class="study__work">
            <p class="study__itemText" v-if="!isEdit" :class="{'study__itemText-one': !renderItem.isPractice}">{{ renderItem.taskTitle }}</p>
            <input class="study__itemText" v-model="renderItem.taskTitle" v-if="isEdit" placeholder="Введите название"/>
            <p class="study__itemText" :class="{'study__itemText-one': !renderItem.isPractice, 'study__itemText-padding': !renderItem.isPractice || renderItem.isTest || renderItem.isOneTest}" v-if="(!renderItem.isPractice || renderItem.isTest || renderItem.isOneTest) && !isEdit">{{ renderItem.taskText }}</p>
            <textarea class="study__headerText study__input" v-model="renderItem.taskText" v-if="isEdit && !renderItem.isPractice" placeholder="Введите название"></textarea>
            <img src="../assets/img/wave.png" v-if="renderItem.isPractice && !renderItem.isTest && !renderItem.isOneTest" alt="#" class="study__image"/>
            <p class="study__hint" :class="{'study__hint-test': renderItem.isTest}" v-if="renderItem.isPractice">{{renderItem.isTest || renderItem.isOneTest ? 'Выберите правильный ответ' : 'Введите и отправьте ваше решение в форме ниже'}}</p>

                <div v-if="renderItem.isTest">
                <div class="checkbox-wrapper" v-for="(item,index) in renderItem.test" :key="index">
                <input class="checkbox" type="checkbox" :id="'checkbox' + index + 1">
                <label class="label" v-if="!isEdit" :for="'checkbox' + index + 1">{{ item }}</label>
                <label class="label" v-if="isEdit" :for="'checkbox' + index + 1"><input v-model="renderItem.test[index]" placeholder="Введите значение"/><button class="test__delete">&#10006;</button></label>
                </div> 
                <button v-if="isEdit" class="test__add">&#43;</button>
                </div>

                <div v-if="renderItem.isOneTest">
                <div class="checkbox-wrapper" v-for="(item,index) in renderItem.test" :key="index">
                <input class="checkbox" type="radio" :id="'checkbox' + index + 1">
                <label class="label" v-if="!isEdit" :for="'checkbox' + index + 1">{{ item }}</label>
                <label class="label" v-if="isEdit" :for="'checkbox' + index + 1"><input v-model="renderItem.test[index]" placeholder="Введите значение"/><button class="test__delete">&#10006;</button></label>
                </div> 
                <button v-if="isEdit" class="test__add">&#43;</button>
                </div>

            
            <textarea class="study__headerText study__input" v-if="isEdit" placeholder="Введите пример кода для задания"></textarea>
            <CodeEditor width="800px" v-if="renderItem.isPractice && !renderItem.isTest && !renderItem.isOneTest" height="200px" :languages="[['verilog', 'Verilog']]"></CodeEditor>
            <div class="study__sendBox">
                <p class="study__try" v-if="!isEdit && renderItem.isPractice">Использовано попыток: 2</p>
                <button class="study__button study__button-red" v-if="isEdit">Удалить</button>
                <button class="study__button" v-if="!isEdit">{{ renderItem.isPractice ? 'Отправить' : 'Продолжить' }}</button>
                <button class="study__button" v-if="isEdit" @click="goCourse">Сохранить</button>
            </div>
        </div>
    </section>
</template>


<script>
import CodeEditor from 'simple-code-editor';

export default {
    name: "StudyPage",
    components: {
      CodeEditor
    },
    data: function () {
        return {
            activeItem: Number(location.pathname[location.pathname.length - 1]),
            renderItem: {

            },
            isEdit: false,
            isAdmin: JSON.parse(localStorage.getItem('userInfo') || '{}').grant,
            course: [
                {
                    id: 1,
                    title: 'Основы 1. Вводная часть',
                    taskTitle: 'Основы 1',
                    titleNav: '1 Основы',
                    taskText: 'Verilog, Verilog HDL (англ. Verilog Hardware Description Language) — это язык описания аппаратуры, используемый для описания и моделирования электронных систем. Verilog HDL, не следует путать с VHDL (конкурирующий язык), наиболее часто используется в проектировании, верификации и реализации (например, в виде СБИС) аналоговых, цифровых и смешанных электронных систем на различных уровнях абстракции. Verilog, Verilog HDL (англ. Verilog Hardware Description Language) — это язык описания аппаратуры, используемый для описания и моделирования электронных систем.Verilog, Verilog HDL (англ. Verilog Hardware Description Language) — это язык описания аппаратуры, используемый для описания и моделирования электронных систем. Verilog HDL, не следует путать с VHDL (конкурирующий язык), наиболее часто используется в проектировании, верификации и реализации (например, в виде СБИС) аналоговых, цифровых и смешанных электронных систем на различных уровнях абстракции. Verilog, Verilog HDL (англ. Verilog Hardware Description Language) — это язык описания аппаратуры, используемый для описания и моделирования электронных систем.',
                    isPractice: false,
                    isTest: false
                },
                {
                    id: 2,
                    title: 'Задание 1. Проектирование сумматора',
                    taskTitle: 'Задание 1. Проектирование сумматора',
                    titleNav: 'Задание 1',
                    taskText: 'Вопрос: Что такое Verilog?',
                    isPractice: true,
                    isTest: true,
                    test: ['Вариант 1', 'Вариант 2', 'Вариант 3']
                },
                {   
                    id: 3,
                    title: 'Задание 1. Проектирование сумматора',
                    taskTitle: 'Задание 1. Проектирование сумматора',
                    titleNav: 'Задание 1',
                    taskText: 'Задание: Спроектировать сумматор',
                    isPractice: true,
                    isTest: false
                },
                {
                    id: 4,
                    title: 'Задание 1. Проектирование сумматора',
                    taskTitle: 'Задание 1. Проектирование сумматора',
                    titleNav: 'Задание 1',
                    taskText: 'Вопрос: Что такое Verilog?',
                    isPractice: true,
                    isTest: false,
                    isOneTest: true,
                    test: ['Вариант 1', 'Вариант 2', 'Вариант 3']
                },
            ]
        };
    },
    methods: {
        goEdit() {
            this.isEdit = true
        },
        goCourse() {
            this.isEdit = false
            console.log(location)
        },
        goToCourse(id) {
            window.location.assign(location.origin + '/study/' + id)
        },
        goToCreate() {
            this.$router.push({name: 'CreatePage'})
        }

    },
    mounted() {
        this.activeItem = Number(location.pathname[location.pathname.length - 1])
        this.renderItem = this.course[this.activeItem - 1]
    }
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
    .test {
        &__delete {
            background-color: red;
            border: 1px solid red;
            border-radius:  5px;
            color: white;
            margin-left: 5px;
            width: 20px;
            height: 20px;
        }
        &__add {
            background-color: green;
            border: 1px solid green;
            border-radius:  5px;
            color: white;
            margin-top: 7px;
            width: 20px;
            height: 20px;
        }
    }
    .study {
        &__nav {
            width: 189px;
        }
        &__input {
            min-width: 966px;
            min-height: 436px;
            padding: 20px !important;
            margin-top: 20px !important;
            font-size: 24px !important;
        }
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
            &-edit {
                width: 130px;
                height: 50px;
                margin-right: 20px;
                margin-top: 12px;
            }
            &-create {
                width: 130px;
                height: 50px;
                margin-left: 45px;
                margin-top: 12px; 
            }
            &-red {
                background: #af0000;
                border: 1px solid #af0000;
            }
        }
        &__hint {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 15px;
            margin-top: 20px;
            margin-bottom: 10px;
            color: #9D9D9D;
            &-test {
                margin-top: 5px;
                margin-bottom: 3px;
            }
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
            align-items: baseline;
            margin-top: 23px;
            &-one {
                justify-content: flex-end;
            }
        }
        &__green {
            background: #008800;
            min-width: 5px;
        }
        &__item {
            width: 218px;
            cursor: pointer;
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
            &-header {
                width: 808px;
                height: 50px;
                padding-top: 5px;
                padding-left: 5px;
            }
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
            &-one {
                font-size: 25px;
            }
            &-padding {
                padding-left: 0;
            }
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

.checkbox-wrapper {
  margin-top: 7px;
  width: 500px;
}


.checkbox + .label {
  cursor: pointer;
  display: inline-block;
  padding-left: 5px;
  position: relative;
}

.checkbox+.label:before {
  border-radius: 2px;
  box-sizing: border-box;
  content: "";
  display: inline-block;
  height: 18px;
  left: 0;
  position: absolute;
  width: 18px;
}

.checkbox:checked+.label:after {
  color: white;
  display: inline-block;
  left: 3px;
  position: absolute;
  top: 1px;
}

</style>