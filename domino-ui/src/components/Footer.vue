<template>
    <footer>
        <div class="footer__item">
            <h1 class="footer__header">Помощь</h1>
            <p class="footer__text email" @click="email(1)">nikita.lapshin2000@gmal.com</p>
            <p class="footer__text email" @click="email(2)">sergei.astakhov@gmal.com</p>
        </div>
        <div class="footer__item">
            <h1 class="footer__header">Подписаться</h1>
            <div class="icon__container">
                <img class="icon" src="../assets/img/telega.png" @click="goTo('telega')" />
                <img class="icon" src="../assets/img/vk.png"  @click="goTo('vk')" />
            </div>
        </div>
        <div class="footer__item">
            <h1 class="footer__header">Авторы</h1>
            <p class="footer__text">Лапшин Никита</p>
            <p class="footer__text">Астахов Сергей</p>
        </div>
    </footer>
</template>
    
<script>
    export default {
        name: "FooterComponent",
        methods: {
            goTo(name) {
                name === 'vk' ? window.open('https://vk.com', '_blank') : window.open('https://web.telegram.org/k/', '_blank');
            },
            email(val) {
               window.location.href = `mailto:${val === 1 ? 'nikita.lapshin2000@gmal.com' : 'sergei.astakhov@gmal.com'}?subject=Помогите%20С%20...`
            }
        }
    }
</script>
<style lang="scss" scoped>
    footer {
        bottom: 0;
        flex: 0 0 auto;
        width: 100%;
        height: 100px;
        justify-content: flex-end;
        background: #EDEDED;
        display: flex;
        flex-direction: row;
        padding: 18px 20px 30px;
    }
    .footer {
        &__item {
            display: flex;
            flex-direction: column;
            margin-right: 100px;
        }
        &__header {
            font-family: 'Inter', sans-serif;
            font-weight: 100;
            color: black;
            font-size: 18px;
            line-height: 20px;
        }

        &__text {
            font-family: 'Inter', sans-serif;
            font-weight: 100;
            color: #8F8F8F;
            font-size: 18px;
            line-height: 20px;
            margin-top: 14px;
        }

    }
    .icon {
        width: 40px;
        height: 40px;
        margin-right: 25px;

        &:last-of-type{ 
            margin-right: 0;
        }

        &__container {
            display: flex;
            flex-direction: row;
            margin-top: 14px;
        }
    }
    .email {
        cursor: pointer;
    }
</style>