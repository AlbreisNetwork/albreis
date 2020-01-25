<template>
    <div>
        <div  class="content">
            <main>
                <div id="phone" class="phone-app">
                    <div class="cam"></div>
                    <div class="hear"></div>
                    <div class="buttons"></div>
                    <router-view :config="config"></router-view>
                </div>
                <div v-if="0" class="phone-app">
                    <div class="cam"></div>
                    <div class="hear"></div>
                    <div class="buttons"></div>
                    <div class="infos">
                        <object id="pdf" :data="pdf" v-if="pdf" type="application/pdf"></object>
                    </div>
                </div>
            </main>
            <aside>
                <div class="field">
                    <label>Design</label>
                    <select v-model="layout">                
                        <option value="/">Design 1</option>
                        <option value="/design2">Design 2</option>
                        <option value="/design3">Design 3</option>
                        <option value="/design4">Design 4</option>
                    </select>
                </div>
                <div class="field">
                    <label class="file">Image
                        <input type="file" @change="changeImage">
                        <div>Selecione uma imagem</div>
                    </label>
                </div>
                <div class="field">
                    <label>Name</label>
                    <input type="text" v-model="config.name" >
                </div>
                <div class="field">
                    <label>Address</label>
                    <input type="text" v-model="config.address" >
                </div>
                <div class="field">
                    <label>Phone</label>
                    <input type="text" v-model="config.phone" >
                </div>
                <div class="field">
                    <label>Facebook</label>
                    <input type="text" v-model="config.facebook" >
                </div>
                <div class="field">
                    <label>Instagram</label>
                    <input type="text" v-model="config.instagram" >
                </div>
                <div class="field">
                    <label>Twitter</label>
                    <input type="text" v-model="config.twitter" >
                </div>
                <div class="field">
                    <label>Youtube</label>
                    <input type="text" v-model="config.youtube" >
                </div>
                <div class="field">
                    <label>Whatsapp</label>
                    <input type="text" v-model="config.whatsapp" >
                </div>
                <div class="field">
                    <label>Website</label>
                    <input type="text" v-model="config.website" >
                </div>
                <button @click="savePDF" type="button">Salvar Cartão</button>
            </aside>
        </div>
    </div>
</template>
<script>
import { EventBus } from './event-bus.js';
export default {
    data() {
        return {
            layout: '/',
            pdf: '',
            config: {
                doc_w: 360,
                doc_h: 640,
                img_w: 360,
                img_h: 640,
                image: '',
                name: 'Anna Korktav',
                address: 'São Paulo - SP',
                phone: '(00) 0.0000-0000',
                facebook: '@username',
                instagram: '@username',
                twitter: '@username',
                whatsapp: 'Phone number',
                youtube: 'channel URL',
                website: 'website URL'
            }
        }
    },
    mounted() {
        if(sessionStorage.config) {
            this.config = JSON.parse(sessionStorage.config)
        }
    },
    methods: {
        savePDF() {
            EventBus.$emit('save-pdf');
        },
        changeImage(e) {
            const fileToUpload = e.target.files.item(0);
            const reader = new FileReader();
            // evento disparado quando o reader terminar de ler 
            reader.onload = (e) => {
                var img = new Image();
                img.src = e.target.result
                img.onload = () => {
                    var ratio = Math.min(this.config.img_w / img.width, this.config.img_h / img.height);
                    img.width = img.width * ratio;
                    img.height = img.height * ratio;
                    this.config.img_w = img.width
                    this.config.img_h = img.height
                }
                this.config.image = e.target.result;
            }

            // solicita ao reader que leia o arquivo 
            // transformando-o para DataURL. 
            // Isso disparará o evento reader.onload.
            reader.readAsDataURL(fileToUpload);
        }
    },
    watch: {
        config:{
            handler(){
                //this.savePDF();
                sessionStorage.config = JSON.stringify(this.config)
            },
            deep: true
        },
        layout() {
            this.$router.push({path: this.layout})
        }
    }
}
</script>
<style lang="stylus">
* {
    box-sizing border-box
}
body
    background-image url('http://www.miroirsanciens.com/wp-content/uploads/2019/01/blue-pattern-background-photos-free-landscape-1920x1080.jpg')
    background-size cover
    background-position center
    margin 0
    padding 0
    font-family 'Montserrat'
a, a:hover
    text-decoration none
img
    max-width 100%
.content
    display flex
    flex-basis 300px
    flex-wrap wrap
    background-color rgba(0,0,0,0.6)
main
    flex 4
    padding 15px
    display flex
    > div
        flex 1
        max-width 360px
    object
        height 510px
        width 100%
        overflow hidden
aside
    flex 1
    padding 15px
    background-color rgba(0,0,0,0.6)
    button
        width 100%
        border none
        height 30px
        background #911
        margin-top 15px
        color #fff
        text-align center
        font-weight bold
.designs
    padding 30px
    height 100vh
    background-color rgba(0,0,0,0.6)
    a
        display block
        margin 15px 0
        color #fff
        font-weight bold
.field
    display block
    width 100%
    padding: 5px
    label
        color #fff
        font-weight bold
        display block
    [type="text"], [type="search"], [type="email"], select
        width 100%
        height 30px
        padding 5px
.file
    input
        display none
    div 
        padding 5px
        background #696
        font-weight normal
        text-align center
        color #fff
        cursor pointer
.phone-app
    margin auto
    width 360px
    height 640px
    border-top 60px solid #000
    border-right 15px solid #000
    border-bottom 70px solid #000
    border-left 15px solid #000
    border-radius 30px
    position relative
    background-color #fff
    .cam
        position absolute
        top -40px
        left 35px
        width 10px
        height 10px
        display block
        border-radius 10px
        background #222
    .hear
        position absolute
        top -40px
        left 95px
        width 100px
        height 10px
        display block
        border-radius 10px
        background #222
@media all and (max-width: 800px)
    main
        flex 1
        padding 0
    .phone-app
        transform scale(0.8)
    .designs
        flex 1
        padding 5px
        white-space nowrap
    aside
        flex 5
        padding 15px 5px
@media all and (max-width: 340px)
    .phone-app
        width 320px
</style>