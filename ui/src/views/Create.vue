<template>
    <section>
        <div class="study__work">
  <div>
  <div class="vue-select" @click="toggleDropdown">
    <span class="selected-option">{{ placeholder }}</span>
    <transition name="slide">
      <div class="dropdown-options-container" v-show="showDropdown">
        <div class="dropdown-options" v-for="option in options" :key="option" v-bind:class="{'selected': option === selected}">
          <div class="dropdown-options--cell" @click="selectOption(option)"><span class="option-text">{{ option }}</span></div>
        </div>
      </div>
    </transition>
  </div>
  </div>
  <vue-select></vue-select>
            <input class="study__itemText" v-model="course.taskTitle"  placeholder="Введите название задания"/>
            <input class="study__itemText study__margin" placeholder="Введите номер задания"/>
            <textarea class="study__headerText study__input" v-model="course.taskText" placeholder="Введите текст для задания"></textarea>
            <textarea class="study__headerText study__input" placeholder="Введите пример кода для задания"></textarea>

                <div v-show="course.isTest">
                <div class="checkbox-wrapper" v-for="(item,index) in course.test" :key="index">
                <input class="checkbox" type="checkbox" :id="'checkbox' + index + 1">
                <label class="label"  :for="'checkbox' + index + 1"><input v-model="course.test[index]" placeholder="Введите значение"/><button class="test__delete">&#10006;</button></label>
                </div> 
                <button  class="test__add">&#43;</button>
                </div>

                <div v-show="course.isOneTest">
                <div class="checkbox-wrapper" >
                <input class="checkbox" type="radio" id="checkbox1">
                <label class="label"  for="checkbox1"><input placeholder="Введите значение"/><button class="test__delete">&#10006;</button></label>
                </div> 
                <div class="checkbox-wrapper" >
                <input class="checkbox" type="radio" id="checkbox1">
                <label class="label"  for="checkbox1"><input placeholder="Введите значение"/><button class="test__delete">&#10006;</button></label>
                </div> 
                <button class="test__add">&#43;</button>
                </div>
            <textarea class="study__headerText study__input"  v-show="course.isPractice && !course.isTest && !course.isOneTest" placeholder="Введите код testbench.v"></textarea>
            <textarea class="study__headerText study__input"  v-show="course.isPractice && !course.isTest && !course.isOneTest" placeholder="Введите описание устройства (device.v)"></textarea>
            <CodeEditor width="800px" v-show="course.isPractice && !course.isTest && !course.isOneTest" height="400px" class="study__code" :languages="[['verilog', 'Verilog']]"></CodeEditor>
                <button class="study__button">Создать</button>
        </div>
    </section>
</template>

<script>
import CodeEditor from 'simple-code-editor';

export default {
    name: "CreatePage",
    components: {
      CodeEditor
    },
    data: function () {
        return {
            type: '',
            course: {test: ['Вариант 1', 'Вариант 2', 'Вариант 3']},
            selected: "",
      showDropdown: false,
      options: [
        'Теоретическое', 'Вопрос с одним ответом', 'Вопрос с неколькими ответами', 'Практическое'
      ],
      placeholder: 'Выберите тип задания'
    }
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.selected = option;
      this.placeholder = option;
      switch (option) {
        case 'Теоретическое':
            this.course.isPractice = false;
            this.course.isTest = false;
            this.course.isOneTest = false;
        break;
        case 'Вопрос с одним ответом':
            this.course.isPractice = true;
            this.course.isTest = false;
            this.course.isOneTest = true;
        break;
        case 'Вопрос с неколькими ответами':
            this.course.isPractice = true;
            this.course.isTest = true;
            this.course.isOneTest = false;
        break;
        case 'Практическое':
            this.course.isPractice = true;
            this.course.isTest = false;
            this.course.isOneTest = false;
        break;
      }
    },
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
        &__margin {
            margin-top: 20px;
        }
        &__code {
            margin-top: 20px;
        }
        &__nav {
            width: 180px;
            margin-top: 20px;
            margin-left: 10px;
            padding: 5px !important;
        }
        &__input {
            min-width: 400px;
            min-height: 100px;
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
            width: 150px;
            height: 50px;
            margin-left: 694px;
            margin-top: 20px;
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
  &:first-of-type {
    margin-top: 20px;
  }
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





.vue-select {
  text-align: center;
  width: 300px;
  background-color: rgb(232, 232, 232);
  margin-top: 20px ;
  margin-bottom: 20px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
  border: none;
  transition: all 200ms linear;
}
.vue-select .selected-option {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  padding: 15px;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  transition: all 200ms linear;
}
.vue-select .selected-option:hover {
  color: rgba(0, 0, 0, 0.45);
}
.vue-select .selected-option svg {
  fill: #42b883;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  transition: fill 300ms linear;
}
.vue-select .selected-option svg:hover {
  fill: #2e805b;
}

.dropdown-options-container {
  overflow-y: scroll;
  height: 200px;
}

.dropdown-options--cell {
  padding: 15px;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dropdown-options--cell:hover {
  background-color: #f4fbf8;
  border: none;
}

.dropdown-options.selected .dropdown-options--cell {
  background-color: #f4fbf8;
  border: none;
}

.slide-enter-active,
.slide-leave-active {
  transition: height 150ms ease;
}

.slide-enter,
.slide-leave-to {
  height: 0px;
}


</style>