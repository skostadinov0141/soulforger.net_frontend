<script setup lang="ts">

</script>


<template>
    <footer>
        <div class="info-container">
            <div>
                <h3>App Info:</h3>
                <p>
                    <strong>API Version: </strong>0.0.1a<br>
                    <strong>Frontend Version: </strong>0.0.1a<br>
                    <strong>User ID: </strong>-<br>
                </p>
            </div>
        </div>
        <div class="info-container">
            <div style="align-self: flex-end;">
                <h3>Impressum:</h3>
                <p>
                    <strong>Angaben gemäß § 5 TMG</strong><br>
                    Simeon Kostadinov<br>
                    Am Königsberg 4<br>
                    29525 Uelzen<br>
                    <strong>Vertreten durch:</strong> Simeon Kostadinov <br><br>
                    <strong>Kontakt:</strong><br>
                    <strong>Telefon: </strong>+49-17663213726 <br>
                    <strong>E-Mail:</strong> <a href="mailto:soulforger.net@gmail.com">soulforger.net@gmail.com</a>
                </p>
            </div>
        </div>
    </footer>
</template>


<style scoped>
footer{
    display: flex;
    min-height: 16vh;
    background-color: var(--bg1);
    border-top: solid 1px var(--bg5);
    filter: drop-shadow(-4px -4px 3px rgba(0,0,0,0.7));
    padding-left: 80px;
    padding-right: 80px;
    padding-top: 16px;
    padding-bottom: 16px;
    gap: 80px;
}

.info-container{
    flex: 1;
    display: flex;
    flex-direction: column;
}

h3{
    font-size: 16px;
    font-weight: 700;
    color: var(--text3);
}

p{
    font-size: 12px;
    font-weight: 300;
    color: var(--text0);
}

p strong{
    font-weight: 800;
    color: var(--text1);
}

p a{
    color: var(--accent1);
    cursor: pointer;
    text-decoration: none;
}
</style>