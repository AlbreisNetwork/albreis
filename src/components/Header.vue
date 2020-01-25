<template>
<header>
    <div class="logo"></div>
    <nav>
        <ul class="menu">
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 1</a></li>
        </ul>
    </nav>
    <form>
        <input v-model="s" type="search" name="s" placeholder="Search..." />
        <button type="button" @click="search">Pesquisar</button>
    </form>
    <div class="redes">
        <a href="#"><span class="fab fa-facebook"></span></a>
    </div>
</header>
</template>
<script>
export default  {
    data: function() {
        return {
            s: ''
        }
    },
    methods: {
        search() {

        }
    }
}
</script>
<style lang="stylus" scoped>
    header
        display flex
        padding 10px
        background #000
        &>*
            flex 1
        .logo
            display inline-block
        nav
            display inline-block
        ul
            list-style none
            padding 0
            margin 0
            display inline-block
            li
                display inline-block
                a
                    color #fff
        .redes
            display inline-block
</style>