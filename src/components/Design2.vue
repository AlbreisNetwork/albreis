<template>
<div @savePDF="savePDF" class="infos" :style="{backgroundImage: 'url(' + config.image + ')'}">
    <div class="footer-infos">
        <div class="footer-contact">
            <h3>{{config.name}}</h3>
            <address>{{config.address}}</address>
            <div class="phone">{{config.phone}}</div>
        </div>
        <div class="footer-links">
            <a target="_blank" :href="config.facebook"><span class="fab fa-facebook"></span></a>
            <a target="_blank" :href="config.instagram"><span class="fab fa-instagram"></span></a>
            <a target="_blank" :href="config.twitter"><span class="fab fa-twitter"></span></a>
            <a target="_blank" :href="config.youtube"><span class="fab fa-youtube"></span></a>
            <a target="_blank" :href="config.whatsapp"><span class="fab fa-whatsapp"></span></a>
            <a target="_blank" :href="config.site"><span class="fa fa-globe"></span></a>
        </div>
    </div>
</div>
</template>
<script>
import icons from '../icons.js';
import jsPDF from 'jspdf';
import { EventBus } from '../event-bus.js';
export default {
    props: ['config'],
    data(){
        return {
            
        }
    },
    mounted() {
        EventBus.$on('save-pdf', ()=>{ 
            //do something
            this.savePDF()
        });
    },
    methods: {
        
        savePDF(){
            var doc = new jsPDF('p', 'px', [this.config.doc_w, this.config.doc_h]);
            var x = 0;
            var y = 0;
            if(this.config.img_w > this.config.doc_w) {
                x = this.config.doc_w / 2;
                x = x - (this.config.img_w / 2);
            }
            if(this.config.img_h > this.config.doc_h) {
                y = this.config.doc_h / 2;
                y = y - (this.config.img_h / 2);
            }
            doc.addImage(this.config.image,'JPEG', x, y, this.config.img_w, this.config.img_h);

            doc.setDrawColor(0);
            doc.setFillColor('#111111');
            doc.rect(0, 400, this.config.img_w, 80, 'F')

            doc.setTextColor('#ffffff')

            doc.setFontStyle('bold');
            doc.setFontSize(20)
            doc.text(this.config.name, 15, 430);

            doc.setFontSize(16)
            doc.setFontStyle('normal');
            doc.textWithLink(this.config.address, 15, 450, {url: encodeURI('https://maps.google.com?q=' + this.config.address)});

            doc.textWithLink(this.config.phone, 15, 465, {url: encodeURI('tel://' + this.config.phone)});

            doc.addImage(icons.facebook.white, 170, 420, 16, 16);
            doc.link(170, 420, 16, 16, {url: encodeURI('https://facebook.com/' + this.config.facebook.replace('@', ''))});

            doc.addImage(icons.instagram.white, 200, 420, 16, 16);
            doc.link(200, 420, 16, 16, {url: encodeURI('https://instagram.com/' + this.config.instagram.replace('@', ''))});

            doc.addImage(icons.twitter.white, 230, 420, 16, 15);
            doc.link(230, 420, 16, 16, {url: encodeURI('https://twitter.com/' + this.config.twitter.replace('@', ''))});

            doc.addImage(icons.youtube.white, 168, 450, 18, 14);
            doc.link(170, 450, 16, 16, {url: encodeURI(this.config.youtube)});

            doc.addImage(icons.whatsapp.white, 200, 450, 16, 16);
            doc.link(200, 450, 16, 16, {url: encodeURI('https://wa.me/' + this.config.whatsapp)});

            doc.addImage(icons.globe.white, 230, 450, 16, 16);
            doc.link(230, 450, 16, 16, {url: encodeURI(this.config.website)});

            //doc.fromHTML(document.getElementById('phone').outerHTML)


            //this.pdf = doc.output('datauristring');
            //doc.output('dataurlnewwindow')
            doc.save(this.config.name + '.pdf');
        }
    }
}
</script>
<style lang="stylus" scoped>
.infos
    height 510px
    position relative
    background-size cover
    background-position center
    .footer-infos
        position absolute
        bottom 0
        left 0
        width 100%
        background #fff
        padding 15px
        color #000
        display flex
        a
            color inherit
        .footer-contact
            flex 2
            font-size 13px
            h3
                margin 0 0 5px 0
                font-size 16px
        .footer-links
            flex 1
            font-size 18px
            display flex
            flex-direction row
            max-width 150px
            flex-wrap wrap
            a
                flex 1
                margin 5px
</style>