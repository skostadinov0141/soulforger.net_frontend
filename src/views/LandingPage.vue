<script setup lang="ts">
import ProfileCard from '@/components/landingPage/profileCard.vue';
import FunctionCard from '@/components/landingPage/functionCard.vue';
import Footer from '../components/footer.vue';
</script>



<template>
    <div class="main-container">
        <div class="title-container logo">
            <div style="flex: 1;"></div>
            <img src="../assets/images/soulforger_logo_100p.png" alt="Soulforger logo">
            <div style="flex: 1;"></div>
        </div>
        <div class="title-container">
            <div class="splitter"></div>
            <h1>Soulforger</h1>
            <div class="splitter"></div>
        </div>
        <div class="title-container subtitle">
            <div class="splitter"></div>
            <h2>Forge Your Own Adventure</h2>
            <div class="splitter"></div>
        </div>
        <div class="card-container">
            <ProfileCard></ProfileCard>
            <FunctionCard :column_span="1" img-u-r-l="src\assets\images\landing_1.png">
                <template v-slot:function-title>Soulforger Wiki</template>
                <template v-slot:function-low-button>Entwicklung</template>
                <template v-slot:function-button>Zu Wiki</template>
                <template v-slot:function-description>Hast du schon mal versucht, etwas im "DSA-Regelwiki" zu suchen und bist zu dem Schluss gekommen, dass es gar nicht so einfach ist, wie du es dir vorgestellt hast? Soulforger hat sich zum Ziel gesetzt, dieses Problem zu lösen, indem es die Inhalte des Wikis indexiert und kategorisiert, was eine viel schnellere und vorhersehbare Suche im Wiki ermöglicht. Sei nicht schüchtern, probiere es aus!</template>
            </FunctionCard>
            <FunctionCard :column_span="1" img-u-r-l="src\assets\images\landing_2.png">
                <template v-slot:function-title>Heldenerschaffung</template>
                <template v-slot:function-low-button>Entwicklung</template>
                <template v-slot:function-button>Held erschaffen</template>
                <template v-slot:function-description>Entferne das Papier aus "Pen and Paper". Erstelle und verwalte alle deine Charaktere direkt hier auf Soulforger. Soulforger's Philosophie, wenn es um die Erstellung von DSA-Charakteren geht, ist, dass es so schmerzlos und flexibel sein sollte, wie es möglich ist. Kein Durchsuchen von Bergen von Charakterbögen mehr, um den einen Charakter von vor Jahren zu finden, der in der nächsten Kampagne relevant werden könnte.</template>
            </FunctionCard>
            <FunctionCard :column_span="1" img-u-r-l="src\assets\images\landing_3.png">
                <template v-slot:function-title>Worldbuilding</template>
                <template v-slot:function-low-button>Entwicklung</template>
                <template v-slot:function-button>Beitragen</template>
                <template v-slot:function-description>Erstelle und teile Waffen, NSCs, Zaubersprüche, Liturgien und sogar eigene Geschichten mit anderen Spielern und Spielleitern, die sich bemühen, eine reichere Spielwelt zu schaffen. Entscheide, ob du deine Kreationen mit anderen teilen oder als Geschäftsgeheimnis für dich behalten willst. Jede öffentliche Kreation kann in jede öffentliche oder private Kampagne importiert werden. Lass deiner Kreativität freien Lauf.</template>
            </FunctionCard>
            <FunctionCard :column_span="1" img-u-r-l="src\assets\images\landing_4.png">
                <template v-slot:function-title>Kampagnenverwaltung</template>
                <template v-slot:function-low-button>Entwicklung</template>
                <template v-slot:function-button>Kampagnen</template>
                <template v-slot:function-description>Schnapp Dir Deine Spieler, bereite Deine NSCs vor und stürze Dich in die Welt von DSA, so reibungslos wie möglich. Hier kannst du Kampagnen erstellen und planen, Ressourcen mit deinen Spielern teilen und die fiesesten Dämonen vorbereiten, denen deine Spieler begegnen könnten.</template>
            </FunctionCard>
            <FunctionCard :column_span="1" img-u-r-l="src\assets\images\landing_5.png">
                <template v-slot:function-title>Spielen</template>
                <template v-slot:function-low-button>Entwicklung</template>
                <template v-slot:function-button>Jetzt spielen</template>
                <template v-slot:function-description>Nimm an öffentlichen oder privaten Kampagnen teil und stelle deine neu erstellten oder altbewährten Charaktere auf die ultimative Probe. Hier kannst du nicht nur Kampagnen beitreten und spielen, sondern auch zum Kampagnentagebuch beitragen und mit deiner gesamten Gruppe kommunizieren, um zum Beispiel Sitzungen zu planen. Um einer Kampagne beizutreten, musst du zuerst einen Charakter erstellen, daher ist es empfehlenswert, zuerst die Seite "Heldenerschaffung" zu besuchen.</template>
            </FunctionCard>
            <FunctionCard :column_span="1" img-u-r-l="src\assets\images\landing_6.png">
                <template v-slot:function-title>Zu Projekt Beitragen</template>
                <template v-slot:function-low-button>Entwicklung</template>
                <template v-slot:function-button>Beitragen</template>
                <template v-slot:function-description>Unabhängig davon, ob du ein Software-Entwickler bist oder nicht, kann das Projekt deine Hilfe gebrauchen. Soulforger ist Open-Source und von der Community angetrieben. Hier kannst du entweder die Dokumentation lesen und das Innere von Soulforger kennenlernen und zur Codebasis beitragen, oder zum Beispiel das Original-Wiki so übersetzen, dass es bei der Charaktererstellung interaktiv genutzt werden kann.</template>
            </FunctionCard>
        </div>
        <p>
            <strong>WARNUNG: </strong>Alle oben gezeigten Panels haben den Status "Work in progress". Das bedeutet, dass keine der darin dargestellten Funktionen ein Versprechen sind, sondern je nach Entwicklungsfortschritt des Projekts grundlegenden Änderungen unterworfen sind. Um mehr über den Entwicklungsstatus des Projekts zu erfahren, besuch die <a>Entwicklungs-Seite</a>.<br>
        </p>
        <p>
            <strong>Zuschreibungen: </strong><br>
            <a href="https://www.flaticon.com/free-icons/storytelling" title="storytelling icons">Storytelling icons created by Freepik - Flaticon</a> ; 
            <a href="https://www.flaticon.com/free-icons/superhero" title="superhero icons">Superhero icons created by Freepik - Flaticon</a> ; 
            <a href="https://www.flaticon.com/free-icons/world" title="world icons">World icons created by Freepik - Flaticon</a> ; 
            <a href="https://www.flaticon.com/free-icons/scenario" title="scenario icons">Scenario icons created by Wahyu Adam - Flaticon</a> ; 
            <a href="https://www.flaticon.com/free-icons/d20" title="d20 icons">D20 icons created by Freepik - Flaticon</a> ; 
            <a href="https://www.flaticon.com/free-icons/project" title="project icons">Project icons created by Tanah Basah - Flaticon</a> ; 
            <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>
        </p>
    </div>
    <Footer></Footer>
</template>



<style scoped>

img{
    height: 60px;
    width: 60px;
}

p{
    font-size: 12px;
    font-weight: 300;
    color: var(--text0);
}

p strong{
    font-weight: 800;
    color: var(--text3);
}

p a{
    color: var(--accent1);
    cursor: pointer;
    text-decoration: none;
}

.info-footer-container{
    display: contents;
}

.card-container{
    margin-top: 32px;
    margin-bottom: 32px;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    grid-template-rows: 1fr 1fr;
    gap: 16px;
}

.main-container{
    /* background-color: var(--outline1); */
    margin-bottom: 32px;
    min-height: 100vh;
    margin-left: 200px;
    margin-right: 200px;
    display: flex;
    flex-direction: column;
}

.title-container{
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 8px;
}

.logo{
    padding-top: 24px;
}

.subtitle{
    gap: 8px;
    padding-top: 4px;
    width: 20vw;
    align-self: center;
}

.splitter{
    flex: 1;
    height: 1px;
    background-color: var(--accent0);
}

h1{
    font-weight: 300;
    font-size: 24px;
    text-transform: uppercase;
}

h2{
    font-weight: 300;
    font-size: 12px;
}
</style>