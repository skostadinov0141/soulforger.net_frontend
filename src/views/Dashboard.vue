<template>
  
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const heroSections = ref([
  {
    title: 'Was ist Soulforger?',
    content: 'Soulforger ist eine digitale Plattform, die darauf abzielt, die Komplexität von Rollenspielen zu verringern. Sie unterstützt mehrere Regelwerke mit dem gleichen Funktionsumfang für jedes einzelne.',
  },
  {
    title: 'Was ist Soulforger?',
    content: 'Soulforger ist eine digitale Plattform, die darauf abzielt, die Komplexität von Rollenspielen zu verringern. Sie unterstützt mehrere Regelwerke mit dem gleichen Funktionsumfang für jedes einzelne.',
  },
  {
    title: 'Was ist Soulforger?',
    content: 'Soulforger ist eine digitale Plattform, die darauf abzielt, die Komplexität von Rollenspielen zu verringern. Sie unterstützt mehrere Regelwerke mit dem gleichen Funktionsumfang für jedes einzelne.',
  },
]);

const rulebooks = ref([
  {
    title: 'Das Schwarze Auge 5',
    description: 'Das Schwarze Auge entführt dich in eine fantastische Welt voller Mythen und Legenden. Tauche ein in das Abenteuer und erkunde die dunklen Wälder, uralten Ruinen und pulsierenden Städte Aventuriens. Werde zum tapferen Helden, meistere gefährliche Prüfungen und enthülle die Geheimnisse einer reichhaltigen Geschichte. In DSA findest du ein umfangreiches Regelwerk, das es dir ermöglicht, einzigartige Charaktere zu erschaffen und unvergessliche Geschichten zu erleben. Sei bereit, dich den Herausforderungen zu stellen und deine eigene Legende zu schreiben!',
    img: '/dsa_background1.jpg',
    tags:['Low Fantasy', 'Mittelalter', 'Magie', 'Götter']
  },
  {
    title: 'Nirve',
    description: 'In Nirvé schreibst du die Sagen hinter den Legenden. Seit dem Ende der Verwüstung liegt die Welt allein in den Händen der Humaner. Religionen kämpfen um die Wahrheit, Reiche um Vorherrschaft. Jahrhunderte der Geschichte sind bereit, von dir und deinen Weggefährten erlebt zu werden...',
    img: '/nirve_background1.jpg',
    tags:['High Fantasy', 'Mittelalter', 'Magie', 'Götter']
  },
  {
    title: 'Shadowrun 6',
    description: 'Tauche ein in die düstere Zukunft von Shadowrun, einer Welt, in der Megakonzerne die Regeln bestimmen und Magie mit Hightech verschmilzt. Als Shadowrunner navigierst du durch die neonbeleuchteten Straßen einer cyberpunkesken Metropole und stellst dich gefährlichen Aufträgen, in denen Magie, Technologie und Intrigen aufeinandertreffen. Bist du bereit, deine Fähigkeiten zu nutzen und dich in diesem dystopischen Universum zu behaupten?',
    img: '/shadowrun_background1.jpg',
    tags:['High Fantasy', 'Cyberpunk', 'Magie', 'Dystopie']
  },
  {
    title: 'Cyberpunk Red',
    description: 'Willkommen in der rauen und futuristischen Welt von Cyberpunk. Hier verschmilzt Technologie mit der Dunkelheit der Nacht, während du dich als Street Samurai oder Netrunner in den Straßen einer dystopischen Metropole behauptest. Spüre den Puls der Cyberpunk-Ära, in der jeder Augenblick dein letzter sein könnte. Bist du bereit, dich dem Kampf gegen die Mächte der Konzerne anzuschließen und deine eigene Legende zu schreiben?',
    img: '/cyberpunk_background1.jpg',
    tags:['High Fantasy', 'Cyberpunk', 'Dystopie']
  },
  {
    title: 'Fading Suns',
    description: 'Tauche ein in die faszinierende Welt von Fading Suns, einem düsteren Science-Fiction-Universum, in dem das Licht des Sternenimperiums langsam verblasst. Als Teil eines interstellaren Reiches erlebst du politische Intrigen, mystische Geheimnisse und gefährliche Missionen in einer Zeit des Niedergangs und der Hoffnung. Bist du bereit, dich den Herausforderungen dieser kosmischen Saga zu stellen und deine Bestimmung zu erfüllen?',
    img: '/fadingsuns_background1.jpg',
    tags:['High Fantasy', 'Low Fantasy', 'Mittelalter', 'Sci-Fi', 'Aliens', 'Distopie']
  }
])

</script>
